import pyodbc
from dotenv import load_dotenv
import os

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Configurações do banco de dados
DATABASE_CONFIG = {
    'driver': os.getenv('DB_DRIVER'),
    'server': os.getenv('DB_SERVER'),
    'database': os.getenv('DB_NAME'),
    'username': os.getenv('DB_USERNAME'),
    'password': os.getenv('DB_PASSWORD')
}

def test_connection():
    try:
        # Tenta estabelecer uma conexão
        conn_str = f"DRIVER={{{DATABASE_CONFIG['driver']}}};" \
                   f"SERVER={DATABASE_CONFIG['server']};" \
                   f"DATABASE={DATABASE_CONFIG['database']};" \
                   f"UID={DATABASE_CONFIG['username']};" \
                   f"PWD={DATABASE_CONFIG['password']}"
        
        conn = pyodbc.connect(conn_str, timeout=30)
        
        # Se a conexão for bem-sucedida, executa uma consulta simples
        cursor = conn.cursor()
        cursor.execute("SELECT @@version;")
        row = cursor.fetchone()
        
        print("Conexão estabelecida com sucesso!")
        print(f"Versão do SQL Server: {row[0]}")
        
        # Fecha a conexão
        conn.close()
        
    except pyodbc.Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")

if __name__ == "__main__":
    test_connection()