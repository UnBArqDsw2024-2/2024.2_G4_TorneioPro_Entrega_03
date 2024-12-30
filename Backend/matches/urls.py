from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.MatchViewSet.as_view({'get': 'list'}), name='match-list'),
    path('create/', views.MatchViewSet.as_view({'post': 'create'}), name='match-create'),
    
    # Body-based action endpoints
    path('get/', views.MatchViewSet.as_view({'post': 'get_match'}), name='match-get'),
    path('update/', views.MatchViewSet.as_view({'post': 'update_match'}), name='match-update'),
    path('delete/', views.MatchViewSet.as_view({'post': 'delete_match'}), name='match-delete'),
    path('set-score/', views.MatchViewSet.as_view({'post': 'set_score'}), name='match-set-score'),
]
