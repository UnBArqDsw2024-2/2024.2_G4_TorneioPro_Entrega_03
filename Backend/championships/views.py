from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Championship
from .serializers import ChampionshipSerializer
from teams.models import Team

class ChampionshipViewSet(viewsets.ModelViewSet):
    queryset = Championship.objects.all()
    serializer_class = ChampionshipSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def join_request(self, request, pk=None):
        championship = self.get_object()
        team = request.user.team  # Assuming user has a team
        if team in championship.teams.all():
            return Response({"error": "Team already in championship"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        championship.teams.add(team)
        return Response({"message": "Join request successful"})

    @action(detail=True, methods=['post'])
    def addteams(self, request, pk=None):
        championship = self.get_object()
        team_ids = request.data.get('team_ids', [])
        teams = Team.objects.filter(id__in=team_ids)
        championship.teams.add(*teams)
        return Response({"message": "Teams added successfully"})

    @action(detail=True, methods=['post'])
    def remteams(self, request, pk=None):
        championship = self.get_object()
        team_ids = request.data.get('team_ids', [])
        teams = Team.objects.filter(id__in=team_ids)
        championship.teams.remove(*teams)
        return Response({"message": "Teams removed successfully"})

    @action(detail=True, methods=['post'])
    def close(self, request, pk=None):
        championship = self.get_object()
        championship.is_active = False
        championship.save()
        return Response({"message": "Championship closed successfully"})
