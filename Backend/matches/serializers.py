from rest_framework import serializers
from .models import Match
from teams.serializers import TeamSerializer

class MatchSerializer(serializers.ModelSerializer):
    team1_details = TeamSerializer(source='team1', read_only=True)
    team2_details = TeamSerializer(source='team2', read_only=True)

    class Meta:
        model = Match
        fields = ('id', 'championship', 'team1', 'team2', 'team1_details', 'team2_details',
                 'team1_score', 'team2_score', 'match_date', 'is_finished', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
