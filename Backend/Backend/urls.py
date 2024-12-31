from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('championships/', include('championships.urls')),
    path('teams/', include('teams.urls')),
    path('organizers/', include('organizers.urls')),
    path('trainers/', include('trainers.urls')),
    path('players/', include('players.urls')),
    path('matches/', include('matches.urls')),
]
