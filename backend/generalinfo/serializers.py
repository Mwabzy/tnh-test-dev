from rest_framework import serializers
from .models import TeamMember, BlogPost, CSR


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for TeamMember model with image handling."""
    
    image_url = serializers.SerializerMethodField(read_only=True)
    image_file = serializers.ImageField(write_only=True, required=False)
    image_alt = serializers.CharField(write_only=True, required=False, allow_blank=True)
    image_to_delete = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = TeamMember
        fields = "__all__"

    def get_image_url(self, obj):
        """Generate absolute URL for image if available."""
        if not obj.image:
            return None
        
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def create(self, validated_data):
        """Create a new team member with optional image."""
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
        """Update team member with image handling."""
        image_file = validated_data.pop("image_file", None)
        image_alt = validated_data.pop("image_alt", "")
        image_to_delete = validated_data.pop("image_to_delete", False)

        # Update standard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Handle image deletion
        if image_to_delete:
            if instance.image:
                instance.image.delete(save=False)
            instance.image = None
            instance.image_alt = ""

        # Handle image upload
        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt

        instance.save()
        return instance


class BlogPostSerializer(serializers.ModelSerializer):
    """Serializer for BlogPost model with cover image and additional image handling."""
    
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
        """Create a new blog post with optional images."""
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", "")
        image_alt = validated_data.pop("image_alt", "")

        instance = super().create(validated_data)

        # Handle cover image
        if cover_file:
            instance.coverImage = cover_file
            instance.coverImage_alt = cover_alt
        elif cover_delete:
            instance.coverImage = None
            instance.coverImage_alt = ""

        # Handle additional image
        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            instance.image = None
            instance.image_alt = ""

        instance.save()
        return instance

    def update(self, instance, validated_data):
        """Update blog post with image handling."""
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", instance.coverImage_alt or "")
        image_alt = validated_data.pop("image_alt", instance.image_alt or "")

        # Update standard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Handle cover image
        if cover_file:
            instance.coverImage = cover_file
            instance.coverImage_alt = cover_alt
        elif cover_delete:
            instance.coverImage = None
            instance.coverImage_alt = ""

        # Handle additional image
        if image_file:
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            instance.image = None
            instance.image_alt = ""

        instance.save()
        return instance


class CSRSerializer(serializers.ModelSerializer):
    """Serializer for CSR model with cover image handling."""
    
    cover_image_file = serializers.ImageField(write_only=True, required=False)
    cover_image_delete = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = CSR
        fields = "__all__"
        read_only_fields = ("id", "created_at")

    def create(self, validated_data):
        """Create a new CSR entry with optional cover image."""
        image_file = validated_data.pop("cover_image_file", None)
        validated_data.pop("cover_image_delete", None)

        # Create instance first
        csr = CSR.objects.create(**validated_data)

        # Attach image if provided
        if image_file:
            csr.cover_image = image_file
            csr.save(update_fields=["cover_image"])

        return csr

    def update(self, instance, validated_data):
        """Update CSR entry with image handling."""
        image_file = validated_data.pop("cover_image_file", None)
        delete_image = validated_data.pop("cover_image_delete", False)

        # Handle image deletion
        if delete_image and instance.cover_image:
            instance.cover_image.delete(save=False)
            instance.cover_image = None
            instance.cover_image_alt = ""

        # Handle image upload
        if image_file:
            if instance.cover_image:
                instance.cover_image.delete(save=False)
            instance.cover_image = image_file

        return super().update(instance, validated_data)