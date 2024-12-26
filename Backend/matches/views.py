from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Match
from .serializers import MatchSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Match.objects.all()
        match_id = self.request.query_params.get('id', None)
        if match_id is not None:
            queryset = queryset.filter(id=match_id)
        return queryset
