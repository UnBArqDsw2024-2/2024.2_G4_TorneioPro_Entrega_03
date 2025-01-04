from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from authentication.permissions import IsOrganizer
from database.base_view import BaseViewSet
from database.operations import ListOperation, GetOperation, CreateOperation, UpdateOperation, DeleteOperation
from datetime import datetime
from teams.models import Team

class ChampionshipViewSet(BaseViewSet):
    """
    ViewSet para gerenciar campeonatos usando o Template Method.
    Mantém todas as funcionalidades originais do backend.
    """
    # Configuração da tabela
    table_name = 'championships_championship'
    list_fields = [
        'championships_championship.id', 'championships_championship.name', 
        'championships_championship.description', 'championships_championship.sport_id', 
        'championships_championship.sport_type', 'championships_championship.championship_type', 
        'championships_championship.start_date', 'championships_championship.end_date', 
        'championships_championship.is_active', 'championships_championship.created_at', 
        'championships_championship.updated_at'
    ]
    detail_fields = [
        'championships_championship.id', 'championships_championship.name', 
        'championships_championship.description', 'championships_championship.start_date', 
        'championships_championship.end_date', 'championships_championship.is_active', 
        'championships_championship.championship_type', 'championships_championship.sport_type',
        '(SELECT name FROM sports_sport WHERE id = championships_championship.sport_id) as sport_name',
        '(SELECT COUNT(*) FROM championships_championship_teams WHERE championship_id = championships_championship.id) as total_teams',
        '(SELECT COUNT(*) FROM matches_match WHERE championship_id = championships_championship.id) as total_matches'
    ]

    def get_permissions(self):
        """Define permissões por ação."""
        if self.action in ['list', 'get']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_joins(self) -> list[str]:
        """Define os JOINs padrão."""
        return [
            'LEFT JOIN sports_sport s ON championships_championship.sport_id = s.id',
            'LEFT JOIN championships_championship_teams ct ON championships_championship.id = ct.championship_id'
        ]

    def prepare_data_for_create(self, request_data: dict) -> dict:
        """Prepara os dados para criação."""
        return {
            'name': request_data.get('name'),
            'description': request_data.get('description'),
            'sport_id': request_data.get('sport_id'),
            'sport_type': request_data.get('sport_type'),
            'championship_type': request_data.get('championship_type', 'points'),
            'start_date': request_data.get('start_date'),
            'end_date': request_data.get('end_date'),
            'is_active': False,
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }

    def prepare_data_for_update(self, request_data: dict) -> dict:
        """Prepara os dados para atualização."""
        return {
            'name': request_data.get('name'),
            'description': request_data.get('description'),
            'sport_id': request_data.get('sport_id'),
            'sport_type': request_data.get('sport_type'),
            'championship_type': request_data.get('championship_type', 'points'),
            'start_date': request_data.get('start_date'),
            'end_date': request_data.get('end_date'),
            'is_active': request_data.get('is_active', False),
            'updated_at': datetime.now()
        }

    def list(self, request):
        """Lista todos os campeonatos."""
        operation = ListOperation(
            table=self.table_name,
            fields=self.list_fields,
            joins=self.get_joins()
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            # Adiciona informações dos times
            championships = result["data"]
            for championship in championships:
                teams_operation = ListOperation(
                    table='championships_championship_teams ct',
                    fields=['t.id', 't.name'],
                    joins=['JOIN teams_team t ON ct.team_id = t.id'],
                    where={'ct.championship_id': championship['id']}
                )
                teams_result = self.db_facade.execute_operation(teams_operation)
                championship['teams'] = teams_result["data"] if teams_result["success"] else []
                championship['teams_details'] = teams_result["data"] if teams_result["success"] else []
            
            return Response(championships)
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def create(self, request):
        """Cria um novo campeonato."""
        data = self.prepare_data_for_create(request.data)
        operation = CreateOperation(
            table=self.table_name,
            data=data
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            # Retorna os dados completos do campeonato
            get_operation = GetOperation(
                table=self.table_name,
                fields=self.list_fields,
                record_id=result["data"]["id"]
            )
            championship_result = self.db_facade.execute_operation(get_operation)
            
            if championship_result["success"]:
                championship = championship_result["data"]
                championship['teams'] = []
                championship['teams_details'] = []
                
                # Se houver times, adiciona ao campeonato
                if 'teams' in request.data:
                    for team_id in request.data['teams']:
                        self.db_facade.execute(
                            'INSERT INTO championships_championship_teams (championship_id, team_id) VALUES (%s, %s)',
                            (championship['id'], team_id)
                        )
                
                return Response(championship)
        
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):
        """Obtém detalhes de um campeonato."""
        championship_id = request.data.get('championship_id')
        operation = GetOperation(
            table=self.table_name,
            fields=self.detail_fields,
            record_id=championship_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"] and result["data"]:
            championship = result["data"]
            
            # Adiciona times
            teams_operation = ListOperation(
                table='championships_championship_teams ct',
                fields=['t.id', 't.name'],
                joins=['JOIN teams_team t ON ct.team_id = t.id'],
                where={'ct.championship_id': championship_id}
            )
            teams_result = self.db_facade.execute_operation(teams_operation)
            championship['teams'] = teams_result["data"] if teams_result["success"] else []
            
            return Response(championship)
            
        return Response(
            {"error": "Championship not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    def update(self, request):
        """Atualiza um campeonato existente."""
        championship_id = request.data.get('championship_id')
        data = self.prepare_data_for_update(request.data)
        operation = UpdateOperation(
            table=self.table_name,
            data=data,
            record_id=championship_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            # Se houver times, atualiza os times
            if 'teams' in request.data:
                # Remove times antigos
                self.db_facade.execute(
                    'DELETE FROM championships_championship_teams WHERE championship_id = %s',
                    (championship_id,)
                )
                
                # Adiciona novos times
                for team_id in request.data['teams']:
                    self.db_facade.execute(
                        'INSERT INTO championships_championship_teams (championship_id, team_id) VALUES (%s, %s)',
                        (championship_id, team_id)
                    )
            
            # Retorna os dados atualizados
            get_operation = GetOperation(
                table=self.table_name,
                fields=self.detail_fields,
                record_id=championship_id
            )
            championship_result = self.db_facade.execute_operation(get_operation)
            
            if championship_result["success"]:
                championship = championship_result["data"]
                
                # Adiciona times
                teams_operation = ListOperation(
                    table='championships_championship_teams ct',
                    fields=['t.id', 't.name'],
                    joins=['JOIN teams_team t ON ct.team_id = t.id'],
                    where={'ct.championship_id': championship_id}
                )
                teams_result = self.db_facade.execute_operation(teams_operation)
                championship['teams'] = teams_result["data"] if teams_result["success"] else []
                
                return Response(championship)
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request):
        """Deleta um campeonato."""
        championship_id = request.data.get('championship_id')
        
        # Primeiro remove os times associados
        self.db_facade.execute(
            'DELETE FROM championships_championship_teams WHERE championship_id = %s',
            (championship_id,)
        )
        
        # Depois remove o campeonato
        operation = DeleteOperation(
            table=self.table_name,
            record_id=championship_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response({"message": "Championship deleted successfully"})
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'])
    def addteams(self, request):
        """Adiciona times ao campeonato."""
        championship_id = request.data.get('championship_id')
        team_ids = request.data.get('team_ids', [])
        
        try:
            # Verifica se cada time tem jogadores suficientes
            min_players = 11
            invalid_teams = []
            
            for team_id in team_ids:
                # Conta jogadores do time
                count_query = """
                    SELECT COUNT(*) as count 
                    FROM teams_team_players 
                    WHERE team_id = %s
                """
                result = self.db_facade.fetch_one(count_query, (team_id,))
                player_count = result['count'] if result else 0
                
                if player_count < min_players:
                    # Obtém nome do time
                    team_query = "SELECT name FROM teams_team WHERE id = %s"
                    team_result = self.db_facade.fetch_one(team_query, (team_id,))
                    team_name = team_result['name'] if team_result else f'Team {team_id}'
                    
                    invalid_teams.append({
                        'team_id': team_id,
                        'name': team_name,
                        'current_players': player_count,
                        'required_players': min_players
                    })
            
            if invalid_teams:
                return Response({
                    "error": "Some teams don't have enough players",
                    "invalid_teams": invalid_teams
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Adiciona os times
            for team_id in team_ids:
                operation = CreateOperation(
                    table='championships_championship_teams',
                    data={
                        'championship_id': championship_id,
                        'team_id': team_id
                    }
                )
                self.db_facade.execute_operation(operation)
            
            # Verifica se deve gerar partidas
            team_count_query = """
                SELECT COUNT(*) as count 
                FROM championships_championship_teams 
                WHERE championship_id = %s
            """
            count_result = self.db_facade.fetch_one(team_count_query, (championship_id,))
            team_count = count_result['count'] if count_result else 0
            
            championship_query = """
                SELECT championship_type 
                FROM championships_championship 
                WHERE id = %s
            """
            champ_result = self.db_facade.fetch_one(championship_query, (championship_id,))
            
            if champ_result:
                championship_type = champ_result['championship_type']
                if ((championship_type == 'bracket' and team_count == 16) or
                    (championship_type == 'points' and 10 <= team_count <= 20)):
                    # TODO: Implementar geração de partidas
                    pass
            
            return Response({"message": "Teams added successfully"})
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def remteams(self, request):
        """Remove times do campeonato."""
        championship_id = request.data.get('championship_id')
        team_ids = request.data.get('team_ids', [])
        
        try:
            for team_id in team_ids:
                query = """
                    DELETE FROM championships_championship_teams 
                    WHERE championship_id = %s AND team_id = %s
                """
                self.db_facade.execute(query, (championship_id, team_id))
            
            return Response({"message": "Teams removed successfully"})
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def close(self, request):
        """Fecha um campeonato."""
        championship_id = request.data.get('championship_id')
        operation = UpdateOperation(
            table=self.table_name,
            data={'is_active': False},
            record_id=championship_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response({"message": "Championship closed successfully"})
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'])
    def join_request(self, request):
        """Solicita entrada em um campeonato."""
        championship_id = request.data.get('championship_id')
        user_id = request.user.id
        
        # Verifica se o usuário tem um jogador associado
        player_operation = GetOperation(
            table='players_player',
            fields=['id'],
            record_id=user_id
        )
        player_result = self.db_facade.execute_operation(player_operation)
        
        if not player_result["success"] or not player_result["data"]:
            return Response(
                {"error": "Player not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Verifica se o campeonato está ativo
        championship_query = """
            SELECT is_active, sport_type 
            FROM championships_championship 
            WHERE id = %s
        """
        champ_result = self.db_facade.fetch_one(championship_query, (championship_id,))
        
        if not champ_result or not champ_result['is_active']:
            return Response(
                {"error": "Championship is not active for registration"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verifica se já existe uma solicitação
        request_query = """
            SELECT status 
            FROM championships_joinrequest 
            WHERE championship_id = %s AND player_id = %s
        """
        request_result = self.db_facade.fetch_one(
            request_query, 
            (championship_id, player_result["data"]["id"])
        )
        
        if request_result:
            return Response(
                {"error": f"Player already has a {request_result['status']} request"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Cria a solicitação
        operation = CreateOperation(
            table='championships_joinrequest',
            data={
                'championship_id': championship_id,
                'player_id': player_result["data"]["id"],
                'status': 'approved' if champ_result['sport_type'] == 'individual' else 'pending',
                'created_at': datetime.now()
            }
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            message = "Player registered successfully" if champ_result['sport_type'] == 'individual' else "Request sent to team trainer for approval"
            return Response({"message": message})
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['get'])
    def pending_requests(self, request):
        """Lista solicitações pendentes."""
        # Obtém os times onde o usuário é treinador
        trainer_teams_query = """
            SELECT id FROM teams_team WHERE trainer_id = %s
        """
        teams_result = self.db_facade.fetch_all(trainer_teams_query, (request.user.id,))
        
        if not teams_result:
            return Response([])
        
        team_ids = [team['id'] for team in teams_result]
        
        # Obtém as solicitações pendentes
        operation = ListOperation(
            table='championships_joinrequest jr',
            fields=[
                'jr.id',
                'jr.championship_id',
                'jr.player_id',
                'jr.status',
                'jr.created_at',
                'p.name as player_name',
                'c.name as championship_name'
            ],
            joins=[
                'JOIN players_player p ON jr.player_id = p.id',
                'JOIN championships_championship c ON jr.championship_id = c.id',
                'JOIN teams_team t ON t.id IN (' + ','.join(['%s'] * len(team_ids)) + ')'
            ],
            where={
                'jr.status': 'pending',
                'c.sport_type': 'team'
            }
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response(result["data"])
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'])
    def approve_request(self, request):
        """Aprova uma solicitação de entrada."""
        request_id = request.data.get('request_id')
        
        # Verifica se o usuário é treinador do time
        trainer_check_query = """
            SELECT t.id 
            FROM teams_team t
            JOIN championships_joinrequest jr ON jr.team_id = t.id
            WHERE jr.id = %s AND t.trainer_id = %s
        """
        trainer_result = self.db_facade.fetch_one(
            trainer_check_query, 
            (request_id, request.user.id)
        )
        
        if not trainer_result:
            return Response(
                {"error": "Only the team trainer can approve join requests"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Aprova a solicitação
        operation = UpdateOperation(
            table='championships_joinrequest',
            data={'status': 'approved'},
            record_id=request_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            # Adiciona o jogador ao time
            join_data_query = """
                SELECT player_id, team_id 
                FROM championships_joinrequest 
                WHERE id = %s
            """
            join_result = self.db_facade.fetch_one(join_data_query, (request_id,))
            
            if join_result:
                self.db_facade.execute(
                    'INSERT INTO teams_team_players (team_id, player_id) VALUES (%s, %s)',
                    (join_result['team_id'], join_result['player_id'])
                )
            
            return Response({"message": "Request approved successfully"})
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['post'])
    def reject_request(self, request):
        """Rejeita uma solicitação de entrada."""
        request_id = request.data.get('request_id')
        
        # Verifica se o usuário é treinador do time
        trainer_check_query = """
            SELECT t.id 
            FROM teams_team t
            JOIN championships_joinrequest jr ON jr.team_id = t.id
            WHERE jr.id = %s AND t.trainer_id = %s
        """
        trainer_result = self.db_facade.fetch_one(
            trainer_check_query, 
            (request_id, request.user.id)
        )
        
        if not trainer_result:
            return Response(
                {"error": "Only the team trainer can reject join requests"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        operation = UpdateOperation(
            table='championships_joinrequest',
            data={'status': 'rejected'},
            record_id=request_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response({"message": "Request rejected successfully"})
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )
