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
        teams = validated_data.pop('teams', [])
        championship = super().create(validated_data)
        if teams:
            championship.teams.set(teams)
            # Gera partidas se tiver o número correto de times
            team_count = championship.teams.count()
            if (championship.championship_type == 'bracket' and team_count == 16) or \
               (championship.championship_type == 'points' and 10 <= team_count <= 20):
                championship.generate_matches()
        return championship

class PendingJoinRequestSerializer(serializers.ModelSerializer):
    championship_name = serializers.CharField(source='championship.name')
    player_name = serializers.CharField(source='player.user.username')
    team_name = serializers.CharField(source='team.name')

    class Meta:
        model = ChampionshipJoinRequest
        fields = ('id', 'championship_name', 'player_name', 'team_name', 'status')

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
