from django.db import models
from authentication.models import User

class Team(models.Model):
    name = models.CharField(max_length=100)
    trainer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trained_teams')
    players = models.ManyToManyField(User, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
