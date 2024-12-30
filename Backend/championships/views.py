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

    @action(detail=False, methods=['post'])
    def get_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            serializer = self.get_serializer(championship)
            return Response(serializer.data)
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            serializer = self.get_serializer(championship, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            championship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def join_request(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            team = request.user.team
            if team in championship.teams.all():
                return Response({"error": "Team already in championship"}, status=status.HTTP_400_BAD_REQUEST)
            championship.teams.add(team)
            return Response({"message": "Join request successful"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def addteams(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            team_ids = request.data.get('team_ids', [])
            teams = Team.objects.filter(id__in=team_ids)
            championship.teams.add(*teams)
            return Response({"message": "Teams added successfully"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def remteams(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            team_ids = request.data.get('team_ids', [])
            teams = Team.objects.filter(id__in=team_ids)
            championship.teams.remove(*teams)
            return Response({"message": "Teams removed successfully"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def close(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            championship.is_active = False
            championship.save()
            return Response({"message": "Championship closed successfully"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)
