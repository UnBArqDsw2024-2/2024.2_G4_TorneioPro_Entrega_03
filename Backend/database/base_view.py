from rest_framework import viewsets
from .facade import DatabaseFacade

class SingletonDatabaseViewSet(viewsets.ModelViewSet):
    """
    Classe base para ViewSets que precisam de acesso otimizado ao banco de dados.
    Implementa o padrão Singleton para conexão com o banco e Facade para operações.
    """
    
    def get_db_facade(self):
        """Retorna a instância do Facade do banco"""
        return DatabaseFacade()
    
    def execute_query(self, query, params=None):
        """
        Executa uma query SQL de forma segura
        Mantido para compatibilidade com código existente
        """
        return self.get_db_facade().fetch_all(query, params)
    
    def execute_aggregation_query(self, query, params=None):
        """
        Executa uma query de agregação e retorna um único resultado
        Mantido para compatibilidade com código existente
        """
        return self.get_db_facade().fetch_one(query, params)
