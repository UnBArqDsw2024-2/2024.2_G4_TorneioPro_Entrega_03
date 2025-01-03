from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from authentication.permissions import IsOrganizer
from .models import Sport
from .serializers import SportSerializer

# Create your views here.

class SportViewSet(viewsets.ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'list_sports', 'get_sport']:
            return [AllowAny()]
        # Create, update e delete apenas para organizadores
        return [IsOrganizer()]

    @action(detail=False, methods=['get'])
    def list_sports(self, request):
        sports = Sport.objects.all()
        serializer = self.get_serializer(sports, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def get_sport(self, request):
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        sport = get_object_or_404(Sport, id=sport_id)
        serializer = self.get_serializer(sport)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_sport(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'])
    def delete_sport(self, request):
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        sport = get_object_or_404(Sport, id=sport_id)
        # Verificar se o esporte está sendo usado em algum campeonato
        if sport.championships.exists():
            return Response(
                {"error": "Cannot delete sport that is being used in championships"},
                status=status.HTTP_400_BAD_REQUEST
            )
        sport.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
