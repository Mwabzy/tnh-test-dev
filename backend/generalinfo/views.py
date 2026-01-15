from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMember, BlogPost, CSR
from .serializers import TeamMemberSerializer, BlogPostSerializer, CSRSerializer

import logging

logger = logging.getLogger(__name__)

DEBUG = True
class TeamMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def create(self, request, *args, **kwargs):
        print("===== NEW BLOG POST REQUEST =====")
        print("User:", request.user)
        print("Raw request data:", request.data)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  # <-- Detailed error
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        print("Blog post created successfully:", serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CSRViewSet(viewsets.ModelViewSet):
    queryset = CSR.objects.all().order_by('-created_at')
    serializer_class = CSRSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def create(self, request, *args, **kwargs):
        logger.info("===== NEW CSR REQUEST =====")
        logger.info("User: %s", request.user)
        logger.info("Raw request data: %s", request.data)
        
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error("Serializer errors: %s", serializer.errors)  # <-- Detailed error
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        logger.info("CSR created successfully: %s", serializer.data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
        )

        if not serializer.is_valid():
            logger.error("Update errors: %s", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {"detail": "Deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

