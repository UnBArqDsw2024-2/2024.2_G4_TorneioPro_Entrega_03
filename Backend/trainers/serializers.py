from rest_framework import serializers
from .models import TrainerProfile
from authentication.serializers import UserSerializer

class TrainerProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = TrainerProfile
        fields = ('id', 'user', 'user_details', 'experience_years', 'specialization', 
                 'license_number', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
