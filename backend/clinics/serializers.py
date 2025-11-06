from rest_framework import serializers
from .models import ClinicalService, Doctor, Contact, Testimonial


# Basic serializers
class ImageSerializer(serializers.Serializer):
    url = serializers.URLField()
    alt = serializers.CharField(required=False, allow_blank=True)

class FeatureSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True)


# Model serializers for related models
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['name', 'title', 'image', 'bio']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['name', 'title', 'image', 'quote', 'rating']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['phone', 'email', 'address']


# Main ClinicalService Serializer
class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, required=False)
    testimonials = TestimonialSerializer(many=True, required=False)
    contact = ContactSerializer(required=False)
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


    # Create method
    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        clinics_data = validated_data.pop('clinics', [])
        images_data = validated_data.pop('images', [])

      
        contact = Contact.objects.create(**contact_data) if contact_data else None

       
        clinical_service = ClinicalService.objects.create(contact=contact, **validated_data)

        # Many-to-many: doctors
        for doc_data in doctors_data:
            doctor = Doctor.objects.create(**doc_data)
            clinical_service.doctors.add(doctor)

        # Many-to-many: testimonials
        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            clinical_service.testimonials.add(testimonial)

        # Many-to-many: clinics
        clinical_service.clinics.set(clinics_data)

        # JSON fields
        clinical_service.images = images_data
        clinical_service.save()

        return clinical_service

   
    # Update method
    def update(self, instance, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        clinics_data = validated_data.pop('clinics', [])
        images_data = validated_data.pop('images', [])

        # Update simple fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update or create contact
        if contact_data:
            if instance.contact:
                for attr, value in contact_data.items():
                    setattr(instance.contact, attr, value)
                instance.contact.save()
            else:
                instance.contact = Contact.objects.create(**contact_data)

        # Update doctors
        instance.doctors.all().delete()
        for doc_data in doctors_data:
            doctor = Doctor.objects.create(**doc_data)
            instance.doctors.add(doctor)

        # Update testimonials
        instance.testimonials.all().delete()
        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            instance.testimonials.add(testimonial)

        # Update clinics (ManyToManyField)
        instance.clinics.set(clinics_data)

        # Update JSON fields
        instance.images = images_data

        instance.save()
        return instance
