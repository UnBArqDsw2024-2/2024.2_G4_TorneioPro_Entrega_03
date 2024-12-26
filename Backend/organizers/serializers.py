from rest_framework import serializers
from .models import OrganizerProfile
from authentication.serializers import UserSerializer

class OrganizerProfileSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)

    class Meta:
        model = OrganizerProfile
        fields = ('id', 'user', 'user_details', 'organization_name', 'contact_email', 
                 'contact_phone', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')
