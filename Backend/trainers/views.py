from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from authentication.models import User
from .models import TrainerProfile
from .serializers import TrainerProfileSerializer

class TrainerViewSet(viewsets.ModelViewSet):
    serializer_class = TrainerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TrainerProfile.objects.filter(user__user_type='trainer')
        trainer_id = self.request.query_params.get('id', None)
        if trainer_id:
            queryset = queryset.filter(user_id=trainer_id)
        return queryset

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'trainer':
            raise ValidationError("User must be a trainer")
        serializer.save(user=user)
