from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import (
    ClinicalService,
    Doctor,
    Testimonial,
    ClinicalServiceImage,
    DoctorImage,
    OutpatientCenter,
)
from .serializers import (
    ClinicalServiceSerializer,
    DoctorSerializer,
    TestimonialSerializer,
    ClinicalServiceImageSerializer,
    OutpatientCenterSerializer,
)

DEBUG = True

# ------------------------
# ClinicalService
# ------------------------
class ClinicalServiceViewSet(viewsets.ModelViewSet):
    queryset = ClinicalService.objects.all()
    serializer_class = ClinicalServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[ClinicalService CREATE] Incoming data:", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            serializer.data, status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data)



class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Doctor CREATE] Incoming data:", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data)



class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Testimonial CREATE] Incoming data:", request.data)
        return super().create(request, *args, **kwargs)


class ClinicalServiceImageViewSet(viewsets.ModelViewSet):
    queryset = ClinicalServiceImage.objects.all()
    serializer_class = ClinicalServiceImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Image UPDATE] Incoming data:", request.data)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[Image DELETE] ID:", kwargs.get("pk"))
        return super().destroy(request, *args, **kwargs)



class OutpatientCenterViewSet(viewsets.ModelViewSet):
    queryset = OutpatientCenter.objects.all()
    serializer_class = OutpatientCenterSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            print("\n[OutpatientCenter CREATE] Incoming data:", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data)
