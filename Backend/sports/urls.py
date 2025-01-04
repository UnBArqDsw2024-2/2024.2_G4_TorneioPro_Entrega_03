from django.urls import path
from .views import SportViewSet

urlpatterns = [
    # Rotas específicas para esportes
    path('list/', SportViewSet.as_view({'get': 'list'}), name='sport-list'),
    path('get/', SportViewSet.as_view({'post': 'retrieve'}), name='sport-get'),
    path('create/', SportViewSet.as_view({'post': 'create'}), name='sport-create'),
    path('update/', SportViewSet.as_view({'post': 'update'}), name='sport-update'),
    path('delete/', SportViewSet.as_view({'post': 'destroy'}), name='sport-delete'),
]
