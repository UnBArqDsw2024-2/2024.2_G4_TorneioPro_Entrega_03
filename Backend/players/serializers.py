from rest_framework import serializers
from .models import PlayerProfile
from authentication.serializers import UserSerializer

class PlayerProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = PlayerProfile
        fields = ('id', 'user', 'user_details', 'nickname', 'position', 'birth_date', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
