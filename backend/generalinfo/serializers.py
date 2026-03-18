from rest_framework import serializers
from .models import (
    TeamMember,
    BlogPost,
    CSR,
    CSRImage,
    Tender,
    Career,
    PublicStatement,
    Interview,
    CorporateDocument,
    Hero,
)
from .translation import (
    auto_translate_missing_blogpost_fields,
    auto_translate_missing_csr_fields,
)


# Translation helper

def get_translated_field(obj, field, lang):
    """
    Return translated field if exists, else fallback to default.
    """
    if lang and lang != "en":
        translated = getattr(obj, f"{field}_{lang}", None)
        if translated:
            return translated
    return getattr(obj, field)



# Team Member Serializer

class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for TeamMember model with image + i18n handling."""

    # Image handling
    image_url = serializers.SerializerMethodField(read_only=True)
    image_file = serializers.ImageField(write_only=True, required=False)
    image_alt = serializers.CharField(write_only=True, required=False, allow_blank=True)
    image_to_delete = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = TeamMember
        fields = "__all__"

    # ---------- language ----------
    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "en") if request else "en"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        lang = self._lang()

        # Keep these fields writable, then localize only the response payload.
        data["role"] = get_translated_field(instance, "role", lang)
        data["description"] = get_translated_field(instance, "description", lang)
        data["group"] = get_translated_field(instance, "group", lang)
        return data
    # ---------- image ----------
    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url

    def create(self, validated_data):
        image_file = validated_data.pop("image_file", None)
        image_alt = validated_data.pop("image_alt", "")
        validated_data.pop("image_to_delete", False)

        member = TeamMember.objects.create(**validated_data)

        if image_file:
            member.image = image_file
            member.image_alt = image_alt
            member.save()

        return member

    def update(self, instance, validated_data):
        image_file = validated_data.pop("image_file", None)
        image_alt = validated_data.pop("image_alt", "")
        image_to_delete = validated_data.pop("image_to_delete", False)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if image_to_delete:
            if instance.image:
                instance.image.delete(save=False)
            instance.image = None
            instance.image_alt = ""

        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt

        instance.save()
        return instance



# Blog Post Serializer

class BlogPostSerializer(serializers.ModelSerializer):
    """Serializer for BlogPost model with images + i18n handling."""

    # Translated read fields
    subtitle = serializers.SerializerMethodField()
    shortdesc = serializers.SerializerMethodField()
    longdesc = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    # Image handling
    cover_image_file = serializers.ImageField(write_only=True, required=False)
    image_file = serializers.ImageField(write_only=True, required=False)
    cover_image_delete = serializers.BooleanField(write_only=True, required=False, default=False)
    image_delete = serializers.BooleanField(write_only=True, required=False, default=False)
    cover_image_alt = serializers.CharField(required=False, allow_blank=True)
    image_alt = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = BlogPost
        fields = "__all__"
        read_only_fields = ("id", "created_at")

    # ---------- language ----------
    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "en") if request else "en"

    def get_subtitle(self, obj):
        return get_translated_field(obj, "subtitle", self._lang())

    def get_shortdesc(self, obj):
        return get_translated_field(obj, "short_desc", self._lang())

    def get_longdesc(self, obj):
        return get_translated_field(obj, "long_desc", self._lang())

    def get_category(self, obj):
        return get_translated_field(obj, "category", self._lang())

    # ---------- create / update ----------
    def create(self, validated_data):
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", "")
        image_alt = validated_data.pop("image_alt", "")
        validated_data = auto_translate_missing_blogpost_fields(validated_data)

        instance = super().create(validated_data)

        if cover_file:
            instance.cover_image = cover_file
            instance.cover_image_alt = cover_alt
        elif cover_delete:
            instance.cover_image = None
            instance.cover_image_alt = ""

        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            instance.image = None
            instance.image_alt = ""

        instance.save()
        return instance

    def update(self, instance, validated_data):
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", instance.cover_image_alt or "")
        image_alt = validated_data.pop("image_alt", instance.image_alt or "")
        validated_data = auto_translate_missing_blogpost_fields(
            validated_data,
            instance=instance,
        )

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if cover_file:
            instance.cover_image = cover_file
            instance.cover_image_alt = cover_alt
        elif cover_delete:
            instance.cover_image = None
            instance.cover_image_alt = ""

        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            instance.image = None
            instance.image_alt = ""

        instance.save()
        return instance



# CSR Serializer
class CSRImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = CSRImage
        fields = ["id", "url", "alt"]

    def get_url(self, obj):
        if not obj.image:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class CSRSerializer(serializers.ModelSerializer):
    """Serializer for CSR model with i18n + multi-image handling."""

    description = serializers.SerializerMethodField()
    shortdesc = serializers.SerializerMethodField()
    longdesc = serializers.SerializerMethodField()

    image = CSRImageSerializer(source="uploaded_images", many=True, read_only=True)
    images_files = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
    )
    images_files_alt = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        write_only=True,
        required=False,
    )
    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
    )

    cover_image_file = serializers.ImageField(write_only=True, required=False)
    cover_image_delete = serializers.BooleanField(write_only=True, required=False)
    cover_image_alt = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CSR
        fields = "__all__"
        read_only_fields = ("id", "created_at")

    # ---------- language ----------
    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "en") if request else "en"

    def get_description(self, obj):
        return get_translated_field(obj, "description", self._lang())

    def get_shortdesc(self, obj):
        return get_translated_field(obj, "short_desc", self._lang())

    def get_longdesc(self, obj):
        return get_translated_field(obj, "long_desc", self._lang())

    def to_internal_value(self, data):
        data = data.copy()

        for field in ["images_files", "images_files_alt", "images_to_delete"]:
            if field in data:
                if hasattr(data, "getlist"):
                    values = data.getlist(field)
                else:
                    raw = data.get(field, [])
                    values = raw if isinstance(raw, list) else [raw]
                if field == "images_to_delete":
                    values = [int(v) for v in values if str(v).isdigit()]
                if hasattr(data, "setlist"):
                    data.setlist(field, values)
                else:
                    data[field] = values

        return super().to_internal_value(data)

    # ---------- create / update ----------
    def create(self, validated_data):
        image_file = validated_data.pop("cover_image_file", None)
        validated_data.pop("cover_image_delete", None)
        cover_alt = validated_data.pop("cover_image_alt", "")
        images_files = validated_data.pop("images_files", [])
        images_alt = validated_data.pop("images_files_alt", [])
        validated_data.pop("images_to_delete", None)
        validated_data = auto_translate_missing_csr_fields(validated_data)

        csr = CSR.objects.create(**validated_data)

        if image_file:
            csr.cover_image = image_file
            csr.cover_image_alt = cover_alt
            csr.save(update_fields=["cover_image", "cover_image_alt"])

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            CSRImage.objects.create(csr=csr, image=img, alt=alt_text)

        return csr

    def update(self, instance, validated_data):
        image_file = validated_data.pop("cover_image_file", None)
        delete_image = validated_data.pop("cover_image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", instance.cover_image_alt or "")

        images_files = validated_data.pop("images_files", [])
        images_alt = validated_data.pop("images_files_alt", [])
        images_to_delete = validated_data.pop("images_to_delete", [])
        validated_data = auto_translate_missing_csr_fields(
            validated_data,
            instance=instance,
        )

        if delete_image and instance.cover_image:
            instance.cover_image.delete(save=False)
            instance.cover_image = None
            instance.cover_image_alt = ""

        if image_file:
            if instance.cover_image:
                instance.cover_image.delete(save=False)
            instance.cover_image = image_file
            instance.cover_image_alt = cover_alt
        elif "cover_image_alt" in self.initial_data:
            instance.cover_image_alt = cover_alt

        if images_to_delete:
            for csr_image in CSRImage.objects.filter(
                id__in=images_to_delete,
                csr=instance,
            ):
                if csr_image.image:
                    csr_image.image.delete(save=False)
                csr_image.delete()

        raw_data = self.initial_data
        existing_alt_updates = {}
        for key in raw_data.keys():
            if not str(key).startswith("images[") or not str(key).endswith("]"):
                continue
            # Format expected: images[index][id], images[index][alt]
            parts = str(key).replace("]", "").split("[")
            if len(parts) != 3:
                continue
            index = parts[1]
            field = parts[2]
            if field not in {"id", "alt"}:
                continue
            existing_alt_updates.setdefault(index, {})[field] = raw_data.get(key)

        for item in existing_alt_updates.values():
            image_id = item.get("id")
            if not str(image_id).isdigit():
                continue
            CSRImage.objects.filter(
                id=int(image_id),
                csr=instance,
            ).update(alt=item.get("alt") or "")

        for idx, img in enumerate(images_files):
            alt_text = images_alt[idx] if idx < len(images_alt) else ""
            CSRImage.objects.create(csr=instance, image=img, alt=alt_text)

        return super().update(instance, validated_data)



# Email Serializer

class SendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    subject = serializers.CharField(required=True)
    body = serializers.CharField(required=True)

    # Optional booking metadata used to reserve appointment slots.
    appointmentDate = serializers.DateField(
        required=False,
        input_formats=["%Y-%m-%d", "%a %b %d %Y"],
    )
    appointmentTime = serializers.TimeField(
        required=False,
        input_formats=["%I:%M %p", "%H:%M", "%H:%M:%S"],
    )
    service = serializers.CharField(required=False)
    doctor = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    patientEmail = serializers.EmailField(required=False)
    additionalInfo = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        required_booking_fields = [
            "appointmentDate",
            "appointmentTime",
            "service",
            "location",
            "name",
            "phone",
            "patientEmail",
        ]

        has_booking_payload = any(
            field in attrs
            for field in [*required_booking_fields, "doctor", "additionalInfo"]
        )

        if has_booking_payload:
            missing = [
                field
                for field in required_booking_fields
                if not attrs.get(field)
            ]
            if missing:
                raise serializers.ValidationError(
                    {
                        field: "This field is required for booking requests."
                        for field in missing
                    }
                )

        return attrs


# Tender Serializer

class TenderSerializer(serializers.ModelSerializer):
    referenceNumber = serializers.CharField(source="reference_number")
    isPublished = serializers.BooleanField(source="is_published", required=False)
    datePosted = serializers.DateField(source="date_posted")
    closingDate = serializers.DateField(source="closing_date")

    fileUrl = serializers.SerializerMethodField(read_only=True)
    existingFileUrl = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Tender
        fields = (
            "id",
            "opportunity",
            "referenceNumber",
            "isPublished",
            "datePosted",
            "closingDate",
            "file",
            "fileUrl",
            "existingFileUrl",
            "created_at",
        )
        read_only_fields = ("id", "created_at", "fileUrl")
        extra_kwargs = {
            "file": {"required": False, "allow_null": True},
        }

    def get_fileUrl(self, obj):
        if not obj.file:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url

    def create(self, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().update(instance, validated_data)

class CareerSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    referenceNumber = serializers.CharField(source="reference_number")
    isPublished = serializers.BooleanField(source="is_published", required=False)
    location = serializers.CharField()
    opportunityType = serializers.CharField(source="opportunity_type")
    datePosted = serializers.DateField(source="posted_date")
    closingDate = serializers.DateField(source="closing_date", required=False, allow_null=True)
    fileUrl = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Career
        fields = (
            "id",
            "referenceNumber",
            "isPublished",
            "title",
            "location",
            "opportunityType",
            "datePosted",
            "closingDate",
            "file",
            "fileUrl",
        )
        read_only_fields = ("id", "fileUrl")
        extra_kwargs = {
            "file": {"required": False, "allow_null": True},
        }

    def get_fileUrl(self, obj):
        if not obj.file:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url


class PublicStatementSerializer(serializers.ModelSerializer):
    isPublished = serializers.BooleanField(source="is_published", required=False)
    fileUrl = serializers.SerializerMethodField(read_only=True)
    existingFileUrl = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = PublicStatement
        fields = (
            "id",
            "title",
            "isPublished",
            "file",
            "fileUrl",
            "existingFileUrl",
            "created_at",
        )
        read_only_fields = ("id", "fileUrl", "created_at")
        extra_kwargs = {
            "file": {"required": False, "allow_null": True},
        }

    def get_fileUrl(self, obj):
        if not obj.file:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url

    def create(self, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().update(instance, validated_data)


class CorporateDocumentSerializer(serializers.ModelSerializer):
    isPublished = serializers.BooleanField(source="is_published", required=False)
    fileUrl = serializers.SerializerMethodField(read_only=True)
    existingFileUrl = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = CorporateDocument
        fields = (
            "id",
            "title",
            "isPublished",
            "file",
            "fileUrl",
            "existingFileUrl",
            "created_at",
        )
        read_only_fields = ("id", "fileUrl", "created_at")
        extra_kwargs = {
            "file": {"required": False, "allow_null": True},
        }

    def get_fileUrl(self, obj):
        if not obj.file:
            return ""
        request = self.context.get("request")
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url

    def create(self, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("existingFileUrl", None)
        return super().update(instance, validated_data)


class InterviewSerializer(serializers.ModelSerializer):
    isPublished = serializers.BooleanField(source="is_published", required=False)
    videoUrl = serializers.CharField(source="video_url")

    class Meta:
        model = Interview
        fields = (
            "id",
            "title",
            "videoUrl",
            "isPublished",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

class HeroSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = Hero
        fields = (
            "id",
            "title",
            "description",
        )
        read_only_fields = ("id",)
