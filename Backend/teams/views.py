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

    @action(detail=False, methods=['post'])
    def get_team(self, request):
        team_id = request.data.get('team_id')
        try:
            team = Team.objects.get(id=team_id)
            serializer = self.get_serializer(team)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_team(self, request):
        team_id = request.data.get('team_id')
        try:
            team = Team.objects.get(id=team_id)
            serializer = self.get_serializer(team, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_team(self, request):
        team_id = request.data.get('team_id')
        try:
            team = Team.objects.get(id=team_id)
            team.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def add_player(self, request):
        team_id = request.data.get('team_id')
        player_id = request.data.get('player_id')
        try:
            team = Team.objects.get(id=team_id)
            player = User.objects.get(id=player_id, user_type='player')
            team.players.add(player)
            return Response({"message": "Player added successfully"})
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def remove_player(self, request):
        team_id = request.data.get('team_id')
        player_id = request.data.get('player_id')
        try:
            team = Team.objects.get(id=team_id)
            player = User.objects.get(id=player_id, user_type='player')
            team.players.remove(player)
            return Response({"message": "Player removed successfully"})
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)
