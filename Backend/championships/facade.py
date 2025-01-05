class ChampionshipFacade:
    def __init__(self, championship):
        self.championship = championship

    def add_teams(self, teams):
        """Simplifica o processo de adicionar times"""
        min_players = 11
        invalid_teams = []
        
        # Verifica jogadores
        for team in teams:
            player_count = team.players.count()
            if player_count < min_players:
                invalid_teams.append({
                    'team_id': team.id,
                    'name': team.name,
                    'current_players': player_count,
                    'required_players': min_players
                })
        
        if invalid_teams:
            return False, invalid_teams
            
        # Adiciona times
        self.championship.teams.add(*teams)
        
        # Gera partidas se necessário
        team_count = self.championship.teams.count()
        if (self.championship.championship_type == 'bracket' and team_count == 16) or \
           (self.championship.championship_type == 'points' and 10 <= team_count <= 20):
            self.championship.generate_matches()
            
        return True, None
