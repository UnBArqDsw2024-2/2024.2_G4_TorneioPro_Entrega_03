from rest_framework import permissions

class IsOrganizer(permissions.BasePermission):
    """
    Custom permission to only allow organizers to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.user_type == 'organizer'

class IsTrainer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_type == 'trainer'

class IsPlayer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.user_type == 'player'

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
