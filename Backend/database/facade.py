from typing import Dict, Any, List, Optional
import mysql.connector
from mysql.connector import Error
from django.conf import settings

class DatabaseFacade:
    """
    Implementação do padrão Singleton para garantir uma única instância
    da conexão com o banco de dados.
    """
    _instance = None
    _connection = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseFacade, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._connection:
            self._connect()

    def _connect(self):
        """Estabelece conexão com o banco de dados."""
        try:
            self._connection = mysql.connector.connect(
                host=settings.DATABASES['default']['HOST'],
                user=settings.DATABASES['default']['USER'],
                password=settings.DATABASES['default']['PASSWORD'],
                database=settings.DATABASES['default']['NAME']
            )
            self._connection.autocommit = True
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            raise

    def _ensure_connection(self):
        """Garante que a conexão está ativa."""
        try:
            if not self._connection or not self._connection.is_connected():
                self._connect()
        except Error as e:
            print(f"Error reconnecting to MySQL: {e}")
            raise

    def execute(self, query: str, params: Optional[tuple] = None) -> int:
        """
        Executa uma query de modificação (INSERT, UPDATE, DELETE).
        Retorna o ID do último registro inserido ou número de linhas afetadas.
        """
        self._ensure_connection()
        cursor = self._connection.cursor()
        try:
            cursor.execute(query, params or ())
            self._connection.commit()
            
            if cursor.lastrowid:
                return cursor.lastrowid
            return cursor.rowcount
        finally:
            cursor.close()

    def fetch_one(self, query: str, params: Optional[tuple] = None) -> Optional[Dict[str, Any]]:
        """
        Executa uma query e retorna um único resultado como dicionário.
        """
        self._ensure_connection()
        cursor = self._connection.cursor(dictionary=True)
        try:
            cursor.execute(query, params or ())
            result = cursor.fetchone()
            cursor.fetchall()  # Limpa quaisquer resultados não lidos
            return result
        finally:
            cursor.close()

    def fetch_all(self, query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
        """
        Executa uma query e retorna todos os resultados como lista de dicionários.
        """
        self._ensure_connection()
        cursor = self._connection.cursor(dictionary=True)
        try:
            cursor.execute(query, params or ())
            result = cursor.fetchall()
            cursor.fetchall()  # Limpa quaisquer resultados não lidos
            return result
        finally:
            cursor.close()

    def execute_operation(self, operation: 'DatabaseOperationTemplate') -> Dict[str, Any]:
        """
        Executa uma operação usando o Template Method.
        """
        try:
            return operation.execute_operation()
        except Error as e:
            return {"success": False, "error": str(e)}
