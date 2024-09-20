import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating login logic
    let userData;
    if (username.toLowerCase() === 'admin') {
      userData = { nome: 'Admin User', perfil: 'Administrador' };
    } else if (username.toLowerCase() === 'gestor') {
      userData = { nome: 'Gestor User', perfil: 'Gestor' };
    } else {
      userData = { nome: 'Visualizador User', perfil: 'Visualizador' };
    }
    onLogin(userData);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img src="/assets/timenow-logo.png" alt="Timenow Logo" className="mx-auto w-24 h-24" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Timenow</h2>
          <p className="mt-2 text-sm text-gray-600">
            Bem-vindo ao Time Center, por favor realize o seu login!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nome de Usuário
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
