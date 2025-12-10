from rest_framework import serializers
from .models import ClinicalService, Doctor, Testimonial



# Basic nested serializers


class ImageSerializer(serializers.Serializer):
    url = serializers.URLField()
    alt = serializers.CharField(required=False, allow_blank=True)


class FeatureSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True)



# Doctor Serializer (FULL)


class DoctorSerializer(serializers.ModelSerializer):
    services_offered = serializers.PrimaryKeyRelatedField(
        queryset=ClinicalService.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Doctor
        fields = [
            'id',
            'name',
            'role',
            'bio',
            'image',
            'services_offered',
            'research_publications',
            'awards',
        ]

    def create(self, validated_data):
        services = validated_data.pop('services_offered', [])
        doctor = Doctor.objects.create(**validated_data)
        doctor.services_offered.set(services)
        return doctor

    def update(self, instance, validated_data):
        services = validated_data.pop('services_offered', None)

        # update simple fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # update M2M if provided
        if services is not None:
            instance.services_offered.set(services)

        return instance


# Slim version of doctor used inside ClinicalService GET
class SlimDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'role', 'image', 'bio']



# Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['name', 'title', 'image', 'quote', 'rating']



# Clinical Service Serializer


class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = SlimDoctorSerializer(many=True, required=False)
    testimonials = TestimonialSerializer(many=True, required=False)
    contact = serializers.JSONField(required=False)
    clinics = serializers.PrimaryKeyRelatedField(
        queryset=ClinicalService.objects.all(),
        many=True,
        required=False
    )
    images = ImageSerializer(many=True, required=False)
    features = FeatureSerializer(many=True)

    class Meta:
        model = ClinicalService
        fields = [
            'id', 'title', 'tagline', 'overview', 'detailedDescription',
            'features', 'doctors', 'testimonials', 'contact',
            'isBookable', 'hasReadMore', 'clinics', 'images', 'locations'
        ]

    # CREATE
    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        clinics_data = validated_data.pop('clinics', [])
        images_data = validated_data.pop('images', [])

        clinical_service = ClinicalService.objects.create(
            contact=contact_data, **validated_data
        )

        # doctors (nested)
        for doc_data in doctors_data:
            doctor = Doctor.objects.create(**doc_data)
            clinical_service.doctors.add(doctor)

        # testimonials (nested)
        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            clinical_service.testimonials.add(testimonial)

        # clinics M2M
        clinical_service.clinics.set(clinics_data)

        # JSON fields
        clinical_service.images = images_data
        clinical_service.save()

        return clinical_service

    # UPDATE
    def update(self, instance, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        clinics_data = validated_data.pop('clinics', [])
        images_data = validated_data.pop('images', [])

        # simple fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # contact
        if contact_data:
            instance.contact = contact_data

        # replace doctors
        instance.doctors.all().delete()
        for doc_data in doctors_data:
            doctor = Doctor.objects.create(**doc_data)
            instance.doctors.add(doctor)

        # replace testimonials
        instance.testimonials.all().delete()
        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            instance.testimonials.add(testimonial)

        # M2M clinics
        instance.clinics.set(clinics_data)

        # JSON fields
        instance.images = images_data

        instance.save()
        return instance
