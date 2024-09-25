import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const CadastroAuxiliar = () => {
  const handleButtonClick = (action) => {
    // Simulating user role check. In a real app, you'd use actual user data.
    const userRole = "Administrador"; // This should come from your auth system
    if (userRole !== "Administrador") {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      toast.success(`Navegando para ${action}`, { duration: 2000 });
      // Here you would normally use navigation logic, e.g., navigate(`/cadastro-${action.toLowerCase()}`)
    }
  };

  const buttons = [
    "Despesa", "Sist. Operacional", "Situação Motivo", "Setor Solicitante", "Setor Responsável",
    "Serviço", "Recurso", "Planta", "Informativo", "Familia Equip.", "Executante", "Especialidade",
    "Escopo Tipo", "Escopo Origem", "Área", "Apoio"
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro Auxiliar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Opções de Cadastro</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(button)}
              variant="outline"
              className="w-full"
            >
              {button}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroAuxiliar;