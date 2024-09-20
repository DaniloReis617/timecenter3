import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from '@tanstack/react-query';
import { login } from '@/utils/api';
import { toast } from 'sonner';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      console.log('Login successful:', userData);
      onLogin(userData);
      toast.success(`Login bem-sucedido! Bem-vindo, ${userData.name}!`);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.message || "Erro ao tentar autenticar. Por favor, tente novamente mais tarde.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      toast.error("Por favor, insira um email válido com o domínio @timenow.com.br.");
      return;
    }
    loginMutation.mutate(username);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@timenow\.com\.br$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="flex items-center justify-center h-screen bg-custom-background">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img src="/assets/timenow-logo.png" alt="Timenow Logo" className="mx-auto w-24 h-24" />
          <h2 className="mt-6 text-3xl font-extrabold text-custom-primary">Timenow</h2>
          <p className="mt-2 text-sm text-custom-text">
            Bem-vindo ao Time Center, por favor realize o seu login!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-custom-text">
              Email
            </label>
            <Input
              id="username"
              name="username"
              type="email"
              autoComplete="email"
              required
              className="mt-1 bg-custom-secondaryBackground text-custom-text"
              placeholder="Digite seu email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="w-full bg-custom-primary hover:bg-opacity-90 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
