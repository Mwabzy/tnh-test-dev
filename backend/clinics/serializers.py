from rest_framework import serializers
from .models import (
    ClinicalService,
    Contact,
    Doctor,
    Testimonial,
    RelatedService
)

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['phone', 'email', 'address']

class DoctorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)  # optional id for updates

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'title', 'bio', 'photo']

class TestimonialSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Testimonial
        fields = ['id', 'author', 'quote', 'rating']

class RelatedServiceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = RelatedService
        fields = ['id', 'title', 'image', 'image_alt', 'description', 'link']

class ImageFieldSerializer(serializers.Serializer):
    url = serializers.URLField(required=False, allow_blank=True)
    alt = serializers.CharField(required=False, allow_blank=True)


class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True)
    testimonials = TestimonialSerializer(many=True)
    contact = ContactSerializer()
    relatedServices = RelatedServiceSerializer(source='related_services', many=True)
    clinics = serializers.PrimaryKeyRelatedField(queryset=ClinicalService.objects.all(), many=True, required=False)
    image = ImageFieldSerializer(required=False, allow_null=True)

    class Meta:
        model = ClinicalService
        fields = [
            'id', 'title', 'tagline', 'overview', 'features',
            'doctors', 'testimonials', 'contact', 'is_bookable',
            'clinics', 'relatedServices', 'image'
        ]

    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        related_services_data = validated_data.pop('related_services', [])

        # Create contact
        contact = Contact.objects.create(**contact_data) if contact_data else None

        clinical_service = ClinicalService.objects.create(contact=contact, **validated_data)

        for doc_data in doctors_data:
            doc = Doctor.objects.create(**doc_data)
            clinical_service.doctors.add(doc)

        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            clinical_service.testimonials.add(testimonial)

        for rs_data in related_services_data:
            rs = RelatedService.objects.create(**rs_data)
            clinical_service.related_services.add(rs)

        return clinical_service

    def update(self, instance, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        contact_data = validated_data.pop('contact', None)
        related_services_data = validated_data.pop('related_services', [])

        # Update basic fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update contact
        if contact_data:
            if instance.contact:
                for attr, value in contact_data.items():
                    setattr(instance.contact, attr, value)
                instance.contact.save()
            else:
                instance.contact = Contact.objects.create(**contact_data)

        # Replace related fields
        instance.doctors.clear()
        for doc_data in doctors_data:
            doc = Doctor.objects.create(**doc_data)
            instance.doctors.add(doc)

        instance.testimonials.clear()
        for test_data in testimonials_data:
            test = Testimonial.objects.create(**test_data)
            instance.testimonials.add(test)

        instance.related_services.clear()
        for rs_data in related_services_data:
            rs = RelatedService.objects.create(**rs_data)
            instance.related_services.add(rs)

        instance.save()
        return instance
