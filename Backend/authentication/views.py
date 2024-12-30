from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from .models import User
from .permissions import IsOrganizer
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        
        if user:
            # Check if user is a trainer and not approved
            if user.user_type == 'trainer' and not user.is_approved:
                return Response(
                    {'error': 'Your trainer account is pending approval'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_request(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            response_data = serializer.data
            if user.user_type == 'player':
                response_data['message'] = 'Player registered successfully'
            else:
                response_data['message'] = f'{user.user_type.capitalize()} registration pending approval'
                response_data['is_approved'] = user.is_approved
            return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsOrganizer])
def approve_user(request):
    """
    Endpoint para organizadores aprovarem usuários pendentes.
    Apenas treinadores precisam de aprovação.
    """
    user_id = request.data.get('trainer_id')
    if not user_id:
        return Response(
            {'error': 'trainer_id is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(id=user_id, user_type='trainer', is_approved=False)
    except User.DoesNotExist:
        return Response(
            {'error': 'Trainer not found or already approved'}, 
            status=status.HTTP_404_NOT_FOUND
        )

    user.is_approved = True
    user.save()
    
    return Response({
        'message': 'Trainer approved successfully',
        'user': UserSerializer(user).data
    })

@api_view(['GET'])
@permission_classes([IsOrganizer])
def pending_trainers(request):
    """
    Endpoint para listar todos os treinadores pendentes de aprovação.
    """
    pending_users = User.objects.filter(
        user_type='trainer',
        is_approved=False
    )
    
    serializer = UserSerializer(pending_users, many=True)
    return Response({
        'pending_trainers': serializer.data,
        'count': pending_users.count()
    }, status=status.HTTP_200_OK)
