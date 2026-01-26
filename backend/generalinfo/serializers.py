from rest_framework import serializers
from .models import TeamMember, BlogPost, CSR


class TeamMemberSerializer(serializers.ModelSerializer):
    # Custom fields
    image_url = serializers.SerializerMethodField(read_only=True)
    image_file = serializers.ImageField(write_only=True, required=False)
    image_alt = serializers.CharField(write_only=True, required=False, allow_blank=True)
    image_to_delete = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = TeamMember
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None

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
    
class BlogPostSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)

        cover_alt = validated_data.pop("cover_image_alt", "")
        image_alt = validated_data.pop("image_alt", "")

        instance = super().create(validated_data)

        # Assign uploaded files directly to ImageField
        if cover_file:
            instance.coverImage = cover_file
            instance.coverImage_alt = cover_alt
        elif cover_delete:
            instance.coverImage = None
            instance.coverImage_alt = ""

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

        cover_alt = validated_data.pop("cover_image_alt", instance.coverImage_alt or "")
        image_alt = validated_data.pop("image_alt", instance.image_alt or "")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if cover_file:
            instance.coverImage = cover_file
            instance.coverImage_alt = cover_alt
        elif cover_delete:
            instance.coverImage = None
            instance.coverImage_alt = ""

        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            instance.image = None
            instance.image_alt = ""

        instance.save()
        return instance
        
class CSRSerializer(serializers.ModelSerializer):
    # Frontend-only fields
    cover_image_file = serializers.ImageField(
        write_only=True, required=False
    )
    cover_image_delete = serializers.BooleanField(
        write_only=True, required=False
    )

    class Meta:
        model = CSR
        fields = "__all__"
        read_only_fields = ("id", "created_at")

    def update(self, instance, validated_data):
        # Pop custom fields
        image_file = validated_data.pop("cover_image_file", None)
        delete_image = validated_data.pop("cover_image_delete", False)

        # Handle delete
        if delete_image and instance.cover_image:
            instance.cover_image.delete(save=False)
            instance.cover_image = None
            instance.cover_image_alt = ""

        # Handle upload
        if image_file:
            if instance.cover_image:
                instance.cover_image.delete(save=False)
            instance.cover_image = image_file

        return super().update(instance, validated_data)

    def create(self, validated_data):
        image_file = validated_data.pop("cover_image_file", None)
        validated_data.pop("cover_image_delete", None)

        #  create instance FIRST
        csr = CSR.objects.create(**validated_data)

        #  then attach image if provided
        if image_file:
            csr.cover_image = image_file
            csr.save(update_fields=["cover_image"])

        return csr
