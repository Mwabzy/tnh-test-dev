from django.contrib import admin
from django.urls import path, include
from authentication.views import RegisterView, LoginView
from rest_framework.routers import DefaultRouter
from clinics.views import ClinicalServiceViewSet





urlpatterns = [
    path('admin/', admin.site.urls),
    ##path('api/v1/auth/', include('authentication.urls')),
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginView.as_view()),
     path('', include('clinics.urls')),
]
