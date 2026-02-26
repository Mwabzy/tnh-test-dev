from rest_framework import serializers
from .models import ClinicalService, ClinicalServiceFeatureImage, Doctor, Testimonial, ClinicalServiceImage, DoctorImage, OutpatientCenter, OutpatientCenterImage, ClinicalFAQ, RoomWard
from .translation import auto_translate_missing_clinical_service_fields
import json
import re
from itertools import zip_longest
from django.conf import settings

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


def build_media_url(request, relative_url):
    use_absolute = getattr(settings, "USE_ABSOLUTE_MEDIA_URLS", settings.DEBUG)
    if use_absolute and request:
        return request.build_absolute_uri(relative_url)
    return relative_url


class DoctorImageSerializer(serializers.ModelSerializer):

     url = serializers.SerializerMethodField()
 
     class Meta:
         model = DoctorImage
         fields = ["id", "url", "alt"]
 
     def get_url(self, obj):
         return build_media_url(self.context.get("request"), obj.image.url)

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
    focalX = serializers.FloatField(source="focal_x", required=False)
    focalY = serializers.FloatField(source="focal_y", required=False)

    class Meta:
        model = ClinicalServiceImage
        fields = ["id", "url", "alt", "focalX", "focalY"]

    def get_url(self, obj):
        return build_media_url(self.context.get("request"), obj.image.url)
    

# Clinical Features Image serializer
class ClinicalServiceFeatureImageSerializer(serializers.ModelSerializer):
     url = serializers.SerializerMethodField()
 
     class Meta:
         model = ClinicalServiceFeatureImage
         fields = ["id", "feature_index", "url", "alt"]
 
     def get_url(self, obj):
         return build_media_url(self.context.get("request"), obj.image.url)


class OutpatientCenterImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = OutpatientCenterImage
        fields = ["id", "url", "alt"]

    def get_url(self, obj):
        return build_media_url(self.context.get("request"), obj.image.url)



# ClinicalService Serializer

