from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from database.base_view import BaseViewSet
from database.operations import ListOperation, GetOperation, CreateOperation, UpdateOperation, DeleteOperation
from datetime import datetime

class SportViewSet(BaseViewSet):
    """
    ViewSet para gerenciar esportes usando o Template Method.
    Mantém todas as funcionalidades originais do backend.
    """
    # Configuração da tabela
    table_name = 'sports_sport'
    list_fields = ['id', 'name', 'type']
    detail_fields = ['id', 'name', 'type']

    def get_permissions(self):
        """Define permissões por ação."""
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def list(self, request):
        """Lista todos os esportes."""
        operation = ListOperation(
            table=self.table_name,
            fields=self.list_fields
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response(result["data"])
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def create(self, request):
        """Cria um novo esporte."""
        operation = CreateOperation(
            table=self.table_name,
            data={
                'name': request.data.get('name'),
                'type': request.data.get('type')
            }
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response(result["data"])
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def retrieve(self, request):
        """Obtém detalhes de um esporte."""
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        operation = GetOperation(
            table=self.table_name,
            fields=self.detail_fields,
            record_id=sport_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"] and result["data"]:
            return Response(result["data"])
            
        return Response(
            {"error": "Sport not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    def update(self, request):
        """Atualiza um esporte existente."""
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        operation = UpdateOperation(
            table=self.table_name,
            data={
                'name': request.data.get('name'),
                'type': request.data.get('type')
            },
            record_id=sport_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response(result["data"])
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request):
        """Deleta um esporte."""
        sport_id = request.data.get('sport_id')
        if not sport_id:
            return Response(
                {"error": "sport_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        operation = DeleteOperation(
            table=self.table_name,
            record_id=sport_id
        )
        result = self.db_facade.execute_operation(operation)
        
        if result["success"]:
            return Response(status=status.HTTP_204_NO_CONTENT)
            
        return Response(
            {"error": result["error"]},
            status=status.HTTP_400_BAD_REQUEST
        )
