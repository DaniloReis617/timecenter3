import streamlit as st

# Configurações do banco de dados
DATABASE_CONFIG = {
    'driver': st.secrets['database']['driver'],
    'server': st.secrets['database']['server'],
    'database': st.secrets['database']['database'],
    'username': st.secrets['database']['username'],
    'password': st.secrets['database']['password']
}