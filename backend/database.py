import pyodbc
import pandas as pd
from config import DATABASE_CONFIG

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
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def execute_read_query(query, params=None):
    try:
        with get_db_connection() as conn:
            if conn is None:
                raise Exception("Conexão com o banco de dados não estabelecida.")
            df = pd.read_sql(query, conn, params=params)
            return df
    except Exception as e:
        print(f"Erro ao executar a consulta: {e}")
        return pd.DataFrame()

def test_database_connection():
    try:
        with get_db_connection() as conn:
            if conn:
                return True, "Conexão com o banco de dados estabelecida com sucesso."
            else:
                return False, "Não foi possível estabelecer conexão com o banco de dados."
    except Exception as e:
        return False, f"Erro ao conectar com o banco de dados: {str(e)}"

# Implementação das funções do arquivo original
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

def get_projetos_por_usuario(gid_usuario):
    query = "SELECT * FROM timecenter.TB_USUARIO_PROJETO WHERE CD_USUARIO = ?"
    return execute_read_query(query, params=[gid_usuario])

def get_usuarios_df():
    query = """
    SELECT TX_LOGIN, GID, ID, FL_STATUS, NR_NIVEL 
    FROM timecenter.TB_USUARIO
    """
    return execute_read_query(query)

def get_descricao_projetos(cd_projetos_list):
    placeholders = ','.join(['?'] * len(cd_projetos_list))
    query = f"""
    SELECT GID, TX_DESCRICAO 
    FROM timecenter.TB_PROJETO 
    WHERE GID IN ({placeholders})
    """
    return execute_read_query(query, params=cd_projetos_list)

def get_all_projetos():
    query = """
    SELECT ID, GID, TX_DESCRICAO, FL_STATUS, DT_INICIO, DT_TERMINO
    FROM timecenter.TB_PROJETO
    WHERE FL_STATUS = 'A'
    """
    return execute_read_query(query)

def get_vw_nota_manutencao_hh_data():
    query = """
    SELECT GID_PROJETO, ID_NOTA_MANUTENCAO, TX_NOTA, TX_ORDEM, TX_TAG, TX_FAMILIA_EQUIPAMENTOS, 
    TX_NOME_SOLICITANTE, TX_DESCRICAO_SERVICO, VL_HH_TOTAL, VL_CUSTO_TOTAL, 
    TX_ESCOPO_TIPO, TX_SITUACAO FROM Dbo.VW_NOTA_MANUTENCAO_HH
    """
    return execute_read_query(query)
