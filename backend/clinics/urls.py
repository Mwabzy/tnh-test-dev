from rest_framework.routers import DefaultRouter
from .views import (
    ClinicalServiceViewSet, DoctorViewSet,
    TestimonialViewSet, ClinicalServiceImageViewSet  
)

router = DefaultRouter()
router.register('clinical-services', ClinicalServiceViewSet)
router.register('doctors', DoctorViewSet)
router.register('testimonials', TestimonialViewSet)
router.register('clinical-service-images', ClinicalServiceImageViewSet)


urlpatterns = router.urls
