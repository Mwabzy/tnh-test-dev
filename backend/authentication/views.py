from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer




class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User registered successfully",
                "token": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as exc:
            data = exc.detail
            code = data.get("code")
            status_code = {
                "missing_username": status.HTTP_400_BAD_REQUEST,
                "missing_password": status.HTTP_400_BAD_REQUEST,
                "user_not_found": status.HTTP_401_UNAUTHORIZED,
                "incorrect_password": status.HTTP_401_UNAUTHORIZED,
            }.get(code, status.HTTP_400_BAD_REQUEST)
            return Response(data, status=status_code)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
