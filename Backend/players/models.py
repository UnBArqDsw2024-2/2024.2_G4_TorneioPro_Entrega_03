from django.db import models
from authentication.models import User

class PlayerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='player_profile')
    nickname = models.CharField(max_length=50, blank=True)
    position = models.CharField(max_length=50)
    birth_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.nickname if self.nickname else 'No nickname'}"
