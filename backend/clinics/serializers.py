from rest_framework import serializers
from .models import ClinicalService, ClinicalServiceFeatureImage, Doctor, Testimonial, ClinicalServiceImage, DoctorImage, OutpatientCenter, ClinicalFAQ
import json
from itertools import zip_longest

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
    images = DoctorImageSerializer(source="uploaded_images", many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id',
            'name',
            'role', 'role_fr', 'role_es', 'role_zh', 'role_ru',
            'bio', 'bio_fr', 'bio_es', 'bio_zh', 'bio_ru',
            'images',
        ]


class DoctorSerializer(serializers.ModelSerializer):
    # ---------- READ ----------
    services_offered = serializers.SerializerMethodField(read_only=True)
    images = DoctorImageSerializer(source="uploaded_images", many=True, read_only=True)

    # ---------- WRITE ----------
    services_offered_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    research_publications = JSONStringListField(required=False)
    awards = JSONStringListField(required=False)
    images_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    images_files_alt = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "role", "role_fr", "role_es", "role_zh", "role_ru",
            "bio", "bio_fr", "bio_es", "bio_zh", "bio_ru",
            "images",             # READ nested images
            "images_files",       # WRITE uploads
            "images_files_alt",
            "images_to_delete",
            "services_offered",
            "services_offered_ids",
            "research_publications",
            "awards",
        ]

    def get_services_offered(self, obj):
        return [
            {
                "id": s.id,
                "title": s.title,
                "tagline": s.tagline,
                "overview": s.overview,
                "locations": s.locations,
                "isBookable": s.isBookable,
            }
            for s in obj.services_offered.all()
        ]

    def to_internal_value(self, data):
     data = data.copy()  #  KEEP QueryDict
 
     # Flatten text fields
     for field in [
         "name",
         "role", "role_fr", "role_es", "role_zh", "role_ru",
         "bio", "bio_fr", "bio_es", "bio_zh", "bio_ru",
     ]:
         val = data.get(field)
         if isinstance(val, list):
             data[field] = val[0]
 
     # services_offered_ids
     raw = data.get("services_offered_ids", [])
     if isinstance(raw, list) and len(raw) == 1:
         raw = raw[0]
 
     if isinstance(raw, str):
         try:
             raw = json.loads(raw)
         except Exception:
             raw = []
 
     data.setlist(
         "services_offered_ids",
         [int(v) for v in raw if str(v).isdigit()]
     )
 
     # images
     for field in ["images_files", "images_files_alt", "images_to_delete"]:
         if field in data:
             values = data.getlist(field)
             if field == "images_to_delete":
                 values = [int(v) for v in values if str(v).isdigit()]
             data.setlist(field, values)
 
     return super().to_internal_value(data)

    def create(self, validated_data):
        services_ids = validated_data.pop('services_offered_ids', [])
        images_files = validated_data.pop('images_files', [])
        images_alt = validated_data.pop('images_files_alt', [])

        doctor = Doctor.objects.create(**validated_data)

        if services_ids:
            doctor.services_offered.set(services_ids)

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            DoctorImage.objects.create(doctor=doctor, image=img, alt=alt_text)

        return doctor

    def update(self, instance, validated_data):
        services_ids = validated_data.pop('services_offered_ids', None)
        images_files = validated_data.pop('images_files', [])
        images_alt = validated_data.pop('images_files_alt', [])
        images_to_delete = validated_data.pop('images_to_delete', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if services_ids is not None:
            instance.services_offered.set(services_ids)

        if images_to_delete:
            DoctorImage.objects.filter(id__in=images_to_delete, doctor=instance).delete()

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            DoctorImage.objects.create(doctor=instance, image=img, alt=alt_text)

        instance.save()
        return instance


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'title', 'image', 'quote', 'rating']


# Main Clinical Image serializer

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
    

