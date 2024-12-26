from rest_framework import viewsets
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

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'organizer':
            raise ValidationError("User must be an organizer")
        serializer.save(user=user)
