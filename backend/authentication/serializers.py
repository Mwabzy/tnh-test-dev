from rest_framework import serializers
from authentication.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['username', 'first_name', 'email', 'last_name']