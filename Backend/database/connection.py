import MySQLdb
from django.conf import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class DatabaseConnection:
    """
    Singleton class para gerenciar a conexão com o banco de dados MySQL.
    Garante que apenas uma conexão seja criada e reutilizada.
    """
    _instance: Optional['DatabaseConnection'] = None
    _connection = None

    def __new__(cls) -> 'DatabaseConnection':
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        # O init só será executado uma vez devido ao Singleton
        if not self._connection:
            self._connect()

    def _connect(self):
        """Estabelece a conexão com o banco de dados usando as configurações do Django"""
        try:
            self._connection = MySQLdb.connect(
                host=settings.DATABASES['default']['HOST'],
                user=settings.DATABASES['default']['USER'],
                passwd=settings.DATABASES['default']['PASSWORD'],
                db=settings.DATABASES['default']['NAME'],
                port=int(settings.DATABASES['default']['PORT'])
            )
            logger.info("Conexão com o banco de dados estabelecida com sucesso")
        except Exception as e:
            logger.error(f"Erro ao conectar ao banco de dados: {str(e)}")
            raise

    def get_connection(self):
        """Retorna a conexão existente ou cria uma nova se necessário"""
        if not self._connection or not self._connection.open:
            self._connect()
        return self._connection

    def close_connection(self):
        """Fecha a conexão com o banco de dados"""
        if self._connection and self._connection.open:
            self._connection.close()
            logger.info("Conexão com o banco de dados fechada")

    def execute_query(self, query: str, params: tuple = None):
        """
        Executa uma query SQL
        
        Args:
            query (str): Query SQL a ser executada
            params (tuple): Parâmetros para a query (opcional)
            
        Returns:
            cursor: Cursor com os resultados da query
        """
        connection = self.get_connection()
        cursor = connection.cursor()
        
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            connection.commit()
            return cursor
        except Exception as e:
            connection.rollback()
            logger.error(f"Erro ao executar query: {str(e)}")
            raise

    def __del__(self):
        """Garante que a conexão seja fechada quando o objeto for destruído"""
        self.close_connection()
