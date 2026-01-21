from rest_framework.routers import DefaultRouter
from .views import (
    ClinicalServiceViewSet, DoctorViewSet,
    TestimonialViewSet, ClinicalServiceImageViewSet, OutpatientCenterViewSet
)

router = DefaultRouter()
router.register('clinical-services', ClinicalServiceViewSet)
router.register('doctors', DoctorViewSet)
router.register('testimonials', TestimonialViewSet)
router.register('clinical-service-images', ClinicalServiceImageViewSet)
router.register("outpatient-centers", OutpatientCenterViewSet)


urlpatterns = router.urls
