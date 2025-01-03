from django.db import models
from django.core.exceptions import ValidationError
from teams.models import Team
from players.models import PlayerProfile
import random
from datetime import timedelta
from django.utils import timezone
from django.db.models import Q, Case, When

class Championship(models.Model):
    CHAMPIONSHIP_TYPES = [
        ('bracket', 'Bracket'),
        ('points', 'Points')
    ]

    SPORT_TYPES = [
        ('team', 'Team Sport'),
        ('individual', 'Individual Sport')
    ]

    name = models.CharField(max_length=100)
    description = models.TextField()
    sport = models.ForeignKey('sports.Sport', on_delete=models.PROTECT, related_name='championships', null=True)
    sport_type = models.CharField(max_length=20, choices=SPORT_TYPES, default='team')
    championship_type = models.CharField(max_length=20, choices=CHAMPIONSHIP_TYPES, default='points')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    teams = models.ManyToManyField(Team, related_name='championships', blank=True)  # Tornando o campo opcional
    is_active = models.BooleanField(default=False)  # Mudando o default para False
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if self.start_date >= self.end_date:
            raise ValidationError('End date must be after start date')
        
        team_count = self.teams.count()
        if self.championship_type == 'bracket' and team_count != 0 and team_count != 16:
            raise ValidationError('Bracket championships must have exactly 16 teams')
        if self.championship_type == 'points' and team_count != 0 and (team_count < 10 or team_count > 20):
            raise ValidationError('Points championships must have between 10 and 20 teams')

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        # Atualiza o is_active baseado nas datas
        now = timezone.now()
        self.is_active = self.start_date <= now <= self.end_date
        super().save(*args, **kwargs)
        if is_new and self.teams.exists():  # Só gera partidas se houver times
            self.generate_matches()

    @classmethod
    def update_active_status(cls):
        now = timezone.now()
        # Atualiza campeonatos que deveriam estar ativos mas não estão
        cls.objects.filter(
            Q(start_date__lte=now, end_date__gte=now, is_active=False) |  # Deveria estar ativo
            Q(Q(end_date__lt=now) | Q(start_date__gt=now), is_active=True)  # Deveria estar inativo
        ).update(
            is_active=Case(
                When(start_date__lte=now, end_date__gte=now, then=True),
                default=False
            ),
            updated_at=now
        )

    def generate_matches(self):
        """Gera todas as partidas do campeonato baseado no tipo"""
        team_count = self.teams.count()
        if self.championship_type == 'bracket' and team_count == 16:
            self._generate_bracket_matches()
        elif self.championship_type == 'points' and 10 <= team_count <= 20:
            self._generate_points_matches()

    def _generate_bracket_matches(self):
        """Gera partidas para formato de grupos + mata-mata"""
        from matches.models import Match
        
        if not self.teams.exists():
            return
        
        # Criar 4 grupos de 4 times aleatoriamente
        teams_list = list(self.teams.all())
        random.shuffle(teams_list)
        groups = [teams_list[i:i+4] for i in range(0, 16, 4)]
        
        # Calcular intervalo de datas para fase de grupos
        group_phase_days = (self.end_date - self.start_date).days // 2
        days_between_matches = group_phase_days // 6  # 6 jogos por grupo
        
        # Gerar jogos da fase de grupos
        match_date = self.start_date
        group_matches = []
        for group_num, group in enumerate(groups):
            for i, team1 in enumerate(group):
                for team2 in group[i+1:]:
                    match = Match.objects.create(
                        championship=self,
                        team1=team1,
                        team2=team2,
                        match_date=match_date
                    )
                    group_matches.append(match)
                    match_date += timedelta(days=days_between_matches)

        # Reservar datas para mata-mata (serão atualizadas após fase de grupos)
        knockout_start = self.start_date + timedelta(days=group_phase_days)
        days_between_knockout = (self.end_date - knockout_start).days // 3  # 3 fases

        # Criar estrutura do mata-mata (serão atualizadas após fase de grupos)
        for phase in ['quarter', 'semi', 'final']:
            matches_in_phase = 4 if phase == 'quarter' else 2 if phase == 'semi' else 1
            for _ in range(matches_in_phase):
                Match.objects.create(
                    championship=self,
                    team1=teams_list[0],  # Placeholder
                    team2=teams_list[1],  # Placeholder
                    match_date=knockout_start
                )
                knockout_start += timedelta(days=days_between_knockout)

    def _generate_points_matches(self):
        """Gera partidas para formato de pontos corridos"""
        from matches.models import Match
        
        teams_list = list(self.teams.all())
        total_teams = len(teams_list)
        matches_per_round = total_teams * (total_teams - 1) // 2
        total_matches = matches_per_round * 2  # Turno e returno
        
        # Calcular intervalo entre partidas
        total_days = (self.end_date - self.start_date).days
        days_between_matches = total_days // total_matches
        
        # Gerar jogos do primeiro turno
        match_date = self.start_date
        for i, team1 in enumerate(teams_list):
            for team2 in teams_list[i+1:]:
                Match.objects.create(
                    championship=self,
                    team1=team1,
                    team2=team2,
                    match_date=match_date
                )
                match_date += timedelta(days=days_between_matches)
        
        # Gerar jogos do returno (invertendo mando de campo)
        for i, team1 in enumerate(teams_list):
            for team2 in teams_list[i+1:]:
                Match.objects.create(
                    championship=self,
                    team1=team2,  # Invertido
                    team2=team1,  # Invertido
                    match_date=match_date
                )
                match_date += timedelta(days=days_between_matches)

class ChampionshipJoinRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]

    championship = models.ForeignKey(Championship, on_delete=models.CASCADE, related_name='join_requests')
    player = models.ForeignKey(PlayerProfile, on_delete=models.CASCADE, related_name='championship_requests')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='join_requests', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('championship', 'player')  # Um jogador só pode ter uma solicitação por campeonato

    def __str__(self):
        return f"{self.player} - {self.championship} ({self.status})"

    def save(self, *args, **kwargs):
        # Se for esporte individual e status está pendente, aprova automaticamente
        if self.championship.sport_type == 'individual' and self.status == 'pending':
            self.status = 'approved'
        super().save(*args, **kwargs)
