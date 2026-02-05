from rest_framework import serializers
from .models import TeamMember, BlogPost, CSR, Tender


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

    # Translated read fields
    role = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()

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

    def get_role(self, obj):
        return get_translated_field(obj, "role", self._lang())

    def get_description(self, obj):
        return get_translated_field(obj, "description", self._lang())

    def get_group(self, obj):
        return get_translated_field(obj, "group", self._lang())

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
        read_only_fields = ("id", "date", "created_at")

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

class CSRSerializer(serializers.ModelSerializer):
    """Serializer for CSR model with i18n + cover image handling."""

    description = serializers.SerializerMethodField()
    shortdesc = serializers.SerializerMethodField()
    longdesc = serializers.SerializerMethodField()

    cover_image_file = serializers.ImageField(write_only=True, required=False)
    cover_image_delete = serializers.BooleanField(write_only=True, required=False)

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

    # ---------- create / update ----------
    def create(self, validated_data):
        image_file = validated_data.pop("cover_image_file", None)
        validated_data.pop("cover_image_delete", None)

        csr = CSR.objects.create(**validated_data)

        if image_file:
            csr.cover_image = image_file
            csr.save(update_fields=["cover_image"])

        return csr

    def update(self, instance, validated_data):
        image_file = validated_data.pop("cover_image_file", None)
        delete_image = validated_data.pop("cover_image_delete", False)

        if delete_image and instance.cover_image:
            instance.cover_image.delete(save=False)
            instance.cover_image = None

        if image_file:
            if instance.cover_image:
                instance.cover_image.delete(save=False)
            instance.cover_image = image_file

        return super().update(instance, validated_data)



# Email Serializer

class SendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    subject = serializers.CharField(required=True)
    body = serializers.CharField(required=True)


# Tender Serializer

class TenderSerializer(serializers.ModelSerializer):
    referenceNumber = serializers.CharField(source="reference_number")
    opportunityType = serializers.CharField(source="opportunity_type")
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
            "description",
            "opportunityType",
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
