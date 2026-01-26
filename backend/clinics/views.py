from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import (
    ClinicalService,
    Doctor,
    Testimonial,
    ClinicalServiceImage,
    ClinicalServiceFeatureImage,  
    DoctorImage,
    OutpatientCenter,
)
from .serializers import (
    ClinicalServiceSerializer,
    DoctorSerializer,
    TestimonialSerializer,
    ClinicalServiceImageSerializer,
    ClinicalServiceFeatureImageSerializer, 
    OutpatientCenterSerializer,
)

DEBUG = True


# Helper function to print all incoming form data, including files
def log_request_data(request, label="Request"):
    print(f"\n[{label}] Incoming data:")

    # request.data is already parsed by DRF (QueryDict or MultiPartParser)
    for key, value in request.data.items():
        if hasattr(value, "name"):  # It's a file
            print(f"{key}: <File: {value.name}>")
        else:
            print(f"{key}: {value}")
    print("===========================\n")


# ClinicalService
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
            log_request_data(request, "ClinicalService CREATE")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "ClinicalService UPDATE")

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
            log_request_data(request, "Doctor CREATE")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "Doctor UPDATE")

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
            log_request_data(request, "Testimonial CREATE")
        return super().create(request, *args, **kwargs)


class ClinicalServiceImageViewSet(viewsets.ModelViewSet):
    queryset = ClinicalServiceImage.objects.all()
    serializer_class = ClinicalServiceImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "Image UPDATE")
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print(f"\n[Image DELETE] ID: {kwargs.get('pk')}")
        return super().destroy(request, *args, **kwargs)


class ClinicalServiceFeatureImageViewSet(viewsets.ModelViewSet):
    queryset = ClinicalServiceFeatureImage.objects.all()
    serializer_class = ClinicalServiceFeatureImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "Feature Image UPDATE")
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print(f"\n[Feature Image DELETE] ID: {kwargs.get('pk')}")
        return super().destroy(request, *args, **kwargs)


class OutpatientCenterViewSet(viewsets.ModelViewSet):
    queryset = OutpatientCenter.objects.all()
    serializer_class = OutpatientCenterSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "OutpatientCenter CREATE")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "OutpatientCenter UPDATE")

        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data)
