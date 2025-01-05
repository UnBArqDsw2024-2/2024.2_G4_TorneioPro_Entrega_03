from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Championship, ChampionshipJoinRequest
from sports.models import Sport
from .serializers import ChampionshipSerializer, ChampionshipJoinRequestSerializer, PendingJoinRequestSerializer
from teams.models import Team
from players.models import PlayerProfile
from django.db.models import Q
from authentication.permissions import IsOrganizer
from django.utils import timezone
from .factories import get_championship_factory
from django.core.exceptions import ValidationError

class ChampionshipViewSet(viewsets.ModelViewSet):
    queryset = Championship.objects.all()
    serializer_class = ChampionshipSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'get_championship', 'standings']:
            return [AllowAny()]
        if self.action in ['create', 'update', 'destroy', 'addteams', 'remteams']:
            return [IsOrganizer()]  # Apenas organizadores podem criar/editar/excluir campeonatos
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        championship_type = data.get('championship_type')
        
        if not championship_type:
            return Response({'error': 'Championship type is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        factory = get_championship_factory(championship_type)
        if not factory:
            return Response({'error': 'Invalid championship type'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            teams = []
            if 'teams' in data:
                team_ids = data.pop('teams')
                teams = Team.objects.filter(id__in=team_ids)
            
            # Converter o id do esporte para objeto Sport
            sport_id = data.get('sport')
            if sport_id:
                try:
                    sport = Sport.objects.get(id=sport_id)
                    data['sport'] = sport
                except Sport.DoesNotExist:
                    return Response({'error': 'Sport not found'}, status=status.HTTP_400_BAD_REQUEST)
            
            championship = factory.create_championship(data=data, teams=teams)
            serializer = self.get_serializer(championship)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

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

    @action(detail=False, methods=['delete'])
    def delete_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            championship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def join_championship(self, request, pk=None):
        championship = self.get_object()
        player = request.user.playerprofile
        team_id = request.data.get('team_id')

        # Check if player is already in a team for this championship
        if ChampionshipJoinRequest.objects.filter(
            championship=championship,
            player=player,
            status='approved'
        ).exists():
            return Response(
                {"error": "You are already part of this championship"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # If it's a team sport, team_id is required and trainer approval is needed
        if championship.sport.type == 'team':
            if not team_id:
                return Response(
                    {"error": "Team ID is required for team sports"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            team = Team.objects.get(id=team_id)
            join_request = ChampionshipJoinRequest.objects.create(
                championship=championship,
                player=player,
                team=team,
                status='pending'  # Requires trainer approval
            )
        else:
            # For individual sports, no team or trainer approval needed
            join_request = ChampionshipJoinRequest.objects.create(
                championship=championship,
                player=player,
                status='approved'  # Auto-approved for individual sports
            )

        serializer = ChampionshipJoinRequestSerializer(join_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

            # Adiciona o jogador ao time
            join_request.team.players.add(join_request.player.user)
            
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
            championship__sport__type='team'  # Apenas para esportes em equipe
        ).select_related('championship', 'player', 'team')  # Otimiza as queries
        
        serializer = PendingJoinRequestSerializer(pending_requests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def addteams(self, request):
        championship_id = request.data.get('championship_id')
        try:
            championship = Championship.objects.get(id=championship_id)
            team_ids = request.data.get('team_ids', [])
            teams = Team.objects.filter(id__in=team_ids)
            
            # Verifica se cada time tem jogadores suficientes
            min_players = 11  # Número mínimo de jogadores para um time
            invalid_teams = []
            for team in teams:
                player_count = team.players.count()
                if player_count < min_players:
                    invalid_teams.append({
                        'team_id': team.id,
                        'name': team.name,
                        'current_players': player_count,
                        'required_players': min_players
                    })
            
            if invalid_teams:
                return Response({
                    "error": "Some teams don't have enough players",
                    "invalid_teams": invalid_teams
                }, status=status.HTTP_400_BAD_REQUEST)
            
            championship.teams.add(*teams)
            
            # Gerar partidas após adicionar os times
            team_count = championship.teams.count()
            if (championship.championship_type == 'bracket' and team_count == 16) or \
               (championship.championship_type == 'points' and 10 <= team_count <= 20):
                championship.generate_matches()
            
            return Response({"message": "Teams added successfully"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'])
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
            championship.end_date = timezone.now()  # Set end_date to now to make it inactive
            championship.save()
            return Response({"message": "Championship closed successfully"})
        except Championship.DoesNotExist:
            return Response({"error": "Championship not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def join_request(self, request):
        """Endpoint para solicitar participação em um campeonato"""
        try:
            championship = Championship.objects.get(id=request.data.get('championship_id'))
            team = Team.objects.get(id=request.data.get('team_id'))
            
            # Usar o nome correto do related_name
            try:
                player = request.user.player_profile
            except User.player_profile.RelatedObjectDoesNotExist:
                return Response(
                    {"error": "Usuário não tem um perfil de jogador"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verificar se já existe uma solicitação pendente
            if ChampionshipJoinRequest.objects.filter(
                championship=championship,
                player=player,
                status='pending'
            ).exists():
                return Response(
                    {"error": "Já existe uma solicitação pendente para este campeonato"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Criar a solicitação
            join_request = ChampionshipJoinRequest.objects.create(
                championship=championship,
                player=player,
                team=team,
                status='pending'
            )
            
            serializer = ChampionshipJoinRequestSerializer(join_request)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except (Championship.DoesNotExist, Team.DoesNotExist):
            return Response(
                {"error": "Campeonato ou Time não encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def standings(self, request):
        """Retorna a classificação do campeonato baseado no ID fornecido no body"""
        championship_id = request.data.get('championship_id')
        
        try:
            championship = Championship.objects.get(id=championship_id)
        except Championship.DoesNotExist:
            return Response(
                {"error": "Championship not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        standings = championship.get_standings()
        
        # Formata a resposta
        response_data = [{
            'team_name': item['team'].name,
            'points': item['points'],
            'matches_played': item['matches_played'],
            'wins': item['wins'],
            'draws': item['draws'],
            'losses': item['losses']
        } for item in standings]
        
        return Response(response_data)
