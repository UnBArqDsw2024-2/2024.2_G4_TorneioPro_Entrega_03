from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Championship, ChampionshipJoinRequest
from .serializers import ChampionshipSerializer, ChampionshipJoinRequestSerializer, PendingJoinRequestSerializer
from teams.models import Team
from players.models import PlayerProfile
from django.db.models import Q
from database.base_view import SingletonDatabaseViewSet

class ChampionshipViewSet(SingletonDatabaseViewSet):
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
            query = """
                SELECT 
                    c.id,
                    c.name,
                    c.description,
                    c.start_date,
                    c.end_date,
                    c.is_active,
                    c.championship_type,
                    c.sport_type,
                    s.name as sport_name,
                    COUNT(DISTINCT t.id) as total_teams,
                    COUNT(DISTINCT m.id) as total_matches
                FROM 
                    championships_championship c
                    LEFT JOIN sports_sport s ON c.sport_id = s.id
                    LEFT JOIN championships_championship_teams ct ON ct.championship_id = c.id
                    LEFT JOIN teams_team t ON ct.team_id = t.id
                    LEFT JOIN matches_match m ON m.championship_id = c.id
                WHERE 
                    c.id = %s
                GROUP BY 
                    c.id, c.name, c.description, c.start_date, c.end_date,
                    c.is_active, c.championship_type, c.sport_type, s.name
            """
            result = self.execute_aggregation_query(query, (championship_id,))
            
            if not result:
                return Response(
                    {"error": "Championship not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            championship_data = {
                'id': result[0],
                'name': result[1],
                'description': result[2],
                'start_date': result[3],
                'end_date': result[4],
                'is_active': result[5],
                'championship_type': result[6],
                'sport_type': result[7],
                'sport_name': result[8],
                'total_teams': result[9],
                'total_matches': result[10]
            }
            
            return Response(championship_data)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def update_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            # Primeiro verifica se o campeonato existe
            check_query = """
                SELECT id FROM championships_championship WHERE id = %s
            """
            result = self.execute_aggregation_query(check_query, (championship_id,))
            
            if not result:
                return Response(
                    {"error": "Championship not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Atualiza o campeonato
            update_query = """
                UPDATE championships_championship
                SET 
                    name = %s,
                    description = %s,
                    start_date = %s,
                    end_date = %s,
                    is_active = %s,
                    championship_type = %s,
                    sport_type = %s
                WHERE id = %s
            """
            self.execute_query(
                update_query,
                (
                    request.data.get('name'),
                    request.data.get('description'),
                    request.data.get('start_date'),
                    request.data.get('end_date'),
                    request.data.get('is_active'),
                    request.data.get('championship_type'),
                    request.data.get('sport_type'),
                    championship_id
                )
            )
            
            # Retorna os dados atualizados
            return self.get_championship(request)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def delete_championship(self, request):
        championship_id = request.data.get('championship_id')
        try:
            # Primeiro deleta as relações
            self.execute_query(
                "DELETE FROM championships_championship_teams WHERE championship_id = %s",
                (championship_id,)
            )
            self.execute_query(
                "DELETE FROM matches_match WHERE championship_id = %s",
                (championship_id,)
            )
            
            # Depois deleta o campeonato
            self.execute_query(
                "DELETE FROM championships_championship WHERE id = %s",
                (championship_id,)
            )
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
        if championship.sport_type == 'team':
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
            championship__sport_type='team'  # Apenas para esportes em equipe
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
