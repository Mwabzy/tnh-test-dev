from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "username"

    def validate(self, attrs):
        username = (attrs.get(self.username_field) or "").strip()
        password = attrs.get("password") or ""

        if not username:
            raise serializers.ValidationError(
                {
                    "code": "missing_username",
                    "message": "Username is required.",
                }
            )

        if not password:
            raise serializers.ValidationError(
                {
                    "code": "missing_password",
                    "message": "Password is required.",
                }
            )

        user_model = get_user_model()
        user_by_name = user_model.objects.filter(username=username).first()

        if user_by_name is None:
            raise serializers.ValidationError(
                {
                    "code": "user_not_found",
                    "message": "No account found with that username.",
                }
            )

        self.user = authenticate(
            request=self.context.get("request"),
            username=username,
            password=password,
        )

        if self.user is None:
            raise serializers.ValidationError(
                {
                    "code": "incorrect_password",
                    "message": "Incorrect password. Please try again.",
                }
            )

        refresh = self.get_token(self.user)
        return {
            "token": str(refresh.access_token),
            "user": {
                "username": self.user.username,
                "email": self.user.email,
            },
        }
