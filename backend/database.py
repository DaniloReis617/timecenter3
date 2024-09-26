import pyodbc
import pandas as pd
from dotenv import load_dotenv
import os
import logging

# Configuração do logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

# Carrega as variáveis do arquivo .env
load_dotenv()

# Configurações do banco de dados
DATABASE_CONFIG = {
    'driver': os.getenv('DB_DRIVER'),
    'server': os.getenv('DB_SERVER'),
    'database': os.getenv('DB_NAME'),
    'username': os.getenv('DB_USERNAME'),
    'password': os.getenv('DB_PASSWORD')
}

# Função para obter a conexão com o banco de dados
def get_db_connection():
    try:
        conn = pyodbc.connect(
            f"DRIVER={{{DATABASE_CONFIG['driver']}}};"
            f"SERVER={DATABASE_CONFIG['server']};"
            f"DATABASE={DATABASE_CONFIG['database']};"
            f"UID={DATABASE_CONFIG['username']};"
            f"PWD={DATABASE_CONFIG['password']}",
            timeout=30
        )
        return conn
    except pyodbc.Error as e:
        logging.error(f"Erro ao conectar ao banco de dados: {e}")
        return None

# Função para executar consultas de leitura
def execute_read_query(query, params=None):
    conn = get_db_connection()
    if conn is None:
        logging.error("Conexão com o banco de dados não estabelecida.")
        return pd.DataFrame()

    try:
        df = pd.read_sql(query, conn, params=params)
        return df
    except Exception as e:
        logging.error(f"Erro ao executar a consulta: {e}")
        return pd.DataFrame()
    finally:
        conn.close()

# Função para executar consultas de escrita (inserção/atualização)
def execute_write_query(query, params=None):
    conn = get_db_connection()
    if conn is None:
        logging.error("Conexão com o banco de dados não estabelecida.")
        return False

    try:
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        return True
    except Exception as e:
        logging.error(f"Erro ao executar a consulta de escrita: {e}")
        return False
    finally:
        conn.close()

# Função para testar a conexão com o banco de dados
def test_database_connection():
    conn = get_db_connection()
    if conn is None:
        return False, "Não foi possível estabelecer conexão com o banco de dados."

    try:
        return True, "Conexão com o banco de dados estabelecida com sucesso."
    finally:
        conn.close()

# Função para validar o login
def validate_login(username):
    query = """
    SELECT TX_LOGIN, GID, ID, FL_STATUS, NR_NIVEL 
    FROM timecenter.TB_USUARIO 
    WHERE TX_LOGIN = ?
    """
    user_df = execute_read_query(query, params=(username,))
    if not user_df.empty:
        nivel_mapping = {1: "Visualizador", 2: "Gestor", 4: "Administrador", 8: "Super Usuário"}
        perfil = nivel_mapping.get(user_df['NR_NIVEL'].iloc[0], "Perfil Desconhecido")
        user_details = {
            'login': user_df['TX_LOGIN'].iloc[0],
            'gid': user_df['GID'].iloc[0],
            'id': user_df['ID'].iloc[0],
            'status': user_df['FL_STATUS'].iloc[0],
            'perfil': perfil
        }
        return True, user_details
    else:
        return False, None

# Função para obter projetos por usuário
def get_projetos_por_usuario(gid_usuario):
    query = "SELECT * FROM timecenter.TB_USUARIO_PROJETO WHERE CD_USUARIO = ?"
    return execute_read_query(query, params=[gid_usuario])

# Função para obter todos os usuários
def get_usuarios_df():
    query = """
    SELECT TX_LOGIN, GID, ID, FL_STATUS, NR_NIVEL 
    FROM timecenter.TB_USUARIO
    """
    return execute_read_query(query)

# Função para obter descrições de projetos por lista de IDs
def get_descricao_projetos(cd_projetos_list):
    if not cd_projetos_list:
        return pd.DataFrame()  # Retorna DataFrame vazio se a lista estiver vazia
    placeholders = ','.join(['?'] * len(cd_projetos_list))
    query = f"""
    SELECT GID, TX_DESCRICAO 
    FROM timecenter.TB_PROJETO 
    WHERE GID IN ({placeholders})
    """
    return execute_read_query(query, params=cd_projetos_list)

# Função para obter todos os projetos ativos
def get_all_projetos():
    query = """
    SELECT ID, GID, TX_DESCRICAO, FL_STATUS, DT_INICIO, DT_TERMINO
    FROM timecenter.TB_PROJETO
    WHERE FL_STATUS = 'A'
    """
    return execute_read_query(query)

# Função para obter dados da view de notas de manutenção
def get_vw_nota_manutencao_hh_data():
    query = """
    SELECT GID_PROJETO, ID_NOTA_MANUTENCAO, TX_NOTA, TX_ORDEM, TX_TAG, TX_FAMILIA_EQUIPAMENTOS, 
    TX_NOME_SOLICITANTE, TX_DESCRICAO_SERVICO, VL_HH_TOTAL, VL_CUSTO_TOTAL, 
    TX_ESCOPO_TIPO, TX_SITUACAO FROM Dbo.VW_NOTA_MANUTENCAO_HH
    """
    return execute_read_query(query)
