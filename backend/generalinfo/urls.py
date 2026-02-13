from rest_framework.routers import DefaultRouter
from .views import (
    TeamMemberViewSet,
    BlogPostViewSet,
    CSRViewSet,
    SendEmailViewSet,
    TenderViewSet,
    CareerViewSet,
    HeroViewSet,
)

router = DefaultRouter()
router.register('team-members', TeamMemberViewSet, basename='team-members')
router.register('blog-posts', BlogPostViewSet, basename='blog-posts')
router.register('csr', CSRViewSet, basename='csr')
router.register('send_email', SendEmailViewSet, basename="send_email" )
router.register('tenders', TenderViewSet, basename='tenders')
router.register('careers', CareerViewSet, basename='careers')
router.register('hero', HeroViewSet, basename='hero')

urlpatterns = router.urls
