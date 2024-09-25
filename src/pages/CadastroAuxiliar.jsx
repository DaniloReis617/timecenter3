import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import EspecialidadeTable from '@/components/EspecialidadeTable';
import EspecialidadeForm from '@/components/EspecialidadeForm';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showEspecialidadeForm, setShowEspecialidadeForm] = useState(false);
  const [editingEspecialidade, setEditingEspecialidade] = useState(null);

  const handleButtonClick = (action) => {
    const userRole = "Administrador"; // This should come from your auth system
    if (!["Gestor", "Administrador", "Super Usuário"].includes(userRole)) {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      setSelectedOption(action);
    }
  };

  const handleEditEspecialidade = (especialidade) => {
    setEditingEspecialidade(especialidade);
    setShowEspecialidadeForm(true);
  };

  const handleDeleteEspecialidade = (especialidadeId) => {
    // Implement delete logic here
    toast.success("Especialidade excluída com sucesso");
  };

  const handleAddNewEspecialidade = () => {
    setEditingEspecialidade(null);
    setShowEspecialidadeForm(true);
  };

  const handleEspecialidadeFormSubmit = (data) => {
    if (editingEspecialidade) {
      // Implement update logic here
      toast.success("Especialidade atualizada com sucesso");
    } else {
      // Implement create logic here
      toast.success("Nova especialidade adicionada com sucesso");
    }
    setShowEspecialidadeForm(false);
    setEditingEspecialidade(null);
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
      {selectedOption === "Especialidade" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            {showEspecialidadeForm ? (
              <EspecialidadeForm
                onSubmit={handleEspecialidadeFormSubmit}
                onCancel={() => setShowEspecialidadeForm(false)}
                initialData={editingEspecialidade}
              />
            ) : (
              <EspecialidadeTable
                onEdit={handleEditEspecialidade}
                onDelete={handleDeleteEspecialidade}
                onAddNew={handleAddNewEspecialidade}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CadastroAuxiliar;
