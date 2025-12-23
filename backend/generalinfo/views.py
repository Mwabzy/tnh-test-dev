from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import TeamMember, BlogPost
from .serializers import TeamMemberSerializer, BlogPostSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer