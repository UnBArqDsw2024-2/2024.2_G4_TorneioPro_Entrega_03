from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .facade import DatabaseFacade
from .operations import ListOperation, GetOperation, CreateOperation, UpdateOperation, DeleteOperation
from typing import Dict, Any, List, Optional

class BaseViewSet(ViewSet):
    """
    ViewSet base que utiliza o Template Method para operações no banco.
    """
    # Configuração da tabela
    table_name: str = None
    list_fields: List[str] = None
    detail_fields: List[str] = None
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.db_facade = DatabaseFacade()
    
    def get_joins(self) -> List[str]:
        """Hook para adicionar JOINs nas queries."""
        return []
    
    def get_group_by(self) -> List[str]:
        """Hook para adicionar GROUP BY nas queries."""
        return []
    
    def prepare_data_for_create(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Hook para preparar dados antes de criar."""
        return request_data.copy()
    
    def prepare_data_for_update(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Hook para preparar dados antes de atualizar."""
        return request_data.copy()
    
    def post_process_list(self, result: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Hook para processar resultados após listagem."""
        return result
    
    def post_process_detail(self, result: Dict[str, Any]) -> Dict[str, Any]:
        """Hook para processar resultados após obter detalhe."""
        return result
    
    def list(self, request, *args, **kwargs):
        """Lista todos os registros."""
        try:
            operation = ListOperation(
                table=self.table_name,
                fields=self.list_fields,
                joins=self.get_joins(),
                group_by=self.get_group_by()
            )
            
            result = self.db_facade.execute_operation(operation)
            if result["success"]:
                data = self.post_process_list(result["data"])
                return Response(data)
            return Response(
                {"error": result["error"]},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def retrieve(self, request, pk=None, *args, **kwargs):
        """Obtém um registro específico."""
        try:
            operation = GetOperation(
                table=self.table_name,
                fields=self.detail_fields or self.list_fields,
                record_id=pk,
                joins=self.get_joins()
            )
            
            result = self.db_facade.execute_operation(operation)
            if result["success"]:
                if not result["data"]:
                    return Response(
                        {"error": "Not found"},
                        status=status.HTTP_404_NOT_FOUND
                    )
                    
                data = self.post_process_detail(result["data"])
                return Response(data)
                
            return Response(
                {"error": result["error"]},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def create(self, request, *args, **kwargs):
        """Cria um novo registro."""
        try:
            data = self.prepare_data_for_create(request.data)
            operation = CreateOperation(
                table=self.table_name,
                data=data
            )
            
            result = self.db_facade.execute_operation(operation)
            if result["success"]:
                return Response(
                    result["data"],
                    status=status.HTTP_201_CREATED
                )
                
            return Response(
                {"error": result["error"]},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, pk=None, *args, **kwargs):
        """Atualiza um registro existente."""
        try:
            data = self.prepare_data_for_update(request.data)
            operation = UpdateOperation(
                table=self.table_name,
                data=data,
                record_id=pk
            )
            
            result = self.db_facade.execute_operation(operation)
            if result["success"]:
                return Response(result["data"])
                
            return Response(
                {"error": result["error"]},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, pk=None, *args, **kwargs):
        """Remove um registro."""
        try:
            operation = DeleteOperation(
                table=self.table_name,
                record_id=pk
            )
            
            result = self.db_facade.execute_operation(operation)
            if result["success"]:
                return Response(status=status.HTTP_204_NO_CONTENT)
                
            return Response(
                {"error": result["error"]},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
