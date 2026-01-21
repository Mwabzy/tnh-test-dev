from rest_framework import serializers
from .models import ClinicalService, Doctor, Testimonial, ClinicalServiceImage, DoctorImage, OutpatientCenter
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


class DoctorImageSerializer(serializers.ModelSerializer):

     url = serializers.SerializerMethodField()
 
     class Meta:
         model = DoctorImage
         fields = ["id", "url", "alt"]
 
     def get_url(self, obj):
         request = self.context.get("request")
         if request:
             return request.build_absolute_uri(obj.image.url)
         return obj.image.url

# Nested serializers

class SlimDoctorSerializer(serializers.ModelSerializer):
    image = DoctorImageSerializer(source="uploaded_images", many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'role', 'image', 'bio']


class DoctorSerializer(serializers.ModelSerializer):
    services_offered = serializers.PrimaryKeyRelatedField(queryset=ClinicalService.objects.all(), many=True, required=False)   
    services_offered_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    research_publications = serializers.JSONField(required=False)
    awards = serializers.JSONField(required=False)
    image = DoctorImageSerializer(source="uploaded_images", many=True, read_only=True)
    images_files = serializers.ListField(child=serializers.ImageField(), write_only=True, required=False)
    images_files_alt = serializers.ListField(child=serializers.CharField(allow_blank=True), write_only=True, required=False)
    images_to_delete = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'role', 'bio', 'image',
            'images_files', 'images_files_alt', 'images_to_delete',
            'services_offered', 'services_offered_ids',
            'research_publications', 'awards'
        ]


    def to_internal_value(self, data):
     # If data is a QueryDict (from multipart/form-data), convert to dict of lists
     if hasattr(data, 'getlist'):
         data = {k: data.getlist(k) for k in data.keys()}
 
     #  Flatten single-item lists for simple string fields 
     for field in ['name', 'role', 'bio']:
         if field in data and isinstance(data[field], list) and len(data[field]) == 1:
             data[field] = data[field][0]
 
     #  JSON fields 
     json_fields = ['research_publications', 'awards', 'services_offered_ids']
     for field in json_fields:
         if field in data:
             raw = data[field]
             if isinstance(raw, list) and len(raw) == 1:
                 raw = raw[0]  # extract single string
             try:
                 parsed = json.loads(raw)
                 # convert PKs to int if needed
                 if field == 'services_offered_ids' and isinstance(parsed, list):
                     parsed = [int(pk) for pk in parsed]
                 data[field] = parsed
             except Exception:
                 data[field] = []
 
     #  services_offered for write (PrimaryKeyRelatedField expects list of PKs) 
     if 'services_offered' in data:
         raw = data['services_offered']
         if isinstance(raw, list) and len(raw) == 1:
             raw = raw[0]
         try:
             parsed = json.loads(raw)
             data['services_offered'] = parsed
         except Exception:
             data['services_offered'] = []
 
     #  Images 
     for img_field in ['images_files', 'images_files_alt', 'images_to_delete']:
         if img_field in data:
             vals = data[img_field]
             if not isinstance(vals, list):
                 vals = [vals] if vals else []
             if img_field == 'images_to_delete':
                 vals = [int(i) for i in vals if i]
             data[img_field] = vals
 
     return super().to_internal_value(data)

    def create(self, validated_data):
     #  Pop out many-to-many and extra fields 
     services_ids = validated_data.pop('services_offered', [])
     images_files = validated_data.pop('images_files', [])
     images_alt = validated_data.pop('images_files_alt', [])
 
     #  Create the Doctor instance 
     doctor = Doctor.objects.create(**validated_data)
 
     #  Assign many-to-many relations 
     if services_ids:
         doctor.services_offered.set(services_ids)
 
     #  Handle uploaded images 
     for idx, img in enumerate(images_files):
         alt_text = images_alt[idx] if idx < len(images_alt) else ""
         #  DoctorImage model with FK to Doctor
         DoctorImage.objects.create(doctor=doctor, image=img, alt=alt_text)
 
     return doctor
 
    def update(self, instance, validated_data):
        services = validated_data.pop('services_offered', None)
        images_files = validated_data.pop('images_files', [])
        images_files_alt = validated_data.pop('images_files_alt', [])
        images_to_delete = validated_data.pop('images_to_delete', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if services is not None:
            instance.services_offered.set(services)

        if images_to_delete:
            DoctorImage.objects.filter(
                id__in=images_to_delete,
                doctor=instance
            ).delete()

        for index, img in enumerate(images_files):
            alt_text = ""
            if index < len(images_files_alt):
                alt_text = images_files_alt[index]

            DoctorImage.objects.create(
                doctor=instance,
                image=img,
                alt=alt_text
            )

        instance.save()
        return instance


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
            return obj.image.url


# ClinicalService Serializer

class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = SlimDoctorSerializer(many=True, read_only=True)

    doctor_ids = serializers.PrimaryKeyRelatedField(source='doctors', queryset=Doctor.objects.all(), many=True, write_only=True, required=False)

    testimonials = TestimonialSerializer(many=True, required=False)

    images = ClinicalServiceImageSerializer(source="uploaded_images", many=True, read_only=True)
    images_files = serializers.ListField(child=serializers.ImageField(), write_only=True, required=False)
    images_files_alt = serializers.ListField(child=serializers.CharField(allow_blank=True), write_only=True, required=False)
    images_to_delete = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    features = JSONStringListField(required=False)

    class Meta:
        model = ClinicalService
        fields = [
            'id', 'title', 'tagline', 'overview', 'detailedDescription',
            'features', 'doctors',  'doctor_ids', 'testimonials', 'contact',
            'isBookable', 'hasReadMore', 'clinics',
            'images',
            'images_files',
            'images_files_alt',
            'images_to_delete',
            'locations',
        ]

    
    # Parse JSON strings from FormData
    def to_internal_value(self, data):
     data = dict(data)
 
     #  JSON fields 
     json_fields = ['doctor_ids', 'clinics', 'testimonials', 'features', 'locations', 'contact']
 
     for field in json_fields:
         if field in data:
             raw = data[field]
 
             if isinstance(raw, list) and len(raw) == 1:
                 raw = raw[0]
 
             try:
                 parsed = json.loads(raw)
 
                 # force ints for PK fields
                 if field in ['doctor_ids', 'clinics']:
                     parsed = [int(pk) for pk in parsed]
 
                 data[field] = parsed
             except Exception:
                 data[field] = [] if field != 'contact' else {}
 
     #  Booleans 
     for bool_field in ['isBookable', 'hasReadMore']:
         if bool_field in data:
             val = data[bool_field]
             if isinstance(val, list):
                 val = val[0]
             data[bool_field] = str(val).lower() == 'true'
 
     # Strings 
     for field in ['title', 'tagline', 'overview', 'detailedDescription']:
         if field in data:
             val = data[field]
             if isinstance(val, list):
                 data[field] = val[0]
 
     return super().to_internal_value(data)


    
    # CREATE
    
    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        clinics_data = validated_data.pop('clinics', [])
        images_files = validated_data.pop('images_files', [])
        images_files_alt = validated_data.pop('images_files_alt', [])

        service = ClinicalService.objects.create(**validated_data)

        if doctors_data:
            service.doctors.set(doctors_data)

        if clinics_data:
            service.clinics.set(clinics_data)

        for test_data in testimonials_data:
            testimonial = Testimonial.objects.create(**test_data)
            service.testimonials.add(testimonial)

        for index, img in enumerate(images_files):
            alt_text = ""
            if index < len(images_files_alt):
                alt_text = images_files_alt[index]

            ClinicalServiceImage.objects.create(
                clinical_service=service,
                image=img,
                alt=alt_text
            )

        return service

    
    # UPDATE
    
    def update(self, instance, validated_data):
        doctors_data = validated_data.pop('doctors', None)
        testimonials_data = validated_data.pop('testimonials', None)
        clinics_data = validated_data.pop('clinics', None)
        images_files = validated_data.pop('images_files', [])
        images_files_alt = validated_data.pop('images_files_alt', [])
        images_to_delete = validated_data.pop('images_to_delete', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if doctors_data is not None:
            instance.doctors.set(doctors_data)

        if clinics_data is not None:
            instance.clinics.set(clinics_data)

        if testimonials_data is not None:
            instance.testimonials.all().delete()
            for test_data in testimonials_data:
                testimonial = Testimonial.objects.create(**test_data)
                instance.testimonials.add(testimonial)

        # DELETE IMAGES
        if images_to_delete:
            ClinicalServiceImage.objects.filter(
                id__in=images_to_delete,
                clinical_service=instance
            ).delete()

        # ADD NEW IMAGES
        for index, img in enumerate(images_files):
            alt_text = ""
            if index < len(images_files_alt):
                alt_text = images_files_alt[index]

            ClinicalServiceImage.objects.create(
                clinical_service=instance,
                image=img,
                alt=alt_text
            )

        instance.save()
        return instance
    
class TimingsSerializer(serializers.Serializer):
    day = serializers.CharField()
    startTime = serializers.CharField()
    stopTime = serializers.CharField()
    services_offered = serializers.ListField(child=serializers.IntegerField(), required=False)
    

class OutpatientCenterSerializer(serializers.ModelSerializer):
    services_offered = serializers.PrimaryKeyRelatedField(queryset=ClinicalService.objects.all(), many=True, required=False)
    timings = TimingsSerializer(many=True)

    class Meta:
        model = OutpatientCenter
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "location",
            "contact",
            "services_offered",
            "timings",
        ]
