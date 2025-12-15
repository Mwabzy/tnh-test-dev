from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import ClinicalService, Doctor, Testimonial
from .serializers import ClinicalServiceSerializer, DoctorSerializer, TestimonialSerializer

class ClinicalServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ClinicalService.objects.all()
    serializer_class = ClinicalServiceSerializer

    def create(self, request, *args, **kwargs):
        print("\n Incoming POST data:", request.data)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            clinical_service = serializer.save()
            print(" ClinicalService created:", clinical_service.id)
            return Response(serializer.data, status=201)

        print("\n Serializer errors:", serializer.errors, "\n")
        return Response(serializer.errors, status=400)


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def create(self, request, *args, **kwargs):
        print("\n Incoming POST data:", request.data)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            print(" Doctor created:", doctor.id)
            return Response(serializer.data, status=201)

        print("\n Serializer errors:", serializer.errors, "\n") 
        return Response(serializer.errors, status=400)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
