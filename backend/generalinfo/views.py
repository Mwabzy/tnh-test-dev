from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMember, BlogPost
from .serializers import TeamMemberSerializer, BlogPostSerializer

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
