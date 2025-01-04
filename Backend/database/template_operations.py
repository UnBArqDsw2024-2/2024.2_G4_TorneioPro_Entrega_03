from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from .facade import DatabaseFacade

class DatabaseOperationTemplate(ABC):
    """
    Template Method para operações no banco de dados.
    Define o esqueleto do algoritmo, deixando alguns passos
    para serem implementados pelas subclasses.
    """
    
    def __init__(self):
        self.db_facade = DatabaseFacade()
    
    def execute_operation(self) -> Dict[str, Any]:
        """
        Template method que define o esqueleto do algoritmo.
        """
        try:
            # 1. Validar os dados
            self.validate_data()
            
            # 2. Preparar a query
            query, params = self.prepare_query()
            
            # 3. Executar a operação
            result = self.execute_query(query, params)
            
            # 4. Processar o resultado
            processed_result = self.process_result(result)
            
            # 5. Pós-processamento (opcional)
            self.post_process()
            
            return {"success": True, "data": processed_result}
            
        except Exception as e:
            # Em caso de erro, permite que a subclasse trate
            return self.handle_error(e)
    
    @abstractmethod
    def validate_data(self) -> None:
        """Valida os dados antes da operação."""
        pass
    
    @abstractmethod
    def prepare_query(self) -> tuple[str, Optional[tuple]]:
        """Prepara a query SQL e seus parâmetros."""
        pass
    
    def execute_query(self, query: str, params: Optional[tuple]) -> Any:
        """Executa a query usando o Facade."""
        if query.strip().upper().startswith('SELECT'):
            if query.strip().upper().startswith('SELECT DISTINCT') or 'JOIN' in query.upper() or 'GROUP BY' in query.upper():
                return self.db_facade.fetch_all(query, params)
            if 'WHERE' in query.upper():
                return self.db_facade.fetch_one(query, params)
            return self.db_facade.fetch_all(query, params)
        else:
            return self.db_facade.execute(query, params)
    
    @abstractmethod
    def process_result(self, result: Any) -> Any:
        """Processa o resultado da query."""
        pass
    
    def post_process(self) -> None:
        """
        Hook method - pode ser sobrescrito pelas subclasses
        para adicionar passos após o processamento.
        """
        pass
    
    def handle_error(self, error: Exception) -> Dict[str, Any]:
        """
        Método padrão para tratamento de erros.
        Pode ser sobrescrito pelas subclasses.
        """
        return {
            "success": False,
            "error": str(error)
        }
