import logging


from rest_framework import viewsets, status, parsers
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from web.send_email import send_email

from .models import TeamMember, BlogPost, CSR
from .serializers import TeamMemberSerializer, BlogPostSerializer, CSRSerializer, SendEmailSerializer

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
    
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)
    
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

        instance.delete()
        return Response(
            {"detail": "Deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
    

class SendEmailViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path="send_email")
    def send_email(self, request):
        serializer = SendEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Access validated data
        recipient_email = serializer.validated_data['email']
        subject = serializer.validated_data['subject']
        body = serializer.validated_data['body']
        
        try:
            # Send the email
            send_email(recipient_email=recipient_email, subject=subject, body=body)
            return Response({"status": "Email sent successfully"}, status=200)
        except Exception as e:
            logger.error(f"Failed to send email to {recipient_email}: {e}", exc_info=True)
            return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

