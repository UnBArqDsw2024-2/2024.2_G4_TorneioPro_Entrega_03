from rest_framework import viewsets
from database.connection import DatabaseConnection

class SingletonDatabaseViewSet(viewsets.ModelViewSet):
    """
    Classe base para ViewSets que precisam de acesso otimizado ao banco de dados.
    Implementa o padrão Singleton para conexão com o banco.
    """
    
    def get_db_connection(self):
        """Retorna a instância única da conexão com o banco"""
        return DatabaseConnection()
    
    def execute_query(self, query, params=None):
        """
        Executa uma query SQL de forma segura
        
        Args:
            query (str): Query SQL
            params (tuple): Parâmetros para a query (opcional)
        """
        db = self.get_db_connection()
        cursor = None
        try:
            cursor = db.execute_query(query, params)
            return cursor.fetchall()
        finally:
            if cursor:
                cursor.close()
    
    def execute_aggregation_query(self, query, params=None):
        """
        Executa uma query de agregação e retorna um único resultado
        """
        results = self.execute_query(query, params)
        return results[0] if results else None