# Clinical Features Image serializer
class ClinicalServiceFeatureImageSerializer(serializers.ModelSerializer):
     url = serializers.SerializerMethodField()
 
     class Meta:
         model = ClinicalServiceFeatureImage
         fields = ["id", "feature_index", "url", "alt"]
 
     def get_url(self, obj):
         request = self.context.get("request")
         if request:
             return request.build_absolute_uri(obj.image.url)
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
    features = JSONStringListField(required=False, write_only=True)
    features_read = serializers.SerializerMethodField(read_only=True)

    feature_images = ClinicalServiceFeatureImageSerializer(
        many=True, read_only=True
    )

    feature_images_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    feature_images_alt = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        write_only=True,
        required=False
    )

    feature_images_index = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = ClinicalService
        fields = [
    'id',
    'title',
    'tagline', 'tagline_fr', 'tagline_es', 'tagline_zh', 'tagline_ru',
    'overview', 'overview_fr', 'overview_es', 'overview_zh', 'overview_ru',
    'detailedDescription',
    'detailedDescription_fr', 'detailedDescription_es',
    'detailedDescription_zh', 'detailedDescription_ru',

    'features_read', 'features',
    'feature_images',
    'feature_images_files',
    'feature_images_alt',
    'feature_images_index',

    'doctors',
    'doctor_ids',
    'testimonials',
    'contact',
    'isBookable',
    'hasReadMore',
    'clinics',
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

     string_fields = [
          'title',
          'tagline', 'tagline_fr', 'tagline_es', 'tagline_zh', 'tagline_ru',
          'overview', 'overview_fr', 'overview_es', 'overview_zh', 'overview_ru',
          'detailedDescription',
          'detailedDescription_fr', 'detailedDescription_es',
          'detailedDescription_zh', 'detailedDescription_ru',
    ]

     for field in string_fields:
         if field in data:
             val = data[field]
             if isinstance(val, list):
                 data[field] = val[0]

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

    def get_features_read(self, obj):
     features = obj.features or []
     request = self.context.get("request")
 
     images_by_index = {
         img.feature_index: img
         for img in obj.feature_images.all()
     }
 
     merged = []
 
     for idx, feature in enumerate(features):
         image = images_by_index.get(idx)
 
         merged.append({
             **feature,
             "image": (
                 {
                     "id": image.id,
                     "url": (
                         request.build_absolute_uri(image.image.url)
                         if request
                         else image.image.url
                     ),
                     "alt": image.alt,
                 }
                 if image
                 else None
             )
         })
 
     return merged

    
    # CREATE
    
    def create(self, validated_data):
        doctors_data = validated_data.pop('doctors', [])
        testimonials_data = validated_data.pop('testimonials', [])
        clinics_data = validated_data.pop('clinics', [])
        images_files = validated_data.pop('images_files', [])
        images_files_alt = validated_data.pop('images_files_alt', [])
        feature_images = validated_data.pop("feature_images_files", [])
        feature_images_alt = validated_data.pop("feature_images_alt", [])
        feature_images_index = validated_data.pop("feature_images_index", [])

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
        
        for img, index, alt in zip_longest(
           feature_images,
           feature_images_index,
           feature_images_alt,
           fillvalue="",
        ):
           ClinicalServiceFeatureImage.objects.create(
               clinical_service=service,
               feature_index=index,
               image=img,
               alt=alt or "",
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
        feature_images = validated_data.pop("feature_images_files", [])
        feature_images_alt = validated_data.pop("feature_images_alt", [])
        feature_images_index = validated_data.pop("feature_images_index", [])

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

        for i, img in enumerate(feature_images):
         # delete existing image for that feature index
         ClinicalServiceFeatureImage.objects.filter(
             clinical_service=instance,
             feature_index=feature_images_index[i]
         ).delete()
 
         ClinicalServiceFeatureImage.objects.create(
             clinical_service=instance,
             feature_index=feature_images_index[i],
             image=img,
             alt=feature_images_alt[i] if i < len(feature_images_alt) else ""
         )

        instance.save()
        return instance
    
class TimingsSerializer(serializers.Serializer):
    clinic = serializers.IntegerField()
    day = serializers.CharField()
    startTime = serializers.CharField()
    stopTime = serializers.CharField()
    services_offered = serializers.ListField(child=serializers.IntegerField(), required=False)
    

class OutpatientCenterSerializer(serializers.ModelSerializer):
    services_offered = serializers.PrimaryKeyRelatedField(
        queryset=ClinicalService.objects.all(),
          many=True,
           required=False)
    timings = serializers.JSONField()

    class Meta:
       model = OutpatientCenter
       fields = [
    "id",
    "name",
    "slug",
    "description",
    "description_fr",
    "description_es",
    "description_zh",
    "description_ru",
    "location",
    "contact",
    "services_offered",
    "timings",
]


    def to_internal_value(self, data):
        data = dict(data)

        #  JSON fields from FormData 
        json_fields = ["timings", "contact", "services_offered"]

        for field in json_fields:
            if field in data:
                raw = data[field]

                # extract single-value lists
                if isinstance(raw, list) and len(raw) == 1:
                    raw = raw[0]

                try:
                    parsed = json.loads(raw)

                    # force int PKs
                    if field == "services_offered":
                        parsed = [int(pk) for pk in parsed]

                    data[field] = parsed
                except Exception:
                    data[field] = [] if field != "contact" else {}

        #  Plain strings 
        for field in [
            "name",
            "description",
            "description_fr",
            "description_es",
            "description_zh",
            "description_ru",
            "location",
        ]:
            if field in data and isinstance(data[field], list):
                data[field] = data[field][0]


        return super().to_internal_value(data)

class ClinicalFAQSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ClinicalFAQ
        fields = [
            "id",
            "brief",
            "question",
            "answer",

            "question_fr",
            "question_es",
            "question_zh",
            "question_ru",

            "answer_fr",
            "answer_es",
            "answer_zh",
            "answer_ru",
        ]

