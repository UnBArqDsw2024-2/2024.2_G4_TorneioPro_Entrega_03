from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from authentication.permissions import IsOrganizer
from .models import Sport
from .serializers import SportSerializer
from database.base_view import SingletonDatabaseViewSet

class SportViewSet(SingletonDatabaseViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'list_sports', 'get_sport', 'get_sport_stats']:
            return [AllowAny()]
        return [IsOrganizer()]

    @action(detail=False, methods=['get'])
    def list_sports(self, request):
        """Lista todos os esportes com estatísticas básicas"""
        try:
            query = """
                SELECT 
                    s.id,
                    s.name,
                    s.type,
                    COUNT(DISTINCT c.id) as championship_count
                FROM 
                    sports_sport s
                    LEFT JOIN championships_championship c ON c.sport_id = s.id
                GROUP BY 
                    s.id, s.name, s.type
            """
            results = self.execute_query(query)
            
            sports_list = [{
                'id': row[0],
                'name': row[1],
                'type': row[2],
                'championship_count': row[3]
            } for row in results]
            
            return Response(sports_list)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def get_sport(self, request):
        """Obtém detalhes de um esporte específico"""
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            query = """
                SELECT 
                    s.id,
                    s.name,
                    s.type,
                    COUNT(DISTINCT c.id) as total_championships,
                    COUNT(DISTINCT ct.team_id) as total_teams
                FROM 
                    sports_sport s
                    LEFT JOIN championships_championship c ON c.sport_id = s.id
                    LEFT JOIN championships_championship_teams ct ON ct.championship_id = c.id
                WHERE 
                    s.id = %s
                GROUP BY 
                    s.id, s.name, s.type
            """
            result = self.execute_aggregation_query(query, (sport_id,))
            
            if not result:
                return Response(
                    {"error": "Sport not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            sport_data = {
                'id': result[0],
                'name': result[1],
                'type': result[2],
                'total_championships': result[3],
                'total_teams': result[4]
            }
            
            return Response(sport_data)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def create_sport(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                # Usando uma transação direta para criar o esporte
                query = """
                    INSERT INTO sports_sport (name, type)
                    VALUES (%s, %s)
                """
                self.execute_query(
                    query,
                    (request.data['name'], request.data['type'])
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['put'])
    def update_sport(self, request):
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sport = get_object_or_404(Sport, id=sport_id)
        serializer = self.get_serializer(sport, data=request.data, partial=True)
        
        if serializer.is_valid():
            try:
                query = """
                    UPDATE sports_sport
                    SET name = %s, type = %s
                    WHERE id = %s
                """
                self.execute_query(
                    query,
                    (request.data['name'], request.data['type'], sport_id)
                )
                return Response(serializer.data)
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'])
    def delete_sport(self, request):
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            # Verificar se o esporte está sendo usado
            check_query = """
                SELECT COUNT(*) 
                FROM championships_championship 
                WHERE sport_id = %s
            """
            result = self.execute_aggregation_query(check_query, (sport_id,))
            
            if result and result[0] > 0:
                return Response(
                    {"error": "Cannot delete sport that is being used in championships"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Deletar o esporte
            delete_query = "DELETE FROM sports_sport WHERE id = %s"
            self.execute_query(delete_query, (sport_id,))
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
