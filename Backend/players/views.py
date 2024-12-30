from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=False, methods=['post'])
    def get_player(self, request):
        player_id = request.data.get('player_id')
        try:
            player = PlayerProfile.objects.get(id=player_id, user__user_type='player')
            serializer = self.get_serializer(player)
            return Response(serializer.data)
        except PlayerProfile.DoesNotExist:
            return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_player(self, request):
        player_id = request.data.get('player_id')
        try:
            player = PlayerProfile.objects.get(id=player_id, user__user_type='player')
            serializer = self.get_serializer(player, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except PlayerProfile.DoesNotExist:
            return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_player(self, request):
        player_id = request.data.get('player_id')
        try:
            player = PlayerProfile.objects.get(id=player_id, user__user_type='player')
            player.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PlayerProfile.DoesNotExist:
            return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'player':
            raise serializer.ValidationError("User must be a player")
        serializer.save()
