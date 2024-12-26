from django.db import models
from teams.models import Team
from championships.models import Championship

class Match(models.Model):
    championship = models.ForeignKey(Championship, on_delete=models.CASCADE, related_name='matches')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    team1_score = models.IntegerField(default=0)
    team2_score = models.IntegerField(default=0)
    match_date = models.DateTimeField()
    is_finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.team1.name} vs {self.team2.name} - {self.championship.name}"
