from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from authentication.models import User
from .models import TrainerProfile
from .serializers import TrainerProfileSerializer
from authentication.permissions import IsOrganizer

class TrainerViewSet(viewsets.ModelViewSet):
    serializer_class = TrainerProfileSerializer
    permission_classes = [IsOrganizer]

    def get_queryset(self):
        queryset = TrainerProfile.objects.filter(user__user_type='trainer')
        trainer_id = self.request.query_params.get('id', None)
        if trainer_id:
            queryset = queryset.filter(user_id=trainer_id)
        return queryset

    @action(detail=False, methods=['post'])
    def get_trainer(self, request):
        trainer_id = request.data.get('trainer_id')
        try:
            trainer = TrainerProfile.objects.get(id=trainer_id, user__user_type='trainer')
            serializer = self.get_serializer(trainer)
            return Response(serializer.data)
        except TrainerProfile.DoesNotExist:
            return Response({"error": "Trainer not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def update_trainer(self, request):
        trainer_id = request.data.get('trainer_id')
        try:
            trainer = TrainerProfile.objects.get(id=trainer_id, user__user_type='trainer')
            serializer = self.get_serializer(trainer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TrainerProfile.DoesNotExist:
            return Response({"error": "Trainer not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def delete_trainer(self, request):
        trainer_id = request.data.get('trainer_id')
        try:
            trainer = TrainerProfile.objects.get(id=trainer_id, user__user_type='trainer')
            trainer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TrainerProfile.DoesNotExist:
            return Response({"error": "Trainer not found"}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        user = get_object_or_404(User, id=self.request.data.get('user'))
        if user.user_type != 'trainer':
            raise serializer.ValidationError("User must be a trainer")
        serializer.save()
