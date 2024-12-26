from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('player', 'Player'),
        ('trainer', 'Trainer'),
        ('organizer', 'Organizer'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    is_approved = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if self.user_type == 'player':
            self.is_approved = True
        super().save(*args, **kwargs)
