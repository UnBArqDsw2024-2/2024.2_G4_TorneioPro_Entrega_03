from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Team
from .serializers import TeamSerializer
from authentication.models import User

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Team.objects.all()
        trainer_id = self.request.query_params.get('trainer_id', None)
        if trainer_id is not None:
            queryset = queryset.filter(trainer_id=trainer_id)
        return queryset

    @action(detail=True, methods=['post'])
    def addplayers(self, request, pk=None):
        team = self.get_object()
        player_ids = request.data.get('player_ids', [])
        players = User.objects.filter(id__in=player_ids, user_type='player')
        team.players.add(*players)
        return Response({"message": "Players added successfully"})

    @action(detail=True, methods=['post'])
    def remplayers(self, request, pk=None):
        team = self.get_object()
        player_ids = request.data.get('player_ids', [])
        players = User.objects.filter(id__in=player_ids)
        team.players.remove(*players)
        return Response({"message": "Players removed successfully"})
