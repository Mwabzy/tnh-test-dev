from rest_framework import serializers
from .models import (
    ClinicalService,
    Doctor,
    Testimonial,
    ClinicalServiceImage
)
import json



# Helpers

class JSONStringListField(serializers.Field):
    def to_internal_value(self, data):
        if isinstance(data, str):
            try:
                data = json.loads(data)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Invalid JSON format")
        if not isinstance(data, list):
            raise serializers.ValidationError("Expected a list")
        return data

    def to_representation(self, value):
        return value or []



# Nested serializers

class SlimDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'role', 'image', 'bio']


class DoctorSerializer(serializers.ModelSerializer):
    services_offered = serializers.PrimaryKeyRelatedField(
        queryset=ClinicalService.objects.all(),
        many=True,
        required=False
    )
    research_publications = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )
    awards = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'role', 'bio', 'image',
            'services_offered', 'research_publications', 'awards'
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'title', 'image', 'quote', 'rating']



# Image serializer

class ClinicalServiceImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = ClinicalServiceImage
        fields = ["id", "url", "alt"]

    def get_url(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url



# ClinicalService Serializer

class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = SlimDoctorSerializer(many=True, required=False)
    testimonials = TestimonialSerializer(many=True, required=False)

    clinics = serializers.PrimaryKeyRelatedField(
        queryset=ClinicalService.objects.all(),
        many=True,
        required=False
    )

    images = ClinicalServiceImageSerializer(
        source="uploaded_images",
        many=True,
        read_only=True
    )

    images_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    features = JSONStringListField(required=False)

    class Meta:
        model = ClinicalService
        fields = [
            'id', 'title', 'tagline', 'overview', 'detailedDescription',
            'features', 'doctors', 'testimonials', 'contact',
            'isBookable', 'hasReadMore', 'clinics',
            'images',
            'images_files',
            'images_to_delete',
            'locations',
        ]

 
    # CREATE
 
    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        clinics_data = validated_data.pop('clinics', [])
        images_files = validated_data.pop('images_files', [])

        service = ClinicalService.objects.create(**validated_data)

        for doc_data in doctors_data:
            doctor = Doctor.objects.create(**doc_data)
            service.doctors.add(doctor)

        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            service.testimonials.add(testimonial)

        service.clinics.set(clinics_data)

        for img in images_files:
            ClinicalServiceImage.objects.create(
                clinical_service=service,
                image=img
            )

        return service

 
    # UPDATE
 
    def update(self, instance, validated_data):
        doctors_data = validated_data.pop('doctors', None)
        testimonials_data = validated_data.pop('testimonials', None)
        clinics_data = validated_data.pop('clinics', None)
        images_files = validated_data.pop('images_files', [])
        images_to_delete = validated_data.pop('images_to_delete', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if doctors_data is not None:
            instance.doctors.all().delete()
            for doc_data in doctors_data:
                doctor = Doctor.objects.create(**doc_data)
                instance.doctors.add(doctor)

        if testimonials_data is not None:
            instance.testimonials.all().delete()
            for test_data in testimonials_data:
                testimonial = Testimonial.objects.create(**test_data)
                instance.testimonials.add(testimonial)

        if clinics_data is not None:
            instance.clinics.set(clinics_data)

        # DELETE IMAGES
        if images_to_delete:
            ClinicalServiceImage.objects.filter(
                id__in=images_to_delete,
                clinical_service=instance
            ).delete()

        # ADD NEW IMAGES
        for img in images_files:
            ClinicalServiceImage.objects.create(
                clinical_service=instance,
                image=img
            )

        instance.save()
        return instance
