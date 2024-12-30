from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Match
from .serializers import MatchSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def get_match(self, request):
        match_id = request.data.get('match_id')
        try:
            match = Match.objects.get(id=match_id)
            serializer = self.get_serializer(match)
            return Response(serializer.data)
        except Match.DoesNotExist:
            return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_match(self, request):
        match_id = request.data.get('match_id')
        try:
            match = Match.objects.get(id=match_id)
            serializer = self.get_serializer(match, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Match.DoesNotExist:
            return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_match(self, request):
        match_id = request.data.get('match_id')
        try:
            match = Match.objects.get(id=match_id)
            match.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Match.DoesNotExist:
            return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def set_score(self, request):
        match_id = request.data.get('match_id')
        try:
            match = Match.objects.get(id=match_id)
            team1_score = request.data.get('team1_score')
            team2_score = request.data.get('team2_score')
            match.team1_score = team1_score
            match.team2_score = team2_score
            match.save()
            serializer = self.get_serializer(match)
            return Response(serializer.data)
        except Match.DoesNotExist:
            return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)
