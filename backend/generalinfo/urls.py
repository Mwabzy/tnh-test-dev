from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

router = DefaultRouter()
router.register('team-members', TeamMemberViewSet, basename='team-members')

urlpatterns = router.urls
