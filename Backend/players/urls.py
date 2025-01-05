from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.PlayerViewSet.as_view({'get': 'list'}), name='player-list'),
    path('create/', views.PlayerViewSet.as_view({'post': 'create'}), name='player-create'),
    
    # Body-based action endpoints
    path('get/', views.PlayerViewSet.as_view({'post': 'get_player'}), name='player-get'),
    path('update/', views.PlayerViewSet.as_view({'post': 'update_player'}), name='player-update'),
    path('delete/', views.PlayerViewSet.as_view({'delete': 'delete_player'}), name='player-delete'),
]
