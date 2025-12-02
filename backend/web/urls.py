from django.contrib import admin
from django.urls import path, include
from authentication.views import RegisterView, LoginView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/auth/register/', RegisterView.as_view(), name='api-register'),
    path('api/v1/auth/login/', LoginView.as_view(), name='api-login'),


    path('api/v1/', include('clinics.urls')),
]
