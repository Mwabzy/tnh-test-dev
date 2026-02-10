from rest_framework.routers import DefaultRouter
from .views import (
    ClinicalServiceViewSet,
    DoctorViewSet,
    TestimonialViewSet,
    ClinicalServiceImageViewSet,
    ClinicalServiceFeatureImageViewSet,  
    OutpatientCenterViewSet,
     ClinicalFAQViewSet
)

router = DefaultRouter()
router.register("clinical-services", ClinicalServiceViewSet)
router.register("doctors", DoctorViewSet)
router.register("testimonials", TestimonialViewSet)
router.register("clinical-service-images", ClinicalServiceImageViewSet)
router.register(
    "clinical-service-feature-images",
    ClinicalServiceFeatureImageViewSet,
)
router.register("outpatient-centers", OutpatientCenterViewSet)
router.register("clinical-faqs", ClinicalFAQViewSet)

urlpatterns = router.urls
