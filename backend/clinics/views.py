from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ClinicalService, Doctor, Testimonial
from .serializers import ClinicalServiceSerializer, DoctorSerializer, TestimonialSerializer

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
            print("\nIncoming POST data:", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        clinical_service = serializer.save()

        if DEBUG:
            print("ClinicalService created:", clinical_service.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\nIncoming POST data:", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        doctor = serializer.save()

        if DEBUG:
            print("Doctor created:", doctor.id)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
