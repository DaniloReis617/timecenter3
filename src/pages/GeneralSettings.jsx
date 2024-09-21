import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { updateAppSettings } from '@/utils/api';

const GeneralSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    logo: '',
    theme: 'light',
    primaryColor: '#4b6357',
    secondaryColor: '#f7f8fa',
    loginImage: '',
    homeImage: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || (user.perfil !== "Desenvolvedor" && user.email !== "danilo.reis@timenow.com")) {
      toast.error("Você não tem permissão para acessar esta página.");
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppSettings(settings);
      toast.success("Configurações atualizadas com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar as configurações.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" name="logo" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select name="theme" value={settings.theme} onValueChange={(value) => handleInputChange({ target: { name: 'theme', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <Input id="primaryColor" name="primaryColor" type="color" value={settings.primaryColor} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <Input id="secondaryColor" name="secondaryColor" type="color" value={settings.secondaryColor} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="loginImage">Imagem de Login</Label>
              <Input id="loginImage" name="loginImage" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div>
              <Label htmlFor="homeImage">Imagem da Página Inicial</Label>
              <Input id="homeImage" name="homeImage" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <Button type="submit">Salvar Configurações</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;