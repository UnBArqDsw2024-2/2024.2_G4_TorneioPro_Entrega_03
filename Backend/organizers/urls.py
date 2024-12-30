from django.urls import path
from . import views

urlpatterns = [
    # List and Create endpoints
    path('list/', views.OrganizerViewSet.as_view({'get': 'list'}), name='organizer-list'),
    path('create/', views.OrganizerViewSet.as_view({'post': 'create'}), name='organizer-create'),
    
    # Body-based action endpoints
    path('get/', views.OrganizerViewSet.as_view({'post': 'get_organizer'}), name='organizer-get'),
    path('update/', views.OrganizerViewSet.as_view({'post': 'update_organizer'}), name='organizer-update'),
    path('delete/', views.OrganizerViewSet.as_view({'post': 'delete_organizer'}), name='organizer-delete'),
]
