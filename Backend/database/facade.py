from typing import List, Dict, Any, Optional
from .connection import DatabaseConnection

class DatabaseFacade:
    """
    Facade para operações de banco de dados.
    Simplifica operações comuns e encapsula a complexidade do acesso ao banco.
    """
    
    def __init__(self):
        self.db = DatabaseConnection()
    
    def fetch_all(self, query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
        """
        Executa uma query SELECT e retorna todos os resultados como lista de dicionários.
        """
        cursor = self.db.execute_query(query, params)
        if not cursor.description:
            return []
            
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    
    def fetch_one(self, query: str, params: Optional[tuple] = None) -> Optional[Dict[str, Any]]:
        """
        Executa uma query SELECT e retorna um único resultado como dicionário.
        """
        cursor = self.db.execute_query(query, params)
        if not cursor.description:
            return None
            
        columns = [col[0] for col in cursor.description]
        row = cursor.fetchone()
        return dict(zip(columns, row)) if row else None
    
    def execute(self, query: str, params: Optional[tuple] = None) -> int:
        """
        Executa uma query INSERT/UPDATE/DELETE e retorna o número de linhas afetadas.
        """
        cursor = self.db.execute_query(query, params)
        return cursor.rowcount
    
    def insert(self, table: str, data: Dict[str, Any]) -> int:
        """
        Insere dados em uma tabela e retorna o ID inserido.
        """
        columns = list(data.keys())
        values = list(data.values())
        placeholders = ["%s"] * len(values)
        
        query = f"""
            INSERT INTO {table} 
            ({', '.join(columns)}) 
            VALUES ({', '.join(placeholders)})
        """
        
        cursor = self.db.execute_query(query, tuple(values))
        return cursor.lastrowid
    
    def update(self, table: str, data: Dict[str, Any], where: Dict[str, Any]) -> int:
        """
        Atualiza registros em uma tabela e retorna o número de linhas afetadas.
        """
        set_clause = ", ".join([f"{k} = %s" for k in data.keys()])
        where_clause = " AND ".join([f"{k} = %s" for k in where.keys()])
        
        query = f"""
            UPDATE {table}
            SET {set_clause}
            WHERE {where_clause}
        """
        
        params = tuple(list(data.values()) + list(where.values()))
        return self.execute(query, params)
    
    def delete(self, table: str, where: Dict[str, Any]) -> int:
        """
        Deleta registros de uma tabela e retorna o número de linhas afetadas.
        """
        where_clause = " AND ".join([f"{k} = %s" for k in where.keys()])
        
        query = f"""
            DELETE FROM {table}
            WHERE {where_clause}
        """
        
        return self.execute(query, tuple(where.values()))
    
    def count(self, table: str, where: Optional[Dict[str, Any]] = None) -> int:
        """
        Conta registros em uma tabela, opcionalmente com condições WHERE.
        """
        query = f"SELECT COUNT(*) as count FROM {table}"
        params = None
        
        if where:
            where_clause = " AND ".join([f"{k} = %s" for k in where.keys()])
            query += f" WHERE {where_clause}"
            params = tuple(where.values())
        
        result = self.fetch_one(query, params)
        return result['count'] if result else 0
