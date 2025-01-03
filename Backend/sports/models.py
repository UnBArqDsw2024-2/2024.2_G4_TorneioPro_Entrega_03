from django.db import models

# Create your models here.

class Sport(models.Model):
    SPORT_TYPES = [
        ('individual', 'Individual'),
        ('team', 'Team')
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=SPORT_TYPES)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
