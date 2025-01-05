from django.utils import timezone
from datetime import timedelta
from .models import Championship

# Removendo o middleware pois agora usamos uma property para is_active
class ChampionshipStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response
