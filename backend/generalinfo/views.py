import logging


from rest_framework import viewsets, status, parsers
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from django.db import IntegrityError, transaction
from web.send_email import send_email

from .models import (
    TeamMember,
    BlogPost,
    CSR,
    Tender,
    Career,
    PublicStatement,
    Interview,
    CorporateDocument,
    Hero,
    Appointment,
)
from .serializers import (
    TeamMemberSerializer,
    BlogPostSerializer,
    CSRSerializer,
    SendEmailSerializer,
    TenderSerializer,
    CareerSerializer,
    PublicStatementSerializer,
    InterviewSerializer,
    CorporateDocumentSerializer,
    HeroSerializer,
)
from .translation import (
    build_blogpost_translation_preview,
    build_csr_translation_preview,
)

logger = logging.getLogger(__name__)



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

class TeamMemberViewSet(viewsets.ModelViewSet):
    """ViewSet for managing team members with image upload support."""
    
    queryset = TeamMember.objects.all().order_by("order", "id")
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, parsers.JSONParser)
    
    def create(self, request, *args, **kwargs):
        logger.info("Creating new team member - User: %s", request.user)
        logger.debug("Request data: %s | Files: %s", request.data, request.FILES)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        logger.info("Team member created successfully: %s", serializer.data.get('id'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        
        logger.info("Updating team member %s", instance.id)
        logger.debug("Request data: %s | Files: %s", request.data, request.FILES)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["patch"],
        url_path="reorder",
        parser_classes=[parsers.JSONParser],
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

        ordered_ids = [str(pk) for pk in ordered_ids]
        if len(set(ordered_ids)) != len(ordered_ids):
            return Response(
                {"detail": "ordered_ids must not contain duplicates."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_ids = set(
            str(pk)
            for pk in TeamMember.objects.filter(id__in=ordered_ids).values_list(
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
                TeamMember.objects.filter(pk=pk).update(order=index)

        return Response({"status": "ok", "updated": len(ordered_ids)})


class BlogPostViewSet(viewsets.ModelViewSet):
    """ViewSet for managing blog posts with image upload support."""
    
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)

    def create(self, request, *args, **kwargs):
        logger.info("Creating new blog post - User: %s", request.user)
        logger.debug("Request data: %s", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        logger.info("Blog post created successfully: %s", serializer.data.get('id'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        """Handle PUT/PATCH requests."""
        logger.info("Updating blog post - User: %s", request.user)
        logger.debug("Request data: %s", request.data)
        
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # For PATCH requests, allow partial updates
        if request.method == 'PATCH':
            partial = True
        
        serializer = self.get_serializer(
            instance, 
            data=request.data, 
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        logger.info("Blog post updated successfully: %s", instance.id)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """Handle PATCH requests specifically."""
        logger.info("Partial update (PATCH) for blog post - User: %s", request.user)
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    @action(
        detail=False,
        methods=["post"],
        url_path="translate-preview",
        parser_classes=[parsers.JSONParser],
    )
    def translate_preview(self, request):
        payload = request.data if isinstance(request.data, dict) else {}
        translations = build_blogpost_translation_preview(payload)
        return Response(translations, status=status.HTTP_200_OK)


class CSRViewSet(viewsets.ModelViewSet):
    """ViewSet for managing CSR entries with image upload support."""
    
    queryset = CSR.objects.all().order_by("-created_at")
    serializer_class = CSRSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        logger.info("Creating new CSR entry - User: %s", request.user)
        logger.debug("Request data: %s", request.data)
        
        if DEBUG:
            log_request_data(request, "CSR CREATE")

        
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("❌ Serializer validation errors:")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        
        logger.info("CSR created successfully: %s", serializer.data.get('id'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        
        logger.info("Updating CSR entry %s", instance.id)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        logger.info("Deleting CSR entry %s", instance.id)

        # Delete image file from storage if it exists
        if instance.cover_image:
            instance.cover_image.delete(save=False)

        for gallery_image in instance.uploaded_images.all():
            if gallery_image.image:
                gallery_image.image.delete(save=False)
            gallery_image.delete()

        instance.delete()
        return Response(
            {"detail": "Deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

    @action(
        detail=False,
        methods=["post"],
        url_path="translate-preview",
        parser_classes=[parsers.JSONParser],
    )
    def translate_preview(self, request):
        payload = request.data if isinstance(request.data, dict) else {}
        translations = build_csr_translation_preview(payload)
        return Response(translations, status=status.HTTP_200_OK)
    

class SendEmailViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def _build_appointment_payload(self, validated_data):
        if "appointmentDate" not in validated_data:
            return None

        return {
            "service": validated_data["service"],
            "doctor": validated_data.get("doctor", ""),
            "location": validated_data["location"],
            "appointment_date": validated_data["appointmentDate"],
            "appointment_time": validated_data["appointmentTime"],
            "patient_name": validated_data["name"],
            "patient_phone": validated_data["phone"],
            "patient_email": validated_data["patientEmail"],
            "additional_info": validated_data.get("additionalInfo", ""),
        }

    def _send(self, request):
        serializer = SendEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        recipient_email = validated_data["email"]
        subject = validated_data["subject"]
        body = validated_data["body"]
        appointment_payload = self._build_appointment_payload(validated_data)

        try:
            if appointment_payload:
                with transaction.atomic():
                    Appointment.objects.create(**appointment_payload)
                    send_email(
                        recipient_email=recipient_email,
                        subject=subject,
                        body=body,
                    )
            else:
                send_email(
                    recipient_email=recipient_email,
                    subject=subject,
                    body=body,
                )

            return Response({"status": "Email sent successfully"}, status=200)
        except IntegrityError:
            return Response(
                {
                    "error": "This slot has already been booked. Please choose another time.",
                    "code": "SLOT_ALREADY_BOOKED",
                },
                status=409,
            )
        except Exception as e:
            logger.error(f"Failed to send email to {recipient_email}: {e}", exc_info=True)
            return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

    def create(self, request, *args, **kwargs):
        return self._send(request)

    @action(detail=False, methods=['post'], url_path="send_email")
    def send_email(self, request):
        return self._send(request)


class TenderViewSet(viewsets.ModelViewSet):
    """ViewSet for managing tenders with file upload support."""

    queryset = Tender.objects.all().order_by("-created_at")
    serializer_class = TenderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        logger.info("Creating new tender - User: %s", request.user)
        logger.debug("Request data: %s | Files: %s", request.data, request.FILES)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Tender validation errors:")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)

        logger.info("Tender created successfully: %s", serializer.data.get("id"))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        logger.info("Updating tender %s", instance.id)
        logger.debug("Request data: %s | Files: %s", request.data, request.FILES)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CareerViewSet(viewsets.ModelViewSet):
    """ViewSet for managing career opportunities."""
    
    queryset = Career.objects.all().order_by("-posted_date")
    serializer_class = CareerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)


class PublicStatementViewSet(viewsets.ModelViewSet):
    """ViewSet for managing public statements."""

    queryset = PublicStatement.objects.all().order_by("-created_at")
    serializer_class = PublicStatementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)


class InterviewViewSet(viewsets.ModelViewSet):
    """ViewSet for managing interview videos."""

    queryset = Interview.objects.all().order_by("-created_at")
    serializer_class = InterviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.JSONParser,)


class CorporateDocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing corporate documents."""

    queryset = CorporateDocument.objects.all().order_by("-created_at")
    serializer_class = CorporateDocumentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

class HeroViewSet(viewsets.ModelViewSet):
    """ViewSet for managing the hero section content."""
    
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)
