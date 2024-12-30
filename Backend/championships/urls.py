from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.ChampionshipViewSet.as_view({'get': 'list'}), name='championship-list'),
    path('create/', views.ChampionshipViewSet.as_view({'post': 'create'}), name='championship-create'),
    
    # Body-based action endpoints
    path('get/', views.ChampionshipViewSet.as_view({'post': 'get_championship'}), name='championship-get'),
    path('update/', views.ChampionshipViewSet.as_view({'post': 'update_championship'}), name='championship-update'),
    path('delete/', views.ChampionshipViewSet.as_view({'post': 'delete_championship'}), name='championship-delete'),
    path('join/', views.ChampionshipViewSet.as_view({'post': 'join_request'}), name='championship-join'),
    path('addteams/', views.ChampionshipViewSet.as_view({'post': 'addteams'}), name='championship-addteams'),
    path('remteams/', views.ChampionshipViewSet.as_view({'post': 'remteams'}), name='championship-remteams'),
    path('close/', views.ChampionshipViewSet.as_view({'post': 'close'}), name='championship-close'),
]
