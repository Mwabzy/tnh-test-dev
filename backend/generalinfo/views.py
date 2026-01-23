import logging

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import TeamMember, BlogPost, CSR
from .serializers import TeamMemberSerializer, BlogPostSerializer, CSRSerializer

logger = logging.getLogger(__name__)


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
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        logger.info("Creating new blog post - User: %s", request.user)
        logger.debug("Request data: %s", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        logger.info("Blog post created successfully: %s", serializer.data.get('id'))
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CSRViewSet(viewsets.ModelViewSet):
    """ViewSet for managing CSR entries with image upload support."""
    
    queryset = CSR.objects.all().order_by("-created_at")
    serializer_class = CSRSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        logger.info("Creating new CSR entry - User: %s", request.user)
        logger.debug("Request data: %s", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
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