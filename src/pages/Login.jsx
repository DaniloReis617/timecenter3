import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from '@tanstack/react-query';
import { login } from '@/utils/api';
import { toast } from 'sonner';
import logo from '@/assets/images/logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Logo path:', logo);
  }, []);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      console.log('Login successful:', userData);
      onLogin(userData);
      toast.success(`Login bem-sucedido! Bem-vindo, ${userData.TX_LOGIN}!`);
      navigate('/');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.message || "Erro ao tentar autenticar. Por favor, tente novamente.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(username);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-custom-background">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          {logo ? (
            <img 
              src={logo}
              alt="Timenow Logo" 
              className="mx-auto w-24 h-24 object-contain"
              onError={(e) => {
                console.error('Error loading logo:', e);
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="mx-auto w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500">
              Logo not found
            </div>
          )}
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
