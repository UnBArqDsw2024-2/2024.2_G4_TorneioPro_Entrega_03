from typing import Dict, Any, Optional, List
from .template_operations import DatabaseOperationTemplate

class ListOperation(DatabaseOperationTemplate):
    """Template Method para operações de listagem."""
    
    def __init__(self, table: str, fields: List[str], joins: Optional[List[str]] = None,
                 where: Optional[Dict[str, Any]] = None, group_by: Optional[List[str]] = None):
        super().__init__()
        self.table = table
        self.fields = fields
        self.joins = joins or []
        self.where = where or {}
        self.group_by = group_by or []
    
    def validate_data(self) -> None:
        if not self.table:
            raise ValueError("Table name is required")
        if not self.fields:
            raise ValueError("At least one field is required")
    
    def prepare_query(self) -> tuple[str, Optional[tuple]]:
        # Construir SELECT
        query = f"SELECT {', '.join(self.fields)} FROM {self.table}"
        
        # Adicionar JOINs
        for join in self.joins:
            query += f" {join}"
        
        # Adicionar WHERE
        params = []
        if self.where:
            conditions = []
            for field, value in self.where.items():
                conditions.append(f"{field} = %s")
                params.append(value)
            query += f" WHERE {' AND '.join(conditions)}"
        
        # Adicionar GROUP BY
        if self.group_by:
            query += f" GROUP BY {', '.join(self.group_by)}"
        
        return query, tuple(params) if params else None
    
    def process_result(self, result: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        if not result:
            return []
        if isinstance(result, dict):
            return [result]
        return result

class GetOperation(DatabaseOperationTemplate):
    """Template Method para operações de obtenção de um registro."""
    
    def __init__(self, table: str, fields: List[str], record_id: int,
                 joins: Optional[List[str]] = None):
        super().__init__()
        self.table = table
        self.fields = fields
        self.record_id = record_id
        self.joins = joins or []
    
    def validate_data(self) -> None:
        if not self.table:
            raise ValueError("Table name is required")
        if not self.fields:
            raise ValueError("At least one field is required")
        if not self.record_id:
            raise ValueError("Record ID is required")
    
    def prepare_query(self) -> tuple[str, tuple]:
        query = f"SELECT {', '.join(self.fields)} FROM {self.table}"
        
        for join in self.joins:
            query += f" {join}"
        
        query += f" WHERE {self.table}.id = %s"
        return query, (self.record_id,)
    
    def process_result(self, result: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        return result

class CreateOperation(DatabaseOperationTemplate):
    """Template Method para operações de criação."""
    
    def __init__(self, table: str, data: Dict[str, Any]):
        super().__init__()
        self.table = table
        self.data = data
    
    def validate_data(self) -> None:
        if not self.table:
            raise ValueError("Table name is required")
        if not self.data:
            raise ValueError("Data is required")
    
    def prepare_query(self) -> tuple[str, tuple]:
        columns = list(self.data.keys())
        values = list(self.data.values())
        placeholders = ["%s"] * len(values)
        
        query = f"""
            INSERT INTO {self.table} 
            ({', '.join(columns)}) 
            VALUES ({', '.join(placeholders)})
        """
        
        return query, tuple(values)
    
    def process_result(self, result: int) -> Dict[str, Any]:
        return {"id": result}

class UpdateOperation(DatabaseOperationTemplate):
    """Template Method para operações de atualização."""
    
    def __init__(self, table: str, data: Dict[str, Any], record_id: int):
        super().__init__()
        self.table = table
        self.data = data
        self.record_id = record_id
    
    def validate_data(self) -> None:
        if not self.table:
            raise ValueError("Table name is required")
        if not self.data:
            raise ValueError("Data is required")
        if not self.record_id:
            raise ValueError("Record ID is required")
    
    def prepare_query(self) -> tuple[str, tuple]:
        set_clause = ", ".join([f"{k} = %s" for k in self.data.keys()])
        query = f"""
            UPDATE {self.table}
            SET {set_clause}
            WHERE id = %s
        """
        
        values = list(self.data.values())
        values.append(self.record_id)
        return query, tuple(values)
    
    def process_result(self, result: int) -> Dict[str, Any]:
        return {"rows_affected": result}

class DeleteOperation(DatabaseOperationTemplate):
    """Template Method para operações de deleção."""
    
    def __init__(self, table: str, record_id: int):
        super().__init__()
        self.table = table
        self.record_id = record_id
    
    def validate_data(self) -> None:
        if not self.table:
            raise ValueError("Table name is required")
        if not self.record_id:
            raise ValueError("Record ID is required")
    
    def prepare_query(self) -> tuple[str, tuple]:
        query = f"DELETE FROM {self.table} WHERE id = %s"
        return query, (self.record_id,)
    
    def process_result(self, result: int) -> Dict[str, Any]:
        return {"rows_affected": result}
