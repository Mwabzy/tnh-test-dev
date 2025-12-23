from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import (
    ClinicalService,
    Doctor,
    Testimonial,
    ClinicalServiceImage
)
from .serializers import (
    ClinicalServiceSerializer,
    DoctorSerializer,
    TestimonialSerializer,
    ClinicalServiceImageSerializer
)

DEBUG = True


class ClinicalServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ClinicalService.objects.all()
    serializer_class = ClinicalServiceSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[ClinicalService CREATE] Incoming POST data:")
            print(request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        clinical_service = serializer.save()

        if DEBUG:
            print("ClinicalService created with ID:", clinical_service.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[ClinicalService UPDATE] Incoming data:")
            print(request.data)

        response = super().update(request, *args, **kwargs)

        if DEBUG:
            print("ClinicalService updated:", kwargs.get("pk"))

        return response


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Doctor CREATE] Incoming POST data:")
            print(request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()

        if DEBUG:
            print("Doctor created with ID:", doctor.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Testimonial CREATE] Incoming POST data:")
            print(request.data)

        response = super().create(request, *args, **kwargs)

        if DEBUG:
            print("Testimonial created")

        return response


# for image and alt update & delete
class ClinicalServiceImageViewSet(viewsets.ModelViewSet):
    queryset = ClinicalServiceImage.objects.all()
    serializer_class = ClinicalServiceImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Image UPDATE] Incoming data:")
            print(request.data)

        response = super().update(request, *args, **kwargs)

        if DEBUG:
            print("Image updated:", kwargs.get("pk"))

        return response

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Image DELETE] Image ID:", kwargs.get("pk"))

        return super().destroy(request, *args, **kwargs)
