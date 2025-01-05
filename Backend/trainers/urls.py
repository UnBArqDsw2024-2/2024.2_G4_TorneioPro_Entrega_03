from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.TrainerViewSet.as_view({'get': 'list'}), name='trainer-list'),
    path('create/', views.TrainerViewSet.as_view({'post': 'create'}), name='trainer-create'),
    
    # Body-based action endpoints
    path('get/', views.TrainerViewSet.as_view({'post': 'get_trainer'}), name='trainer-get'),
    path('update/', views.TrainerViewSet.as_view({'post': 'update_trainer'}), name='trainer-update'),
    path('delete/', views.TrainerViewSet.as_view({'delete': 'delete_trainer'}), name='trainer-delete'),
]
