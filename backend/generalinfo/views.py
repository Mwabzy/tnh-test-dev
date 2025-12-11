from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import TeamMember
from .serializers import TeamMemberSerializer

class TeamMemberViewSet(viewsets.ViewSet):
    """
    CRUD for team members.
    POST: backend generates ID automatically.
    GET: can get single member (with ?id=) or all members.
    """

    def list(self, request):
        """Return all team members."""
        queryset = TeamMember.objects.all()
        serializer = TeamMemberSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """Get single member by ID from query param or pk."""
        member_id = request.query_params.get('id') or pk
        if not member_id:
            return Response({"detail": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            member = TeamMember.objects.get(id=member_id)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeamMemberSerializer(member)
        return Response(serializer.data)

    def create(self, request):
        """Create a new member. ID is auto-generated."""
        serializer = TeamMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # ID auto-generated
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """Update an existing member by ID (in payload or pk)."""
        member_id = request.data.get('id') or pk
        if not member_id:
            return Response({"detail": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            member = TeamMember.objects.get(id=member_id)
            serializer = TeamMemberSerializer(member, data=request.data)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """Delete a member by ID (in payload or pk)."""
        member_id = request.data.get('id') or pk
        if not member_id:
            return Response({"detail": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            member = TeamMember.objects.get(id=member_id)
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)
