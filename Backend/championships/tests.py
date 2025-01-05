from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError
from sports.models import Sport
from teams.models import Team
from authentication.models import User
from matches.models import Match
from players.models import PlayerProfile
from .models import Championship, ChampionshipJoinRequest
from .factories import get_championship_factory, BracketChampionshipFactory, PointsChampionshipFactory
from .strategies import BracketMatchStrategy, PointsMatchStrategy
from django.db.models import Q

class ChampionshipModelTests(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="Football")
        self.start_date = timezone.now()
        self.end_date = self.start_date + timedelta(days=30)
        
        # Criar usuários para testes
        self.organizer = User.objects.create_user(
            username='organizer', 
            password='12345',
            email='organizer@test.com',
            user_type='organizer'
        )
        
        self.trainer = User.objects.create_user(
            username='trainer', 
            password='12345',
            email='trainer@test.com',
            user_type='trainer',
            is_approved=True
        )

    def test_championship_creation(self):
        """Teste de criação básica de campeonato"""
        championship = Championship.objects.create(
            name="Test Championship",
            description="Test Description",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date + timedelta(days=1),  # Garante que start_date é futuro
            end_date=self.end_date
        )
        self.assertEqual(championship.name, "Test Championship")
        self.assertFalse(championship.is_active)  # Deve ser False porque start_date é futuro

    def test_championship_dates_validation(self):
        """Teste de validação de datas do campeonato"""
        with self.assertRaises(ValidationError):
            championship = Championship(
                name="Invalid Dates",
                description="Test",
                sport=self.sport,
                start_date=self.end_date,
                end_date=self.start_date
            )
            championship.clean()

    def test_championship_team_count_validation(self):
        """Teste de validação do número de times"""
        championship = Championship.objects.create(
            name="Team Count Test",
            description="Test",
            sport=self.sport,
            championship_type='bracket',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Criar 15 times (inválido para bracket)
        teams = []
        for i in range(15):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            teams.append(team)

        championship.teams.set(teams)
        with self.assertRaises(ValidationError):
            championship.clean()

    def test_bracket_championship_team_count(self):
        """Teste detalhado da validação do número de times para campeonatos bracket"""
        championship = Championship.objects.create(
            name="Bracket Test",
            description="Test",
            sport=self.sport,
            championship_type='bracket',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Teste com 16 times (deve passar)
        teams = []
        for i in range(16):
            team = Team.objects.create(
                name=f"Valid Team {i}",
                trainer=self.trainer
            )
            teams.append(team)

        championship.teams.set(teams)
        try:
            championship.clean()
        except ValidationError:
            self.fail("Não deveria levantar ValidationError com 16 times")

        # Teste com 15 times (deve falhar)
        teams.pop()
        championship.teams.set(teams)
        with self.assertRaises(ValidationError):
            championship.clean()

        # Teste com 17 times (deve falhar)
        teams.append(Team.objects.create(
            name="Extra Team 1",
            trainer=self.trainer
        ))
        teams.append(Team.objects.create(
            name="Extra Team 2",
            trainer=self.trainer
        ))
        championship.teams.set(teams)
        with self.assertRaises(ValidationError):
            championship.clean()

    def test_points_championship_team_count(self):
        """Teste detalhado da validação do número de times para campeonatos points"""
        championship = Championship.objects.create(
            name="Points Test",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Teste com número válido de times (15 times)
        teams = []
        for i in range(15):
            team = Team.objects.create(
                name=f"Valid Team {i}",
                trainer=self.trainer
            )
            teams.append(team)

        championship.teams.set(teams)
        try:
            championship.clean()
        except ValidationError:
            self.fail("Não deveria levantar ValidationError com 15 times")

        # Teste com menos de 10 times (deve falhar)
        championship.teams.set(teams[:9])
        with self.assertRaises(ValidationError):
            championship.clean()

        # Teste com mais de 20 times (deve falhar)
        for i in range(6):
            teams.append(Team.objects.create(
                name=f"Extra Team {i}",
                trainer=self.trainer
            ))
        championship.teams.set(teams)
        with self.assertRaises(ValidationError):
            championship.clean()

    def test_active_status_calculation(self):
        """Testa se o status ativo é calculado corretamente baseado nas datas"""
        # Campeonato ativo (datas incluem agora)
        active_championship = Championship.objects.create(
            name="Active Championship",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date - timedelta(days=1),
            end_date=self.start_date + timedelta(days=1)
        )
        self.assertTrue(active_championship.is_active)

        # Campeonato futuro
        future_championship = Championship.objects.create(
            name="Future Championship",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date + timedelta(days=1),
            end_date=self.start_date + timedelta(days=2)
        )
        self.assertFalse(future_championship.is_active)

        # Campeonato passado
        past_championship = Championship.objects.create(
            name="Past Championship",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date - timedelta(days=2),
            end_date=self.start_date - timedelta(days=1)
        )
        self.assertFalse(past_championship.is_active)

    def test_timezone_aware_dates(self):
        """Testa se as datas com timezone são tratadas corretamente"""
        # Criar data com timezone
        tz = timezone.get_current_timezone()
        start = timezone.make_aware(timezone.datetime(2025, 1, 1), tz)
        end = timezone.make_aware(timezone.datetime(2025, 1, 2), tz)
        
        championship = Championship.objects.create(
            name="Timezone Test",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=start,
            end_date=end
        )
        
        # Verificar se as datas mantêm o timezone
        self.assertTrue(timezone.is_aware(championship.start_date))
        self.assertTrue(timezone.is_aware(championship.end_date))

class ChampionshipAPITests(APITestCase):
    def setUp(self):
        # Limpar o banco de dados
        Championship.objects.all().delete()
        Sport.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        
        # Criar usuários para teste
        self.organizer = User.objects.create_user(
            username='organizer',
            password='12345',
            email='organizer@test.com',
            user_type='organizer'
        )
        
        self.trainer = User.objects.create_user(
            username='trainer',
            password='12345',
            email='trainer@test.com',
            user_type='trainer',
            is_approved=True
        )

        self.player = User.objects.create_user(
            username='player', 
            password='12345',
            email='player@test.com',
            user_type='player'
        )
        
        # Criar perfil de jogador
        self.player_profile = PlayerProfile.objects.create(
            user=self.player,
            position="Forward",
            birth_date="2000-01-01"
        )
        
        # Criar time com 11 jogadores
        self.team = Team.objects.create(
            name="Test Team",
            trainer=self.trainer
        )
        
        # Adicionar jogadores ao time
        for i in range(11):
            player = User.objects.create_user(
                username=f'player{i}',
                password='12345',
                email=f'player{i}@test.com',
                user_type='player'
            )
            self.team.players.add(player)
        
        # Criar esporte
        self.sport = Sport.objects.create(name="Football", type="team")
        
        # Definir datas padrão para testes
        self.start_date = timezone.now()
        self.end_date = self.start_date + timedelta(days=30)
        
        # Criar campeonato
        self.championship = Championship.objects.create(
            name="Test Championship",
            description="Test Description",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date,  # Usando o presente em vez do futuro
            end_date=self.end_date
        )

    def test_list_championships(self):
        """Teste de listagem de campeonatos"""
        url = reverse('championship-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_championship(self):
        """Teste de criação de campeonato via API"""
        # Autenticar como organizador
        self.client.force_authenticate(user=self.organizer)
        
        url = reverse('championship-create')  # Corrigindo a URL
        start_date = timezone.now()
        end_date = start_date + timedelta(days=30)
        
        data = {
            'name': 'Test Championship',
            'description': 'Test Description',
            'sport': Sport.objects.create(name="Football").id,
            'championship_type': 'points',
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat()
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Championship.objects.count(), 2)
        championship = Championship.objects.last()
        self.assertEqual(championship.name, 'Test Championship')

    def test_get_championship(self):
        """Teste de obtenção de campeonato específico"""
        url = reverse('championship-get')
        response = self.client.post(url, {'championship_id': self.championship.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Championship')

    def test_update_championship(self):
        """Teste de atualização de campeonato"""
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-update')
        data = {
            'championship_id': self.championship.id,
            'name': 'Updated Championship'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated Championship')

    def test_delete_championship(self):
        """Teste de deleção de campeonato"""
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-delete')
        response = self.client.delete(url, {'championship_id': self.championship.id})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Championship.objects.filter(id=self.championship.id).exists())

    def test_join_request(self):
        """Teste de solicitação de participação"""
        # Criar um jogador para fazer a solicitação
        player_user = User.objects.create_user(
            username='test_player_join',  # Nome único
            password='12345',
            email='test_player_join@test.com',
            user_type='player'
        )
        player = PlayerProfile.objects.create(
            user=player_user,
            birth_date='2000-01-01',
            position='Forward'
        )
        
        # Criar um time para o jogador
        team = Team.objects.create(
            name='Test Team Join',  # Nome único
            trainer=self.trainer
        )
        
        # Autenticar como jogador
        self.client.force_authenticate(user=player_user)
        
        url = reverse('championship-join-request')
        data = {
            'championship_id': self.championship.id,
            'team_id': team.id
        }
        
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verificar se a solicitação foi criada
        self.assertTrue(ChampionshipJoinRequest.objects.filter(
            championship=self.championship,
            player=player,
            team=team,
            status='pending'
        ).exists())

    def test_approve_join_request(self):
        """Teste de aprovação de solicitação de participação"""
        join_request = ChampionshipJoinRequest.objects.create(
            championship=self.championship,
            player=self.player_profile,
            team=self.team,
            status='pending'
        )
        
        self.client.force_authenticate(user=self.trainer)  # Autenticar como treinador do time
        url = reverse('championship-approve-request')
        data = {'request_id': join_request.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        join_request.refresh_from_db()
        self.assertEqual(join_request.status, 'approved')
        self.assertTrue(self.team.players.filter(id=self.player.id).exists())

    def test_reject_join_request(self):
        """Teste de rejeição de solicitação de participação"""
        join_request = ChampionshipJoinRequest.objects.create(
            championship=self.championship,
            player=self.player_profile,
            team=self.team,
            status='pending'
        )
        
        self.client.force_authenticate(user=self.trainer)  # Autenticar como treinador do time
        url = reverse('championship-reject-request')
        data = {'request_id': join_request.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        join_request.refresh_from_db()
        self.assertEqual(join_request.status, 'rejected')
        self.assertFalse(self.team.players.filter(id=self.player.id).exists())

    def test_add_teams(self):
        """Teste de adição de times ao campeonato"""
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-addteams')
        data = {
            'championship_id': self.championship.id,
            'team_ids': [self.team.id]
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.championship.refresh_from_db()
        self.assertTrue(self.team in self.championship.teams.all())

    def test_remove_teams(self):
        """Teste de remoção de times do campeonato"""
        self.championship.teams.add(self.team)
        
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-remteams')
        data = {
            'championship_id': self.championship.id,
            'team_ids': [self.team.id]
        }
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.championship.refresh_from_db()
        self.assertFalse(self.team in self.championship.teams.all())

    def test_close_championship(self):
        """Teste de fechamento de campeonato"""
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-close')
        data = {'championship_id': self.championship.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.championship.refresh_from_db()
        self.assertFalse(self.championship.is_active)

    def test_unauthorized_access(self):
        """Teste de acesso não autorizado"""
        # Tentar criar campeonato sem autenticação
        url = reverse('championship-create')
        data = {
            'name': 'Unauthorized Championship',
            'description': 'Test',
            'sport': Sport.objects.create(name="Football").id,
            'championship_type': 'points',
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Tentar criar campeonato como jogador
        self.client.force_authenticate(user=self.player)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_championship_status_in_response(self):
        """Testa se o status ativo é retornado corretamente na API"""
        self.client.force_authenticate(user=self.organizer)
        url = reverse('championship-create')
        
        # Criar campeonato ativo
        now = timezone.now()
        data = {
            'name': 'Active Championship',
            'description': 'Test Description',
            'sport': self.sport.id,
            'championship_type': 'points',
            'start_date': (now - timedelta(days=1)).isoformat(),
            'end_date': (now + timedelta(days=1)).isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['is_active'])
        
        # Criar campeonato futuro
        data = {
            'name': 'Future Championship',
            'description': 'Test Description',
            'sport': self.sport.id,
            'championship_type': 'points',
            'start_date': (now + timedelta(days=1)).isoformat(),
            'end_date': (now + timedelta(days=2)).isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertFalse(response.data['is_active'])

class ChampionshipStrategyTests(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="Football")
        self.start_date = timezone.now()
        self.end_date = self.start_date + timedelta(days=30)
        
        self.trainer = User.objects.create_user(
            username='trainer', 
            password='12345',
            email='trainer@test.com',
            user_type='trainer',
            is_approved=True
        )

    def test_bracket_strategy(self):
        """Teste da estratégia de geração de partidas para formato bracket"""
        championship = Championship.objects.create(
            name="Bracket Championship",
            description="Test",
            sport=self.sport,
            championship_type='bracket',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Criar exatamente 16 times
        teams = []
        for i in range(16):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            teams.append(team)
        
        championship.teams.set(teams)
        championship.generate_matches()

        # Verificar se o número correto de partidas foi gerado
        # Em um formato bracket com 16 times em 4 grupos, cada grupo tem 6 jogos
        # Total de jogos na fase de grupos: 4 grupos * 6 jogos = 24 jogos
        matches_count = Match.objects.filter(championship=championship).count()
        self.assertEqual(matches_count, 24)

    def test_points_strategy(self):
        """Teste da estratégia de geração de partidas para formato points"""
        championship = Championship.objects.create(
            name="Points Championship",
            description="Test",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Criar 10 times (mínimo para points)
        teams = []
        for i in range(10):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            teams.append(team)
        
        championship.teams.set(teams)
        championship.generate_matches()

        # Verificar se o número correto de partidas foi gerado
        # Em um formato points com 10 times, cada time joga contra todos os outros uma vez
        # Número total de jogos = (n * (n-1)) / 2, onde n é o número de times
        expected_matches = (10 * 9) // 2  # 45 jogos
        matches_count = Match.objects.filter(championship=championship).count()
        self.assertEqual(matches_count, expected_matches)

    def test_invalid_team_count_no_matches(self):
        """Teste para verificar se nenhuma partida é gerada com número inválido de times"""
        championship = Championship.objects.create(
            name="Invalid Team Count",
            description="Test",
            sport=self.sport,
            championship_type='bracket',
            start_date=self.start_date,
            end_date=self.end_date
        )

        # Criar 10 times (inválido para bracket que requer 16)
        teams = []
        for i in range(10):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            teams.append(team)
        
        championship.teams.set(teams)
        championship.generate_matches()

        # Verificar que nenhuma partida foi gerada
        matches_count = Match.objects.filter(championship=championship).count()
        self.assertEqual(matches_count, 0)

class ChampionshipJoinRequestTests(TestCase):
    def setUp(self):
        # Criar esporte do tipo team
        self.sport = Sport.objects.create(name="Football", type="team")
        self.start_date = timezone.now()
        self.end_date = self.start_date + timedelta(days=30)
        
        # Criar usuários
        self.player = User.objects.create_user(
            username='player', 
            password='12345',
            email='player@test.com',
            user_type='player'
        )
        
        self.trainer = User.objects.create_user(
            username='trainer', 
            password='12345',
            email='trainer@test.com',
            user_type='trainer',
            is_approved=True
        )
        
        # Criar perfil de jogador
        self.player_profile = PlayerProfile.objects.create(
            user=self.player,
            position="Forward",
            birth_date="2000-01-01"
        )
        
        # Criar time
        self.team = Team.objects.create(
            name="Test Team",
            trainer=self.trainer
        )
        
        # Criar campeonato
        self.championship = Championship.objects.create(
            name="Test Championship",
            description="Test Description",
            sport=self.sport,
            championship_type='points',
            start_date=self.start_date + timedelta(days=1),  # Garante que start_date é futuro
            end_date=self.end_date
        )

    def test_join_request_creation(self):
        """Teste de criação de solicitação de participação"""
        join_request = ChampionshipJoinRequest.objects.create(
            championship=self.championship,
            player=self.player_profile,
            team=self.team,
            status='pending'
        )
        self.assertEqual(join_request.status, 'pending')
        self.assertEqual(str(join_request), f"{self.player_profile} - {self.championship} (pending)")

    def test_duplicate_join_request(self):
        """Teste de solicitação duplicada"""
        ChampionshipJoinRequest.objects.create(
            championship=self.championship,
            player=self.player_profile,
            team=self.team,
            status='pending'
        )
        
        with self.assertRaises(Exception):  # Deve falhar devido à restrição unique_together
            ChampionshipJoinRequest.objects.create(
                championship=self.championship,
                player=self.player_profile,
                team=self.team,
                status='pending'
            )

class ChampionshipFactoryTests(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="Football")
        # Criar treinador para os times
        self.trainer = User.objects.create_user(
            username='trainer',
            password='12345',
            email='trainer@example.com',
            user_type='trainer',
            is_approved=True
        )
        # Criar times para teste
        self.teams = []
        for i in range(20):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            self.teams.append(team)

    def test_bracket_factory_creation(self):
        """Testa se a BracketChampionshipFactory cria corretamente"""
        factory = BracketChampionshipFactory()
        data = {
            'name': 'Bracket Championship',
            'description': 'Test',
            'sport': self.sport,
            'start_date': timezone.now(),
            'end_date': timezone.now() + timedelta(days=30)
        }
        
        # Teste com 16 times (válido)
        teams = self.teams[:16]
        championship = factory.create_championship(data, teams)
        self.assertEqual(championship.championship_type, 'bracket')
        self.assertEqual(championship.teams.count(), 16)
        
        # Teste com número inválido de times
        teams = self.teams[:10]
        with self.assertRaises(ValidationError):
            factory.create_championship(data, teams)

    def test_points_factory_creation(self):
        """Testa se a PointsChampionshipFactory cria corretamente"""
        factory = PointsChampionshipFactory()
        data = {
            'name': 'Points Championship',
            'description': 'Test',
            'sport': self.sport,
            'start_date': timezone.now(),
            'end_date': timezone.now() + timedelta(days=30)
        }
        
        # Teste com 10 times (válido)
        teams = self.teams[:10]
        championship = factory.create_championship(data, teams)
        self.assertEqual(championship.championship_type, 'points')
        self.assertEqual(championship.teams.count(), 10)
        
        # Teste com número inválido de times
        teams = self.teams[:5]
        with self.assertRaises(ValidationError):
            factory.create_championship(data, teams)

    def test_factory_invalid_data(self):
        """Testa comportamento das factories com dados inválidos"""
        factory = BracketChampionshipFactory()
        
        # Teste sem sport
        data = {
            'name': 'Invalid Championship',
            'description': 'Test',
            'start_date': timezone.now(),
            'end_date': timezone.now() + timedelta(days=30)
        }
        with self.assertRaises(ValidationError):
            factory.create_championship(data, [])
        
        # Teste com datas inválidas
        data['sport'] = self.sport
        data['end_date'] = timezone.now() - timedelta(days=30)
        with self.assertRaises(ValidationError):
            factory.create_championship(data, [])

class ChampionshipStrategyTests(TestCase):
    def setUp(self):
        self.sport = Sport.objects.create(name="Football")
        # Criar treinador para os times
        self.trainer = User.objects.create_user(
            username='trainer',
            password='12345',
            email='trainer@example.com',
            user_type='trainer',
            is_approved=True
        )
        # Criar times para teste
        self.teams = []
        for i in range(16):
            team = Team.objects.create(
                name=f"Team {i}",
                trainer=self.trainer
            )
            self.teams.append(team)
        
        # Criar campeonato para teste
        self.championship = Championship.objects.create(
            name="Test Championship",
            description="Test",
            sport=self.sport,
            championship_type='bracket',
            start_date=timezone.now(),
            end_date=timezone.now() + timedelta(days=30)
        )
        for team in self.teams:
            self.championship.teams.add(team)

    def test_bracket_strategy_matches(self):
        """Testa geração de partidas na estratégia bracket"""
        strategy = BracketMatchStrategy()
        strategy.generate_matches(self.championship)
        
        # Deve gerar 15 partidas (8 oitavas + 4 quartas + 2 semis + 1 final)
        matches = self.championship.matches.all()
        self.assertEqual(matches.count(), 15)
        
        # Verificar estrutura das partidas
        eighth_matches = matches.filter(phase='eighth')
        self.assertEqual(eighth_matches.count(), 8)  # 8 partidas nas oitavas
        
        quarter_matches = matches.filter(phase='quarter')
        self.assertEqual(quarter_matches.count(), 4)  # 4 partidas nas quartas
        
        semi_matches = matches.filter(phase='semi')
        self.assertEqual(semi_matches.count(), 2)  # 2 partidas nas semis
        
        final_matches = matches.filter(phase='final')
        self.assertEqual(final_matches.count(), 1)  # 1 partida na final

    def test_points_strategy_matches(self):
        """Testa geração de partidas na estratégia points"""
        self.championship.championship_type = 'points'
        self.championship.save()
        
        strategy = PointsMatchStrategy()
        strategy.generate_matches(self.championship)
        
        # Cada time deve jogar contra todos os outros times
        total_teams = self.championship.teams.count()
        expected_matches = (total_teams * (total_teams - 1)) // 2
        
        matches = self.championship.matches.all()
        self.assertEqual(matches.count(), expected_matches)
        
        # Verificar se cada time joga contra todos os outros
        for team in self.teams:
            team_matches = matches.filter(Q(team1=team) | Q(team2=team))
            self.assertEqual(team_matches.count(), total_teams - 1)

    def test_factory_strategy_integration(self):
        """Testa integração entre factory e strategy"""
        # Criar campeonato via factory
        factory = BracketChampionshipFactory()
        data = {
            'name': 'Integration Test',
            'description': 'Test',
            'sport': self.sport,
            'start_date': timezone.now(),
            'end_date': timezone.now() + timedelta(days=30)
        }
        
        # Testar se as partidas são geradas corretamente após a criação
        championship = factory.create_championship(data, self.teams)
        self.assertEqual(championship.matches.count(), 15)  # Deve ter todas as partidas do bracket{{ ... }}
