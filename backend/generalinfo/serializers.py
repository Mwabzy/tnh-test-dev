from rest_framework import serializers
from .models import TeamMember, BlogPost, CSR


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"


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

