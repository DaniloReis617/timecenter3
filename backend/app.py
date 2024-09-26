from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import (
    validate_login, get_projetos_por_usuario, get_usuarios_df,
    get_descricao_projetos, get_all_projetos, get_vw_nota_manutencao_hh_data,
    test_database_connection
)
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class LoginData(BaseModel):
    username: str

@app.post("/login")
async def login(data: LoginData):
    success, user_details = validate_login(data.username)
    if success:
        return {"success": True, "user": user_details}
    raise HTTPException(status_code=401, detail="Login inválido")

@app.get("/projetos/{gid_usuario}")
async def projetos_por_usuario(gid_usuario: int):
    projetos = get_projetos_por_usuario(gid_usuario)
    return projetos.to_dict(orient='records')

@app.get("/usuarios")
async def get_usuarios():
    usuarios = get_usuarios_df()
    return usuarios.to_dict(orient='records')

@app.get("/projetos")
async def get_projetos():
    projetos = get_all_projetos()
    return projetos.to_dict(orient='records')

@app.get("/notas-manutencao")
async def get_notas_manutencao():
    notas = get_vw_nota_manutencao_hh_data()
    return notas.to_dict(orient='records')

@app.get("/test-connection")
async def test_connection():
    success, message = test_database_connection()
    return {"success": success, "message": message}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
