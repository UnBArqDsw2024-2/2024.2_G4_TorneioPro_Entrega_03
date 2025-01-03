from django.urls import path
from .views import SportViewSet

urlpatterns = [
    # Rotas específicas para organizadores
    path('list/', SportViewSet.as_view({'get': 'list_sports'}), name='sport-list'),
    path('get/', SportViewSet.as_view({'post': 'get_sport'}), name='sport-get'),
    path('create/', SportViewSet.as_view({'post': 'create_sport'}), name='sport-create'),
    path('update/', SportViewSet.as_view({'put': 'update_sport'}), name='sport-update'),
    path('delete/', SportViewSet.as_view({'delete': 'delete_sport'}), name='sport-delete'),
]
