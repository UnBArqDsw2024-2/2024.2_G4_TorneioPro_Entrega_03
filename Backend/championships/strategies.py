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
        random.shuffle(teams_list)
        groups = [teams_list[i:i+4] for i in range(0, 16, 4)]
        
        group_phase_days = (championship.end_date - championship.start_date).days // 2
        days_between_matches = group_phase_days // 6
        
        match_date = championship.start_date
        for group_num, group in enumerate(groups):
            for i, team1 in enumerate(group):
                for team2 in group[i+1:]:
                    Match.objects.create(
                        championship=championship,
                        team1=team1,
                        team2=team2,
                        match_date=match_date
                    )
                    match_date += timedelta(days=days_between_matches)

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
