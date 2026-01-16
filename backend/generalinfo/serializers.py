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
        validated_data.pop("image_to_delete", False)  # Remove this from validated_data
        
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
    class Meta:
        model = BlogPost
        fields = "__all__"
        read_only_fields = ("id", "date", "created_at")

        
class CSRSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSR
        fields = "__all__"
        read_only_fields = ("id", "created_at")