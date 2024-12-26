from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/request/', views.register_request, name='register-request'),
    path('trainers/pending/', views.pending_trainers, name='pending-trainers'),
    path('trainers/approve/<int:user_id>/', views.approve_user, name='approve-user'),
]
