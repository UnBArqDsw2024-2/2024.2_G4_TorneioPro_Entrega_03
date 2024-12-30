from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from authentication.models import User
from .models import OrganizerProfile
from .serializers import OrganizerProfileSerializer

class OrganizerViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = OrganizerProfile.objects.filter(user__user_type='organizer')
        organizer_id = self.request.query_params.get('id', None)
        if organizer_id:
            queryset = queryset.filter(user_id=organizer_id)
        return queryset

    @action(detail=False, methods=['post'])
    def get_organizer(self, request):
        organizer_id = request.data.get('organizer_id')
        try:
            organizer = OrganizerProfile.objects.get(id=organizer_id, user__user_type='organizer')
            serializer = self.get_serializer(organizer)
            return Response(serializer.data)
        except OrganizerProfile.DoesNotExist:
            return Response({"error": "Organizer not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_organizer(self, request):
        organizer_id = request.data.get('organizer_id')
        try:
            organizer = OrganizerProfile.objects.get(id=organizer_id, user__user_type='organizer')
            serializer = self.get_serializer(organizer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except OrganizerProfile.DoesNotExist:
            return Response({"error": "Organizer not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_organizer(self, request):
        organizer_id = request.data.get('organizer_id')
        try:
            organizer = OrganizerProfile.objects.get(id=organizer_id, user__user_type='organizer')
            organizer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except OrganizerProfile.DoesNotExist:
            return Response({"error": "Organizer not found"}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'organizer':
            raise serializer.ValidationError("User must be an organizer")
        serializer.save(user=user)
