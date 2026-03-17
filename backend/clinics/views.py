from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from django.db import transaction

from .models import (
    ClinicalService,
    Doctor,
    Testimonial,
    ClinicalServiceImage,
    ClinicalServiceFeatureImage,  
    DoctorImage,
    OutpatientCenter,
    ClinicalFAQ,
    RoomWard,
)
from .serializers import (
    ClinicalServiceSerializer,
    DoctorSerializer,
    TestimonialSerializer,
    ClinicalServiceImageSerializer,
    ClinicalServiceFeatureImageSerializer, 
    OutpatientCenterSerializer,
     ClinicalFAQSerializer,
     RoomWardSerializer,
)
from .translation import (
    build_clinical_service_translation_preview,
    build_doctor_translation_preview,
    build_outpatient_center_translation_preview,
)

DEBUG = True


# Print all incoming form data, including files
def log_request_data(request, label="Request"):
    print(f"\n[{label}] Incoming data:")
    
    # Use .dict() for QueryDict (handles multiple values per key)
    if hasattr(request.data, "dict"):
        data_items = request.data.dict()
    else:
        data_items = request.data

    for key, value in data_items.items():
        if hasattr(value, "name"):  # It's a file
            print(f"{key}: <File: {value.name}>")
        elif isinstance(value, list):
            print(f"{key}: {value} (list)")
        else:
            print(f"{key}: {value} ({type(value).__name__})")
    print("===========================\n")



