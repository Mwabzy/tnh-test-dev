from rest_framework.routers import DefaultRouter
from .views import (
    TeamMemberViewSet,
    BlogPostViewSet,
    CSRViewSet,
    SendEmailViewSet,
    TenderViewSet,
    CareerViewSet,
    PublicStatementViewSet,
    InterviewViewSet,
    CorporateDocumentViewSet,
    HeroViewSet,
    UserEnquiryViewSet,
    RecipientEmailSettingViewSet,
    BookedSlotViewSet,
)

router = DefaultRouter()
router.register('team-members', TeamMemberViewSet, basename='team-members')
router.register('blog-posts', BlogPostViewSet, basename='blog-posts')
router.register('csr', CSRViewSet, basename='csr')
router.register('send_email', SendEmailViewSet, basename="send_email" )
router.register('tenders', TenderViewSet, basename='tenders')
router.register('careers', CareerViewSet, basename='careers')
router.register('public-statements', PublicStatementViewSet, basename='public-statements')
router.register('interviews', InterviewViewSet, basename='interviews')
router.register('corporate-documents', CorporateDocumentViewSet, basename='corporate-documents')
router.register('hero', HeroViewSet, basename='hero')
router.register('user-enquiries', UserEnquiryViewSet, basename='user-enquiries')
router.register('booked-slots', BookedSlotViewSet, basename='booked-slots')
router.register('recipient-email-settings', RecipientEmailSettingViewSet, basename='recipient-email-settings')

urlpatterns = router.urls
