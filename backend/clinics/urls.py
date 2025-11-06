from rest_framework.routers import DefaultRouter
from .views import (
    ClinicalServiceViewSet, DoctorViewSet, ContactViewSet,
    TestimonialViewSet
)

router = DefaultRouter()
router.register('clinical-services', ClinicalServiceViewSet)
router.register('doctors', DoctorViewSet)
router.register('contacts', ContactViewSet)
router.register('testimonials', TestimonialViewSet)


urlpatterns = router.urls
