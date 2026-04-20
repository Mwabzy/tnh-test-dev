from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('tnh-adm/', admin.site.urls),

    path('api/v1/auth/', include('authentication.urls')),

    path('api/v1/', include('clinics.urls')),
    path('api/v1/', include('generalinfo.urls')),
     
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
