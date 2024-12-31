from django.db import models
from teams.models import Team
from championships.models import Championship

class Match(models.Model):
    MATCH_PHASES = [
        ('group', 'Group Stage'),
        ('quarter', 'Quarter Finals'),
        ('semi', 'Semi Finals'),
        ('final', 'Final')
    ]

    championship = models.ForeignKey(Championship, on_delete=models.CASCADE, related_name='matches')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    team1_score = models.IntegerField(default=0)
    team2_score = models.IntegerField(default=0)
    match_date = models.DateTimeField()
    is_finished = models.BooleanField(default=False)
    phase = models.CharField(max_length=20, choices=MATCH_PHASES, default='group')
    group_number = models.IntegerField(null=True, blank=True)  # Para fase de grupos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        phase_str = f" - {self.get_phase_display()}"
        if self.phase == 'group' and self.group_number is not None:
            phase_str += f" (Group {self.group_number})"
        return f"{self.team1.name} vs {self.team2.name} - {self.championship.name}{phase_str}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_finished and self.championship.championship_type == 'bracket':
            self._update_knockout_stage()

    def _update_knockout_stage(self):
        """Atualiza próximas fases do mata-mata quando uma partida é finalizada"""
        if self.phase == 'group':
            # Lógica para atualizar quartas de final após fase de grupos
            # Será implementada quando necessário
            pass
        elif self.phase == 'quarter':
            # Atualizar semifinal
            winner = self.team1 if self.team1_score > self.team2_score else self.team2
            next_match_index = self._get_next_match_index()
            next_match = Match.objects.filter(
                championship=self.championship,
                phase='semi'
            )[next_match_index]
            
            if next_match_index % 2 == 0:
                next_match.team1 = winner
            else:
                next_match.team2 = winner
            next_match.save()
            
        elif self.phase == 'semi':
            # Atualizar final
            winner = self.team1 if self.team1_score > self.team2_score else self.team2
            final_match = Match.objects.get(
                championship=self.championship,
                phase='final'
            )
            
            if self._get_next_match_index() == 0:
                final_match.team1 = winner
            else:
                final_match.team2 = winner
            final_match.save()

    def _get_next_match_index(self):
        """Determina o índice da próxima partida baseado na atual"""
        if self.phase == 'quarter':
            matches = Match.objects.filter(
                championship=self.championship,
                phase='quarter'
            ).order_by('match_date')
            return list(matches).index(self) // 2
        elif self.phase == 'semi':
            matches = Match.objects.filter(
                championship=self.championship,
                phase='semi'
            ).order_by('match_date')
            return list(matches).index(self)