# ClinicalService
class ClinicalServiceViewSet(viewsets.ModelViewSet):
    queryset = ClinicalService.objects.all().order_by("order", "id")
    serializer_class = ClinicalServiceSerializer
    
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticatedOrReadOnly()]
        return [AllowAny()]

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

    @action(detail=False, methods=["get"], url_path="by-path")
    def by_path(self, request):
        path = request.query_params.get("path")
        if path is None:
            return Response(
                {"detail": "Missing 'path' query parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        path = path.strip().strip("/")
        if not path:
            return Response(
                {"detail": "'path' cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        service = get_object_or_404(ClinicalService, path=path)
        serializer = self.get_serializer(service)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_path="translate-preview",
        parser_classes=[JSONParser],
    )
    def translate_preview(self, request):
        payload = request.data if isinstance(request.data, dict) else {}
        translations = build_clinical_service_translation_preview(payload)
        return Response(translations, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["patch"],
        url_path="reorder",
        parser_classes=[JSONParser],
    )
    def reorder(self, request):
        ordered_ids = request.data.get("ordered_ids") or request.data.get(
            "orderedIds"
        )

        if not isinstance(ordered_ids, list) or len(ordered_ids) == 0:
            return Response(
                {"detail": "ordered_ids must be a non-empty list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            ordered_ids = [int(pk) for pk in ordered_ids]
        except (TypeError, ValueError):
            return Response(
                {"detail": "ordered_ids must contain integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(set(ordered_ids)) != len(ordered_ids):
            return Response(
                {"detail": "ordered_ids must not contain duplicates."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_ids = set(
            ClinicalService.objects.filter(id__in=ordered_ids).values_list(
                "id", flat=True
            )
        )
        if len(existing_ids) != len(ordered_ids):
            return Response(
                {"detail": "One or more ids do not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            for index, pk in enumerate(ordered_ids, start=1):
                ClinicalService.objects.filter(pk=pk).update(order=index)

        return Response({"status": "ok", "updated": len(ordered_ids)})


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all().order_by("order", "id")
    serializer_class = DoctorSerializer
    
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "Doctor CREATE")

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
          print("❌ SERIALIZER ERRORS:", serializer.errors)
          return Response(serializer.errors, status=400)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "Doctor UPDATE")

        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
               # Log the exact validation errors
               print("\n[VALIDATION ERROR]")
               if hasattr(serializer, "errors"):
                   print(serializer.errors)
               else:
                   print(str(e))
               print("===========================\n")
               return Response(
                   {"detail": "Validation failed", "errors": serializer.errors},
                   status=status.HTTP_400_BAD_REQUEST
               )
   
        instance = serializer.save()
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_path="translate-preview",
        parser_classes=[JSONParser],
    )
    def translate_preview(self, request):
        payload = request.data if isinstance(request.data, dict) else {}
        translations = build_doctor_translation_preview(payload)
        return Response(translations, status=status.HTTP_200_OK)

    @action(
        detail=False,
        methods=["patch"],
        url_path="reorder",
        parser_classes=[JSONParser],
    )
    def reorder(self, request):
        ordered_ids = request.data.get("ordered_ids") or request.data.get(
            "orderedIds"
        )

        if not isinstance(ordered_ids, list) or len(ordered_ids) == 0:
            return Response(
                {"detail": "ordered_ids must be a non-empty list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            ordered_ids = [int(pk) for pk in ordered_ids]
        except (TypeError, ValueError):
            return Response(
                {"detail": "ordered_ids must contain integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(set(ordered_ids)) != len(ordered_ids):
            return Response(
                {"detail": "ordered_ids must not contain duplicates."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_ids = set(
            Doctor.objects.filter(id__in=ordered_ids).values_list("id", flat=True)
        )
        if len(existing_ids) != len(ordered_ids):
            return Response(
                {"detail": "One or more ids do not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            for index, pk in enumerate(ordered_ids, start=1):
                Doctor.objects.filter(pk=pk).update(order=index)

        return Response({"status": "ok", "updated": len(ordered_ids)})
    
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

    def _log_validation_errors(self, serializer, label):
        print(f"\n[{label}] SERIALIZER ERRORS:")
        for field, errors in serializer.errors.items():
            print(f"{field}: {errors}")
        print("===========================\n")

    def create(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "OutpatientCenter CREATE")

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            self._log_validation_errors(serializer, "OutpatientCenter CREATE")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "OutpatientCenter UPDATE")

        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            self._log_validation_errors(serializer, "OutpatientCenter UPDATE")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        instance = serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="by-path")
    def by_path(self, request):
        path = request.query_params.get("path")
        if path is None:
            return Response(
                {"detail": "Missing 'path' query parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        path = path.strip().strip("/")
        if not path:
            return Response(
                {"detail": "'path' cannot be empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        center = get_object_or_404(OutpatientCenter, path=path)
        serializer = self.get_serializer(center)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["post"],
        url_path="translate-preview",
        parser_classes=[JSONParser],
    )
    def translate_preview(self, request):
        payload = request.data if isinstance(request.data, dict) else {}
        translations = build_outpatient_center_translation_preview(payload)
        return Response(translations, status=status.HTTP_200_OK)


class ClinicalFAQViewSet(viewsets.ModelViewSet):
    queryset = ClinicalFAQ.objects.all()
    serializer_class = ClinicalFAQSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [JSONParser, FormParser]

    def create(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "ClinicalFAQ CREATE")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "ClinicalFAQ UPDATE")

        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print("\n[ClinicalFAQ VALIDATION ERROR]")
            if hasattr(serializer, "errors"):
                print(serializer.errors)
            else:
                print(str(e))
            print("===========================\n")

            return Response(
                {
                    "detail": "Validation failed",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        instance = serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print(f"\n[ClinicalFAQ DELETE] ID: {kwargs.get('pk')}")
            print("===========================\n")
        return super().destroy(request, *args, **kwargs)


class RoomWardViewSet(viewsets.ModelViewSet):
    queryset = RoomWard.objects.all()
    serializer_class = RoomWardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "RoomWard CREATE")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        if DEBUG:
            log_request_data(request, "RoomWard UPDATE")

        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print("\n[RoomWard VALIDATION ERROR]")
            if hasattr(serializer, "errors"):
                print(serializer.errors)
            else:
                print(str(e))
            print("===========================\n")

            return Response(
                {
                    "detail": "Validation failed",
                    "errors": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        instance = serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        if DEBUG:
            print(f"\n[RoomWard DELETE] ID: {kwargs.get('pk')}")
            print("===========================\n")
        return super().destroy(request, *args, **kwargs)
