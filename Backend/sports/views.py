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
            sports_list = self.get_db_facade().fetch_all(query)
            return Response(sports_list)
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
                sport_id = self.get_db_facade().insert(
                    'sports_sport',
                    {
                        'name': request.data['name'],
                        'type': request.data['type']
                    }
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def get_sport(self, request):
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
            sport_data = self.get_db_facade().fetch_one(query, (sport_id,))
            
            if not sport_data:
                return Response(
                    {"error": "Sport not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            return Response(sport_data)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['put'])
    def update_sport(self, request):
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            rows_updated = self.get_db_facade().update(
                'sports_sport',
                {
                    'name': request.data['name'],
                    'type': request.data['type']
                },
                {'id': sport_id}
            )
            
            if rows_updated == 0:
                return Response(
                    {"error": "Sport not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Retorna os dados atualizados
            return self.get_sport(request)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
            championships_count = self.get_db_facade().count(
                'championships_championship',
                {'sport_id': sport_id}
            )
            
            if championships_count > 0:
                return Response(
                    {"error": "Cannot delete sport that is being used in championships"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Deletar o esporte
            rows_deleted = self.get_db_facade().delete(
                'sports_sport',
                {'id': sport_id}
            )
            
            if rows_deleted == 0:
                return Response(
                    {"error": "Sport not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
