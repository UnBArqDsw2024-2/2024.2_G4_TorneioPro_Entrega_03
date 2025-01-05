from abc import ABC, abstractmethod
from datetime import timedelta
import random

class MatchGenerationStrategy(ABC):
    @abstractmethod
    def generate_matches(self, championship):
        pass

class BracketMatchStrategy(MatchGenerationStrategy):
    def generate_matches(self, championship):
        from matches.models import Match
        
        if not championship.teams.exists():
            return
        
        teams_list = list(championship.teams.all())
        if len(teams_list) != 16:
            return
            
        random.shuffle(teams_list)
        
        # Calcular intervalo entre partidas
        total_days = (championship.end_date - championship.start_date).days
        days_between_matches = total_days // 4  # 4 fases: oitavas, quartas, semi, final
        
        # Oitavas de final (phase = eighth)
        match_date = championship.start_date
        matches_round_1 = []
        for i in range(0, 16, 2):
            match = Match.objects.create(
                championship=championship,
                team1=teams_list[i],
                team2=teams_list[i+1],
                match_date=match_date,
                phase='eighth'
            )
            matches_round_1.append(match)
        match_date += timedelta(days=days_between_matches)
        
        # Quartas de final (phase = quarter)
        matches_round_2 = []
        for i in range(0, 8, 2):
            match = Match.objects.create(
                championship=championship,
                team1=teams_list[i],  # Time temporário
                team2=teams_list[i+1],  # Time temporário
                match_date=match_date,
                phase='quarter'
            )
            matches_round_2.append(match)
        match_date += timedelta(days=days_between_matches)
        
        # Semifinal (phase = semi)
        matches_round_3 = []
        for i in range(0, 4, 2):
            match = Match.objects.create(
                championship=championship,
                team1=teams_list[i],  # Time temporário
                team2=teams_list[i+1],  # Time temporário
                match_date=match_date,
                phase='semi'
            )
            matches_round_3.append(match)
        match_date += timedelta(days=days_between_matches)
        
        # Final (phase = final)
        Match.objects.create(
            championship=championship,
            team1=teams_list[0],  # Time temporário
            team2=teams_list[1],  # Time temporário
            match_date=match_date,
            phase='final'
        )

class PointsMatchStrategy(MatchGenerationStrategy):
    def generate_matches(self, championship):
        from matches.models import Match
        
        if not championship.teams.exists():
            return
            
        teams_list = list(championship.teams.all())
        total_rounds = len(teams_list) - 1
        matches_per_round = len(teams_list) // 2
        
        days_between_matches = (championship.end_date - championship.start_date).days // (total_rounds * matches_per_round)
        match_date = championship.start_date
        
        for round_num in range(total_rounds):
            for i in range(matches_per_round):
                team1 = teams_list[i]
                team2 = teams_list[-i-1]
                Match.objects.create(
                    championship=championship,
                    team1=team1,
                    team2=team2,
                    match_date=match_date
                )
                match_date += timedelta(days=days_between_matches)
            
            # Rotaciona os times para a próxima rodada
            teams_list.insert(1, teams_list.pop())
