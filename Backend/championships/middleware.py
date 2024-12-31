from django.utils import timezone
from datetime import timedelta
from .models import Championship

class ChampionshipStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.last_update = None
        self.update_interval = timedelta(minutes=5)  # Atualiza a cada 5 minutos

    def __call__(self, request):
        now = timezone.now()
        
        # Verifica se é hora de atualizar
        if not self.last_update or (now - self.last_update) >= self.update_interval:
            Championship.update_active_status()
            self.last_update = now

        response = self.get_response(request)
        return response
