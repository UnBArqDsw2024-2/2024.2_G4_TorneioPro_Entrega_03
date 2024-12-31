from rest_framework import serializers
from .models import Championship, ChampionshipJoinRequest
from teams.serializers import TeamSerializer
from players.serializers import PlayerProfileSerializer

class ChampionshipSerializer(serializers.ModelSerializer):
    teams_details = TeamSerializer(source='teams', many=True, read_only=True)

    class Meta:
        model = Championship
        fields = ('id', 'name', 'description', 'sport', 'sport_type', 'championship_type',
                 'start_date', 'end_date', 'teams', 'teams_details', 
                 'is_active', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        # Remove teams data if present, as we'll add teams later
        validated_data.pop('teams', None)
        return super().create(validated_data)

class ChampionshipJoinRequestSerializer(serializers.ModelSerializer):
    championship_details = ChampionshipSerializer(source='championship', read_only=True)
    player_details = PlayerProfileSerializer(source='player', read_only=True)
    team_details = TeamSerializer(source='team', read_only=True)

    class Meta:
        model = ChampionshipJoinRequest
        fields = ('id', 'championship', 'championship_details', 
                 'player', 'player_details',
                 'team', 'team_details',
                 'status', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
