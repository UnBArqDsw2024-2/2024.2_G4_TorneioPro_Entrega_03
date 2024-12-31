from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Championship, ChampionshipJoinRequest
from .serializers import ChampionshipSerializer, ChampionshipJoinRequestSerializer
from teams.models import Team
from players.models import PlayerProfile
from django.db.models import Q

class ChampionshipViewSet(viewsets.ModelViewSet):
    queryset = Championship.objects.all()
    serializer_class = ChampionshipSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == 'list' or self.action == 'get_championship':
            return [AllowAny()]
        return [IsAuthenticated()]

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
        player_id = request.data.get('player_id')
        team_id = request.data.get('team_id', None)

        try:
            championship = Championship.objects.get(id=championship_id)
            player = PlayerProfile.objects.get(id=player_id)

            # Verifica se o campeonato está ativo para inscrições
            if not championship.is_active:
                return Response(
                    {"error": "Championship is not active for registration"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verifica se já existe uma solicitação pendente
            existing_request = ChampionshipJoinRequest.objects.filter(
                championship=championship,
                player=player
            ).first()

            if existing_request:
                return Response(
                    {"error": f"Player already has a {existing_request.status} request for this championship"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Cria a solicitação
            join_request = ChampionshipJoinRequest(
                championship=championship,
                player=player
            )

            if championship.sport_type == 'team':
                if not team_id:
                    return Response(
                        {"error": "Team ID is required for team sports"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                try:
                    team = Team.objects.get(id=team_id)
                    
                    # Verifica se o time está participando do campeonato
                    if not championship.teams.filter(id=team.id).exists():
                        return Response(
                            {"error": "This team is not participating in the championship"},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                        
                    join_request.team = team
                except Team.DoesNotExist:
                    return Response(
                        {"error": "Team not found"},
                        status=status.HTTP_404_NOT_FOUND
                    )

            join_request.save()  # Isso vai aprovar automaticamente se for esporte individual

            message = "Request sent to team trainer for approval" if championship.sport_type == 'team' else "Player registered successfully"
            return Response({"message": message}, status=status.HTTP_200_OK)

        except Championship.DoesNotExist:
            return Response(
                {"error": "Championship not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except PlayerProfile.DoesNotExist:
            return Response(
                {"error": "Player not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def approve_join_request(self, request):
        request_id = request.data.get('request_id')
        try:
            join_request = ChampionshipJoinRequest.objects.get(id=request_id)
            
            # Verifica se o usuário é o treinador do time
            if not request.user == join_request.team.trainer:
                return Response(
                    {"error": "Only the team trainer can approve join requests"},
                    status=status.HTTP_403_FORBIDDEN
                )

            join_request.status = 'approved'
            join_request.save()
            
            return Response({"message": "Join request approved successfully"})
        except ChampionshipJoinRequest.DoesNotExist:
            return Response(
                {"error": "Join request not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'])
    def reject_join_request(self, request):
        request_id = request.data.get('request_id')
        try:
            join_request = ChampionshipJoinRequest.objects.get(id=request_id)
            
            # Verifica se o usuário é o treinador do time
            if not request.user == join_request.team.trainer:
                return Response(
                    {"error": "Only the team trainer can reject join requests"},
                    status=status.HTTP_403_FORBIDDEN
                )

            join_request.status = 'rejected'
            join_request.save()
            
            return Response({"message": "Join request rejected successfully"})
        except ChampionshipJoinRequest.DoesNotExist:
            return Response(
                {"error": "Join request not found"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def pending_requests(self, request):
        # Retorna todas as solicitações pendentes para os times onde o usuário é treinador
        pending_requests = ChampionshipJoinRequest.objects.filter(
            team__trainer=request.user,  # O time deve ter o usuário atual como treinador
            status='pending',  # Apenas solicitações pendentes
            championship__sport_type='team'  # Apenas para esportes em equipe
        ).select_related('championship', 'player', 'team')  # Otimiza as queries
        
        serializer = ChampionshipJoinRequestSerializer(pending_requests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def addteams(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            team_ids = request.data.get('team_ids', [])
            teams = Team.objects.filter(id__in=team_ids)
            championship.teams.add(*teams)
            
            # Gerar partidas após adicionar os times
            team_count = championship.teams.count()
            if (championship.championship_type == 'bracket' and team_count == 16) or \
               (championship.championship_type == 'points' and 10 <= team_count <= 20):
                championship.generate_matches()
            
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
