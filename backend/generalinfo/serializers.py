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
        extra_kwargs = {
            'author': {'required': False},
            'title': {'required': False},
            'subtitle': {'required': False},
            'short_desc': {'required': False},
            'long_desc': {'required': False},
            'category': {'required': False},
            'blog_subtitle': {'required': False},
        }

    def create(self, validated_data):
        """Create a new blog post with optional images."""
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
        """Update blog post with image handling."""
        print(f"DEBUG: Starting update for blog post {instance.id}")
        print(f"DEBUG: Validated data keys: {validated_data.keys()}")
        
        cover_file = validated_data.pop("cover_image_file", None)
        image_file = validated_data.pop("image_file", None)
        cover_delete = validated_data.pop("cover_image_delete", False)
        image_delete = validated_data.pop("image_delete", False)
        cover_alt = validated_data.pop("cover_image_alt", instance.cover_image_alt or "")
        image_alt = validated_data.pop("image_alt", instance.image_alt or "")

        print(f"DEBUG: Cover file: {cover_file}")
        print(f"DEBUG: Cover delete: {cover_delete}")
        print(f"DEBUG: Cover alt: {cover_alt}")
        for attr, value in validated_data.items():
            print(f"DEBUG: Setting {attr} = {value}")
            setattr(instance, attr, value)
        if cover_file:
            print(f"DEBUG: Setting new cover image")
            instance.cover_image = cover_file
            instance.cover_image_alt = cover_alt
        elif cover_delete:
            print(f"DEBUG: Deleting cover image")
            instance.cover_image = None
            instance.cover_image_alt = ""

        if image_file:
            print(f"DEBUG: Setting new main image")
            instance.image = image_file
            instance.image_alt = image_alt
        elif image_delete:
            print(f"DEBUG: Deleting main image")
            instance.image = None
            instance.image_alt = ""

        instance.save()
        print(f"DEBUG: Update completed successfully")
        return instance


class CSRSerializer(serializers.ModelSerializer):
    """Serializer for CSR model with cover image handling."""
    shortdesc = serializers.CharField(
        source="short_desc",
        write_only=True,
        required=False,
        allow_blank=True,
    )
    longdesc = serializers.CharField(
        source="long_desc",
        write_only=True,
        required=False,
        allow_blank=True,
    )
    blogsubtitle = serializers.CharField(
        source="blog_subtitle",
        write_only=True,
        required=False,
        allow_blank=True,
    )
        
    cover_image_file = serializers.ImageField(write_only=True, required=False)
    cover_image_delete = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = CSR
        fields = "__all__"
        read_only_fields = ("id", "created_at")
        extra_kwargs = {
            "short_desc": {"required": False, "allow_blank": True},
            "long_desc": {"required": False, "allow_blank": True},
            "blog_subtitle": {"required": False, "allow_blank": True},
        }

    def create(self, validated_data):
        """Create a new CSR entry with optional cover image."""
        image_file = validated_data.pop("cover_image_file", None)
        validated_data.pop("cover_image_delete", None)
        
          # Pop the alias fields
        short_desc = validated_data.pop("short_desc", "")
        long_desc = validated_data.pop("long_desc", "")
        blog_subtitle = validated_data.pop("blog_subtitle", "")

    # Create CSR instance
        csr = CSR.objects.create(
        **validated_data,
        short_desc=short_desc,
        long_desc=long_desc,
        blog_subtitle=blog_subtitle,
    )

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
    
class SendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    subject = serializers.CharField(required=True)
    body = serializers.CharField(required=True)