from flask import Flask, request, jsonify
from flask_cors import CORS
from database import (
    validate_login, get_projetos_por_usuario, get_usuarios_df,
    get_descricao_projetos, get_all_projetos, get_vw_nota_manutencao_hh_data,
    test_database_connection
)
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.errorhandler(Exception)
def handle_error(e):
    return jsonify(error=str(e)), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    success, user_details = validate_login(username)
    if success:
        return jsonify({"success": True, "user": user_details}), 200
    return jsonify({"success": False, "message": "Login inválido"}), 401

@app.route('/projetos/<int:gid_usuario>', methods=['GET'])
def projetos_por_usuario(gid_usuario):
    projetos = get_projetos_por_usuario(gid_usuario)
    return jsonify(projetos.to_dict(orient='records'))

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = get_usuarios_df()
    return jsonify(usuarios.to_dict(orient='records'))

@app.route('/projetos', methods=['GET'])
def get_projetos():
    projetos = get_all_projetos()
    return jsonify(projetos.to_dict(orient='records'))

@app.route('/notas-manutencao', methods=['GET'])
def get_notas_manutencao():
    notas = get_vw_nota_manutencao_hh_data()
    return jsonify(notas.to_dict(orient='records'))

@app.route('/test-connection', methods=['GET'])
def test_connection():
    success, message = test_database_connection()
    return jsonify({"success": success, "message": message})

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', 'False') == 'True')
