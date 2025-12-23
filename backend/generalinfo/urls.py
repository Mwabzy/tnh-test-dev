from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet, BlogPostViewSet

router = DefaultRouter()
router.register('team-members', TeamMemberViewSet, basename='team-members')
router.register('blog-posts', BlogPostViewSet, basename='blog-posts')

urlpatterns = router.urls
urlpatterns = [
    path("", include(router.urls)),
]