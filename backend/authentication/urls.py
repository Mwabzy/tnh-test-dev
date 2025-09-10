from rest_framework.routers import DefaultRouter
from django.urls import path
from authentication.views import UserViewSet

router = DefaultRouter()

router.register('users', UserViewSet, basename='user')

app_name = 'authentication'

urlpatterns = router.urls