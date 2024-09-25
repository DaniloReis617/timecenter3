import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import AreaTable from '@/components/AreaTable';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [areas, setAreas] = useState([
    { ID: 1, TX_DESCRICAO: "Área 1", VL_QUANTIDADE_DIAS_EXECUCAO: 10 },
    { ID: 2, TX_DESCRICAO: "Área 2", VL_QUANTIDADE_DIAS_EXECUCAO: 15 },
    { ID: 3, TX_DESCRICAO: "Área 3", VL_QUANTIDADE_DIAS_EXECUCAO: 20 },
  ]);

  const handleButtonClick = (action) => {
    // Simulating user role check. In a real app, you'd use actual user data.
    const userRole = "Administrador"; // This should come from your auth system
    if (!["Gestor", "Administrador", "Super Usuário"].includes(userRole)) {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      setSelectedOption(action);
    }
  };

  const handleEditArea = (area) => {
    // Implement edit logic here
    console.log("Edit area:", area);
    toast.info("Função de edição não implementada");
  };

  const handleDeleteArea = (areaId) => {
    // Implement delete logic here
    console.log("Delete area:", areaId);
    toast.info("Função de exclusão não implementada");
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
      {selectedOption === "Área" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Áreas</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaTable
              areas={areas}
              onEdit={handleEditArea}
              onDelete={handleDeleteArea}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CadastroAuxiliar;
