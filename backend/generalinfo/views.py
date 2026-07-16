import logging


from rest_framework import viewsets, status, parsers
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from django.db import IntegrityError, transaction
from django.utils.dateparse import parse_date
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
    UserEnquiry,
    RecipientEmailSetting,
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
    UserEnquirySerializer,
    RecipientEmailSettingSerializer,
)
from .translation import (
    build_blogpost_translation_preview,
    build_csr_translation_preview,
)

logger = logging.getLogger(__name__)



DEBUG = True


DEFAULT_RECIPIENT_EMAILS = {
    UserEnquiry.CATEGORY_BOOKINGS: "iansmithxv@gmail.com",
    UserEnquiry.CATEGORY_GENERAL: "iansmithm3@gmail.com",
    UserEnquiry.CATEGORY_MEDICAL: "smithke98@gmail.com",
    UserEnquiry.CATEGORY_NURSING: "morgansmithk2@gmail.com",
    UserEnquiry.CATEGORY_JOBS: "smithcarter254@gmail.com",
}


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

    def _resolve_recipient_email(self, category, fallback_email):
        if not category:
            return fallback_email

        configured_email = (
            RecipientEmailSetting.objects.filter(category=category)
            .values_list("email", flat=True)
            .first()
        )
        return configured_email or DEFAULT_RECIPIENT_EMAILS.get(category, fallback_email)

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

    def _build_user_enquiry_payload(self, validated_data):
        category = validated_data.get("enquiryCategory")
        if not category and "appointmentDate" in validated_data:
            category = UserEnquiry.CATEGORY_BOOKINGS

        if not category:
            return None

        recipient_email = self._resolve_recipient_email(
            category,
            validated_data["email"],
        )

        return {
            "category": category,
            "full_name": validated_data.get("enquiryName")
            or validated_data.get("name", ""),
            "email": validated_data.get("enquiryEmail")
            or validated_data.get("patientEmail", ""),
            "phone": validated_data.get("enquiryPhone")
            or validated_data.get("phone", ""),
            "message": validated_data.get("enquiryMessage")
            or validated_data.get("additionalInfo", ""),
            "recipient_email": recipient_email,
            "service": validated_data.get("service", ""),
            "doctor": validated_data.get("doctor", ""),
            "location": validated_data.get("location", ""),
            "appointment_date": validated_data.get("appointmentDate"),
            "appointment_time": validated_data.get("appointmentTime"),
        }

    def _send(self, request):
        serializer = SendEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        category = validated_data.get("enquiryCategory")
        if not category and "appointmentDate" in validated_data:
            category = UserEnquiry.CATEGORY_BOOKINGS
        recipient_email = self._resolve_recipient_email(
            category,
            validated_data["email"],
        )
        subject = validated_data["subject"]
        body = validated_data["body"]
        appointment_payload = self._build_appointment_payload(validated_data)
        user_enquiry_payload = self._build_user_enquiry_payload(validated_data)

        enquiry = None
        try:
            if appointment_payload or user_enquiry_payload:
                with transaction.atomic():
                    if appointment_payload:
                        Appointment.objects.create(**appointment_payload)
                    if user_enquiry_payload:
                        enquiry = UserEnquiry.objects.create(**user_enquiry_payload)
        except IntegrityError as e:
            # Only a slot_key collision means the slot is taken; any other
            # integrity error is a real bug and must not be reported as one.
            if "slot_key" not in str(e):
                logger.error(f"Integrity error creating booking: {e}", exc_info=True)
                return Response(
                    {"error": "Failed to create booking. Please try again."},
                    status=500,
                )
            return Response(
                {
                    "error": "This slot has already been booked. Please choose another time.",
                    "code": "SLOT_ALREADY_BOOKED",
                },
                status=409,
            )

        # Sent outside the transaction so a delivery failure is recorded against
        # the enquiry instead of discarding the booking.
        try:
            send_email(
                recipient_email=recipient_email,
                subject=subject,
                body=body,
            )
        except Exception as e:
            logger.error(f"Failed to send email to {recipient_email}: {e}", exc_info=True)
            if enquiry:
                enquiry.email_status = UserEnquiry.EMAIL_STATUS_FAILED
                enquiry.save(update_fields=["email_status"])
                # The booking itself was saved, so this is a success for the
                # patient; staff chase the delivery failure from the dashboard.
                return Response(
                    {
                        "status": "Booking saved, notification email pending",
                        "emailStatus": UserEnquiry.EMAIL_STATUS_FAILED,
                    },
                    status=200,
                )
            # Nothing was persisted, so a failure here loses the message.
            return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

        if enquiry:
            enquiry.email_status = UserEnquiry.EMAIL_STATUS_SENT
            enquiry.save(update_fields=["email_status"])

        return Response({"status": "Email sent successfully"}, status=200)

    def create(self, request, *args, **kwargs):
        return self._send(request)

    @action(detail=False, methods=['post'], url_path="send_email")
    def send_email(self, request):
        return self._send(request)


class BookedSlotViewSet(viewsets.ViewSet):
    """Read-only view of which times are taken, so the calendar can hide them.

    Only times are returned; the calendar is public and must never see
    patient details.
    """

    permission_classes = [AllowAny]

    def list(self, request):
        service = request.query_params.get("service", "")
        location = request.query_params.get("location", "")
        date = parse_date(request.query_params.get("date", "") or "")

        if not service or not location or not date:
            return Response(
                {"error": "service, location and date query params are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mirrors Appointment.build_slot_key so this matches the unique
        # constraint exactly.
        prefix = "|".join(
            [
                Appointment._normalize(service),
                Appointment._normalize(location),
                date.isoformat(),
                "",
            ]
        )
        booked = (
            Appointment.objects.filter(slot_key__startswith=prefix)
            .order_by("appointment_time")
            .values_list("appointment_time", flat=True)
        )

        return Response({"booked": [t.strftime("%H:%M") for t in booked]})


class UserEnquiryViewSet(viewsets.ModelViewSet):
    queryset = UserEnquiry.objects.all().order_by("-created_at")
    serializer_class = UserEnquirySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (parsers.JSONParser,)

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class RecipientEmailSettingViewSet(viewsets.ModelViewSet):
    queryset = RecipientEmailSetting.objects.all().order_by("category")
    serializer_class = RecipientEmailSettingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (parsers.JSONParser,)


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
