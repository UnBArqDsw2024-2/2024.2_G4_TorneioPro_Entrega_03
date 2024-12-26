from rest_framework import serializers
from .models import Championship
from teams.serializers import TeamSerializer

class ChampionshipSerializer(serializers.ModelSerializer):
    teams_details = TeamSerializer(source='teams', many=True, read_only=True)

    class Meta:
        model = Championship
        fields = ('id', 'name', 'description', 'start_date', 'end_date', 
                 'teams', 'teams_details', 'is_active', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
