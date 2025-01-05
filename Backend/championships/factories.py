from abc import ABC, abstractmethod
from .models import Championship
from django.core.exceptions import ValidationError
from sports.models import Sport
from django.utils import timezone
from dateutil import parser

class ChampionshipFactory(ABC):
    @abstractmethod
    def create_championship(self, data, teams):
        """
        Cria um campeonato com os dados e times fornecidos
        :param data: Dicionário com os dados do campeonato (name, description, sport, start_date, end_date)
        :param teams: Lista de times que participarão do campeonato
        """
        pass

    def _validate_dates(self, start_date, end_date):
        """Valida e retorna as datas de início e fim"""
        if not start_date:
            raise ValidationError('Start date is required')
        if not end_date:
            raise ValidationError('End date is required')
            
        if isinstance(start_date, str):
            try:
                start_date = parser.parse(start_date)
            except (ValueError, TypeError):
                raise ValidationError('Invalid start date format')
                
        if isinstance(end_date, str):
            try:
                end_date = parser.parse(end_date)
            except (ValueError, TypeError):
                raise ValidationError('Invalid end date format')
            
        if start_date >= end_date:
            raise ValidationError('End date must be after start date')
            
        if start_date.tzinfo is None:
            start_date = timezone.make_aware(start_date)
        if end_date.tzinfo is None:
            end_date = timezone.make_aware(end_date)
            
        return start_date, end_date

    def _get_sport(self, sport):
        if not sport:
            raise ValidationError('Sport is required')
        if isinstance(sport, Sport):
            return sport
        try:
            return Sport.objects.get(id=sport)
        except (Sport.DoesNotExist, ValueError):
            raise ValidationError('Invalid sport')

class BracketChampionshipFactory(ChampionshipFactory):
    def create_championship(self, data, teams):
        if teams and len(teams) != 16:
            raise ValidationError('Bracket championships must have exactly 16 teams')
        
        start_date, end_date = self._validate_dates(data.get('start_date'), data.get('end_date'))
        sport = self._get_sport(data.get('sport'))
        
        championship = Championship.objects.create(
            name=data.get('name', ''),
            description=data.get('description', ''),
            sport=sport,
            championship_type='bracket',
            start_date=start_date,
            end_date=end_date
        )
        
        if teams:
            championship.teams.set(teams)
            championship.generate_matches()
        
        return championship

class PointsChampionshipFactory(ChampionshipFactory):
    def create_championship(self, data, teams):
        if teams and (len(teams) < 10 or len(teams) > 20):
            raise ValidationError('Points championships must have between 10 and 20 teams')
            
        start_date, end_date = self._validate_dates(data.get('start_date'), data.get('end_date'))
        sport = self._get_sport(data.get('sport'))
        
        championship = Championship.objects.create(
            name=data.get('name', ''),
            description=data.get('description', ''),
            sport=sport,
            championship_type='points',
            start_date=start_date,
            end_date=end_date
        )
        
        if teams:
            championship.teams.set(teams)
            championship.generate_matches()
        
        return championship

def get_championship_factory(championship_type):
    """Retorna a factory apropriada para o tipo de campeonato"""
    if championship_type == 'bracket':
        return BracketChampionshipFactory()
    elif championship_type == 'points':
        return PointsChampionshipFactory()
    else:
        raise ValueError(f'Invalid championship type: {championship_type}')
