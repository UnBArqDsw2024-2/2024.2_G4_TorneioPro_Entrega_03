from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from authentication.models import User
from .models import PlayerProfile
from .serializers import PlayerProfileSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = PlayerProfile.objects.filter(user__user_type='player')
        player_id = self.request.query_params.get('id', None)
        if player_id:
            queryset = queryset.filter(user_id=player_id)
        return queryset

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'player':
            raise ValidationError("User must be a player")
        serializer.save(user=user)
