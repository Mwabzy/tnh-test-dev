from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny




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


class LoginView(APIView):
    permission_classes = [AllowAny]
    # authentication_classes = [] 

    def post(self, request):
        username = (request.data.get("username") or "").strip()
        password = request.data.get("password") or ""

        if not username:
            return Response(
                {
                    "code": "missing_username",
                    "message": "Username is required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password:
            return Response(
                {
                    "code": "missing_password",
                    "message": "Password is required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        User = get_user_model()
        user_by_name = User.objects.filter(username=username).first()
        if user_by_name is None:
            return Response(
                {
                    "code": "user_not_found",
                    "message": "No account found with that username.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user_by_name.is_active:
            return Response(
                {
                    "code": "account_inactive",
                    "message": "This account is inactive. Contact administrator.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "token": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            })
        else:
            return Response(
                {
                    "code": "incorrect_password",
                    "message": "Incorrect password. Please try again.",
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
