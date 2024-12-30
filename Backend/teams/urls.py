from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.TeamViewSet.as_view({'get': 'list'}), name='team-list'),
    path('create/', views.TeamViewSet.as_view({'post': 'create'}), name='team-create'),
    
    # Body-based action endpoints
    path('get/', views.TeamViewSet.as_view({'post': 'get_team'}), name='team-get'),
    path('update/', views.TeamViewSet.as_view({'post': 'update_team'}), name='team-update'),
    path('delete/', views.TeamViewSet.as_view({'post': 'delete_team'}), name='team-delete'),
    path('add-player/', views.TeamViewSet.as_view({'post': 'add_player'}), name='team-add-player'),
    path('remove-player/', views.TeamViewSet.as_view({'post': 'remove_player'}), name='team-remove-player'),
]
