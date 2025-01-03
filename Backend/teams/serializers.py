from rest_framework import serializers
from .models import Team
from authentication.serializers import UserSerializer
from authentication.models import User

class TeamSerializer(serializers.ModelSerializer):
    trainer_details = UserSerializer(source='trainer', read_only=True)
    players_details = UserSerializer(source='players', many=True, read_only=True)
    players = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=User.objects.all(),
        required=False  # Torna o campo opcional
    )

    class Meta:
        model = Team
        fields = ('id', 'name', 'trainer', 'trainer_details', 'players', 'players_details', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def validate_trainer(self, value):
        if not value.user_type == 'trainer':
            raise serializers.ValidationError("Trainer must be a user of type 'trainer'")
        if not value.is_approved:
            raise serializers.ValidationError("Trainer must be approved")
        return value