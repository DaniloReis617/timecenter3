import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1"
              placeholder="Digite seu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
