import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import AreaTable from '@/components/AreaTable';
import AreaForm from '@/components/AreaForm';
import EscopoOrigemTable from '@/components/EscopoOrigemTable';
import EscopoOrigemForm from '@/components/EscopoOrigemForm';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [areas, setAreas] = useState([
    { ID: 1, TX_DESCRICAO: "Área 1", VL_QUANTIDADE_DIAS_EXECUCAO: 10 },
    { ID: 2, TX_DESCRICAO: "Área 2", VL_QUANTIDADE_DIAS_EXECUCAO: 15 },
    { ID: 3, TX_DESCRICAO: "Área 3", VL_QUANTIDADE_DIAS_EXECUCAO: 20 },
  ]);
  const [escopoOrigens, setEscopoOrigens] = useState([
    { ID: 1, TX_DESCRICAO: "Escopo Origem 1" },
    { ID: 2, TX_DESCRICAO: "Escopo Origem 2" },
    { ID: 3, TX_DESCRICAO: "Escopo Origem 3" },
  ]);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [showEscopoOrigemForm, setShowEscopoOrigemForm] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [editingEscopoOrigem, setEditingEscopoOrigem] = useState(null);

  const handleButtonClick = (action) => {
    const userRole = "Administrador"; // This should come from your auth system
    if (!["Gestor", "Administrador", "Super Usuário"].includes(userRole)) {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      setSelectedOption(action);
    }
  };

  const handleEditArea = (area) => {
    setEditingArea(area);
    setShowAreaForm(true);
  };

  const handleDeleteArea = (areaId) => {
    setAreas(areas.filter(area => area.ID !== areaId));
    toast.success("Área excluída com sucesso");
  };

  const handleAddNewArea = () => {
    setEditingArea(null);
    setShowAreaForm(true);
  };

  const handleAreaFormSubmit = (data) => {
    if (editingArea) {
      setAreas(areas.map(area => area.ID === editingArea.ID ? { ...area, ...data } : area));
      toast.success("Área atualizada com sucesso");
    } else {
      const newArea = { ...data, ID: areas.length + 1 };
      setAreas([...areas, newArea]);
      toast.success("Nova área adicionada com sucesso");
    }
    setShowAreaForm(false);
    setEditingArea(null);
  };

  const handleEditEscopoOrigem = (escopoOrigem) => {
    setEditingEscopoOrigem(escopoOrigem);
    setShowEscopoOrigemForm(true);
  };

  const handleDeleteEscopoOrigem = (escopoOrigemId) => {
    setEscopoOrigens(escopoOrigens.filter(escopo => escopo.ID !== escopoOrigemId));
    toast.success("Escopo Origem excluído com sucesso");
  };

  const handleAddNewEscopoOrigem = () => {
    setEditingEscopoOrigem(null);
    setShowEscopoOrigemForm(true);
  };

  const handleEscopoOrigemFormSubmit = (data) => {
    if (editingEscopoOrigem) {
      setEscopoOrigens(escopoOrigens.map(escopo => escopo.ID === editingEscopoOrigem.ID ? { ...escopo, ...data } : escopo));
      toast.success("Escopo Origem atualizado com sucesso");
    } else {
      const newEscopoOrigem = { ...data, ID: escopoOrigens.length + 1 };
      setEscopoOrigens([...escopoOrigens, newEscopoOrigem]);
      toast.success("Novo Escopo Origem adicionado com sucesso");
    }
    setShowEscopoOrigemForm(false);
    setEditingEscopoOrigem(null);
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
            {showAreaForm ? (
              <AreaForm
                onSubmit={handleAreaFormSubmit}
                onCancel={() => setShowAreaForm(false)}
                initialData={editingArea}
              />
            ) : (
              <AreaTable
                areas={areas}
                onEdit={handleEditArea}
                onDelete={handleDeleteArea}
                onAddNew={handleAddNewArea}
              />
            )}
          </CardContent>
        </Card>
      )}
      {selectedOption === "Escopo Origem" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Escopo Origem</CardTitle>
          </CardHeader>
          <CardContent>
            {showEscopoOrigemForm ? (
              <EscopoOrigemForm
                onSubmit={handleEscopoOrigemFormSubmit}
                onCancel={() => setShowEscopoOrigemForm(false)}
                initialData={editingEscopoOrigem}
              />
            ) : (
              <EscopoOrigemTable
                escopoOrigens={escopoOrigens}
                onEdit={handleEditEscopoOrigem}
                onDelete={handleDeleteEscopoOrigem}
                onAddNew={handleAddNewEscopoOrigem}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CadastroAuxiliar;