class ClinicalServiceSerializer(serializers.ModelSerializer):
    doctors = SlimDoctorSerializer(many=True, read_only=True)

    doctor_ids = serializers.PrimaryKeyRelatedField(source='doctors', queryset=Doctor.objects.all(), many=True, write_only=True, required=False)

    testimonials = TestimonialSerializer(many=True, required=False)

    images = ClinicalServiceImageSerializer(source="uploaded_images", many=True, read_only=True)
    images_files = serializers.ListField(child=serializers.ImageField(), write_only=True, required=False)
    images_files_alt = serializers.ListField(child=serializers.CharField(allow_blank=True), write_only=True, required=False)
    images_files_focal_x = serializers.ListField(
        child=serializers.FloatField(min_value=0, max_value=100),
        write_only=True,
        required=False,
    )
    images_files_focal_y = serializers.ListField(
        child=serializers.FloatField(min_value=0, max_value=100),
        write_only=True,
        required=False,
    )
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
    'title_fr', 'title_es', 'title_zh', 'title_ru',
    'path',
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
    'ftOnHomepage',
    'clinics',
    'images',
    'images_files',
    'images_files_alt',
    'images_files_focal_x',
    'images_files_focal_y',
    'images_to_delete',
    'locations',
]

    @staticmethod
    def _normalize_path(value):
        if value is None:
            return None
        if isinstance(value, str):
            cleaned = value.strip()
            return cleaned or None
        return value

    def validate(self, attrs):
        if "path" in attrs:
            attrs["path"] = self._normalize_path(attrs.get("path"))

        ft_on_homepage = attrs.get("ftOnHomepage")
        if ft_on_homepage is None and self.instance is not None:
            ft_on_homepage = self.instance.ftOnHomepage

        if ft_on_homepage:
            featured_query = ClinicalService.objects.filter(ftOnHomepage=True)
            if self.instance is not None:
                featured_query = featured_query.exclude(pk=self.instance.pk)

            if featured_query.count() >= 3:
                raise serializers.ValidationError(
                    {
                        "ftOnHomepage": (
                            "Unselect another ft on homepage service to add a new one"
                        )
                    }
                )

        return attrs

    
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
          'title_fr', 'title_es', 'title_zh', 'title_ru',
          'path',
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
     for bool_field in ['isBookable', 'hasReadMore', 'ftOnHomepage']:
         if bool_field in data:
             val = data[bool_field]
             if isinstance(val, list):
                 val = val[0]
             data[bool_field] = str(val).lower() == 'true'
 
     # Strings 
     for field in [
         'title',
         'title_fr', 'title_es', 'title_zh', 'title_ru',
         'path',
         'tagline', 'tagline_fr', 'tagline_es', 'tagline_zh', 'tagline_ru',
         'overview', 'overview_fr', 'overview_es', 'overview_zh', 'overview_ru',
         'detailedDescription',
         'detailedDescription_fr', 'detailedDescription_es',
         'detailedDescription_zh', 'detailedDescription_ru',
     ]:
         if field in data:
             val = data[field]
             if isinstance(val, list):
                 data[field] = val[0]

     if "path" in data:
         data["path"] = self._normalize_path(data.get("path"))
 
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
                        build_media_url(request, image.image.url)
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
        images_files_focal_x = validated_data.pop('images_files_focal_x', [])
        images_files_focal_y = validated_data.pop('images_files_focal_y', [])
        feature_images = validated_data.pop("feature_images_files", [])
        feature_images_alt = validated_data.pop("feature_images_alt", [])
        feature_images_index = validated_data.pop("feature_images_index", [])

        validated_data = auto_translate_missing_clinical_service_fields(validated_data)

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
            focal_x = 50.0
            if index < len(images_files_focal_x):
                focal_x = images_files_focal_x[index]
            focal_y = 20.0
            if index < len(images_files_focal_y):
                focal_y = images_files_focal_y[index]

            ClinicalServiceImage.objects.create(
                clinical_service=service,
                image=img,
                alt=alt_text,
                focal_x=focal_x,
                focal_y=focal_y,
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
        images_files_focal_x = validated_data.pop('images_files_focal_x', [])
        images_files_focal_y = validated_data.pop('images_files_focal_y', [])
        images_to_delete = validated_data.pop('images_to_delete', [])
        feature_images = validated_data.pop("feature_images_files", [])
        feature_images_alt = validated_data.pop("feature_images_alt", [])
        feature_images_index = validated_data.pop("feature_images_index", [])

        validated_data = auto_translate_missing_clinical_service_fields(
            validated_data,
            instance=instance,
        )

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
            focal_x = 50.0
            if index < len(images_files_focal_x):
                focal_x = images_files_focal_x[index]
            focal_y = 20.0
            if index < len(images_files_focal_y):
                focal_y = images_files_focal_y[index]

            ClinicalServiceImage.objects.create(
                clinical_service=instance,
                image=img,
                alt=alt_text,
                focal_x=focal_x,
                focal_y=focal_y,
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
    image = OutpatientCenterImageSerializer(
        source="uploaded_images", many=True, read_only=True
    )
    images_files = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    images_files_alt = serializers.ListField(
        child=serializers.CharField(allow_blank=True), write_only=True, required=False
    )
    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
       model = OutpatientCenter
       fields = [
    "id",
    "name",
    "slug",
    "path",
    "description",
    "description_fr",
    "description_es",
    "description_zh",
    "description_ru",
    "location",
    "contact",
    "services_offered",
    "timings",
    "image",
    "images_files",
    "images_files_alt",
    "images_to_delete",
]

    @staticmethod
    def _normalize_path(value):
        if value is None:
            return None
        if isinstance(value, str):
            cleaned = value.strip()
            return cleaned or None
        return value

    def validate(self, attrs):
        if "path" in attrs:
            attrs["path"] = self._normalize_path(attrs.get("path"))
        return attrs


    def to_internal_value(self, data):
        data = data.copy()

        #  JSON fields from FormData 
        json_fields = ["timings", "contact", "services_offered"]

        for field in json_fields:
            if field in data:
                raw = data[field]

                # extract single-value lists
                if isinstance(raw, list) and len(raw) == 1:
                    raw = raw[0]

                try:
                    parsed = (
                        raw
                        if isinstance(raw, (list, dict))
                        else json.loads(raw)
                    )

                    # force int PKs
                    if field == "services_offered":
                        parsed = [int(pk) for pk in parsed if str(pk).isdigit()]
                        if hasattr(data, "setlist"):
                            data.setlist(field, parsed)
                        else:
                            data[field] = parsed
                    else:
                        # QueryDict stringifies dict/list with single quotes if set directly.
                        # Store valid JSON strings for multipart submissions.
                        if hasattr(data, "setlist"):
                            data[field] = json.dumps(parsed)
                        else:
                            data[field] = parsed
                except Exception:
                    fallback = [] if field != "contact" else {}
                    if field == "services_offered" and hasattr(data, "setlist"):
                        data.setlist(field, [])
                    else:
                        data[field] = fallback

        #  Plain strings 
        for field in [
            "name",
            "path",
            "description",
            "description_fr",
            "description_es",
            "description_zh",
            "description_ru",
            "location",
        ]:
            if field in data and isinstance(data[field], list):
                data[field] = data[field][0]

        if "path" in data:
            data["path"] = self._normalize_path(data.get("path"))

        for field in ["images_files", "images_files_alt", "images_to_delete"]:
            if field in data:
                values = (
                    data.getlist(field)
                    if hasattr(data, "getlist")
                    else (data[field] if isinstance(data[field], list) else [data[field]])
                )
                if field == "images_to_delete":
                    values = [int(v) for v in values if str(v).isdigit()]
                if hasattr(data, "setlist"):
                    data.setlist(field, values)
                else:
                    data[field] = values

        return super().to_internal_value(data)

    def create(self, validated_data):
        images_files = validated_data.pop("images_files", [])
        images_alt = validated_data.pop("images_files_alt", [])
        services_offered = validated_data.pop("services_offered", [])

        instance = OutpatientCenter.objects.create(**validated_data)
        if services_offered:
            instance.services_offered.set(services_offered)

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            OutpatientCenterImage.objects.create(
                outpatient_center=instance,
                image=img,
                alt=alt_text,
            )

        return instance

    def update(self, instance, validated_data):
        images_files = validated_data.pop("images_files", [])
        images_alt = validated_data.pop("images_files_alt", [])
        images_to_delete = validated_data.pop("images_to_delete", [])
        services_offered = validated_data.pop("services_offered", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if services_offered is not None:
            instance.services_offered.set(services_offered)

        if images_to_delete:
            OutpatientCenterImage.objects.filter(
                id__in=images_to_delete,
                outpatient_center=instance,
            ).delete()

        raw_data = self.initial_data
        existing_alt_updates = {}
        for key in raw_data.keys():
            match = re.match(r"^images\[(\d+)\]\[(id|alt)\]$", str(key))
            if not match:
                continue
            index, field = match.groups()
            if index not in existing_alt_updates:
                existing_alt_updates[index] = {}
            existing_alt_updates[index][field] = raw_data.get(key)

        for item in existing_alt_updates.values():
            image_id = item.get("id")
            if not str(image_id).isdigit():
                continue
            OutpatientCenterImage.objects.filter(
                id=int(image_id),
                outpatient_center=instance,
            ).update(alt=item.get("alt") or "")

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            OutpatientCenterImage.objects.create(
                outpatient_center=instance,
                image=img,
                alt=alt_text,
            )

        instance.save()
        return instance

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

class RoomWardSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    image_file = serializers.ImageField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = RoomWard
        fields = [
            "id",
            "title",
            "image",
            "image_file",
            "features",
            "name_fr",
            "name_es",
            "name_zh",
            "name_ru",
        ]

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def to_internal_value(self, data):
        """
        Support FormData submissions and flatten single-value lists.
        Keeps behavior consistent with your existing serializers.
        """
        data = dict(data)

        string_fields = [
            "title",
            "name_fr",
            "name_es",
            "name_zh",
            "name_ru",
        ]

        for field in string_fields:
            if field in data:
                value = data[field]
                if isinstance(value, list):
                    data[field] = value[0]

        if "features" in data:
            raw_features = data["features"]
            if isinstance(raw_features, list) and len(raw_features) == 1:
                raw_features = raw_features[0]
            if isinstance(raw_features, str):
                try:
                    data["features"] = json.loads(raw_features)
                except Exception:
                    data["features"] = []

        if "image_file" in data and isinstance(data["image_file"], list):
            data["image_file"] = data["image_file"][0]

        return super().to_internal_value(data)

    def create(self, validated_data):
        image_file = validated_data.pop("image_file", None)
        instance = RoomWard.objects.create(**validated_data)
        if image_file is not None:
            instance.image = image_file
            instance.save(update_fields=["image"])
        return instance

    def update(self, instance, validated_data):
        image_file = validated_data.pop("image_file", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if image_file is not None:
            instance.image = image_file
        instance.save()
        return instance

