from rest_framework import serializers
from .models import Team
from authentication.serializers import UserSerializer

class TeamSerializer(serializers.ModelSerializer):
    trainer_details = UserSerializer(source='trainer', read_only=True)
    players_details = UserSerializer(source='players', many=True, read_only=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'trainer', 'trainer_details', 'players', 'players_details', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
