import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import GenericTable from '@/components/GenericTable';
import GenericForm from '@/components/GenericForm';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [items, setItems] = useState({
    area: [
      { ID: 1, TX_DESCRICAO: "Área 1", VL_QUANTIDADE_DIAS_EXECUCAO: 10 },
      { ID: 2, TX_DESCRICAO: "Área 2", VL_QUANTIDADE_DIAS_EXECUCAO: 15 },
      { ID: 3, TX_DESCRICAO: "Área 3", VL_QUANTIDADE_DIAS_EXECUCAO: 20 },
    ],
    escopoOrigem: [
      { ID: 1, TX_DESCRICAO: "Escopo Origem 1" },
      { ID: 2, TX_DESCRICAO: "Escopo Origem 2" },
      { ID: 3, TX_DESCRICAO: "Escopo Origem 3" },
    ],
    escopoTipo: [
      { ID: 1, TX_DESCRICAO: "Escopo Tipo 1" },
      { ID: 2, TX_DESCRICAO: "Escopo Tipo 2" },
      { ID: 3, TX_DESCRICAO: "Escopo Tipo 3" },
    ],
    especialidade: [
      { ID: 1, TX_DESCRICAO: "Especialidade 1" },
      { ID: 2, TX_DESCRICAO: "Especialidade 2" },
      { ID: 3, TX_DESCRICAO: "Especialidade 3" },
    ],
    executante: [
      { ID: 1, TX_DESCRICAO: "Executante 1" },
      { ID: 2, TX_DESCRICAO: "Executante 2" },
      { ID: 3, TX_DESCRICAO: "Executante 3" },
    ],
    familiaEquipamentos: [
      { ID: 1, TX_DESCRICAO: "Família de Equipamentos 1" },
      { ID: 2, TX_DESCRICAO: "Família de Equipamentos 2" },
      { ID: 3, TX_DESCRICAO: "Família de Equipamentos 3" },
    ],
    planta: [
      { ID: 1, TX_DESCRICAO: "Planta 1" },
      { ID: 2, TX_DESCRICAO: "Planta 2" },
      { ID: 3, TX_DESCRICAO: "Planta 3" },
    ],
  });

  const handleButtonClick = (action) => {
    const userRole = "Administrador"; // This should come from your auth system
    if (!["Gestor", "Administrador", "Super Usuário"].includes(userRole)) {
      toast.warning("Usuário sem permissão!", { duration: 2000 });
    } else {
      setSelectedOption(action);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setItems(prevItems => ({
      ...prevItems,
      [selectedOption]: prevItems[selectedOption].filter(item => item.ID !== id)
    }));
    toast.success(`${selectedOption} excluído com sucesso`);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editingItem) {
      setItems(prevItems => ({
        ...prevItems,
        [selectedOption]: prevItems[selectedOption].map(item => 
          item.ID === editingItem.ID ? { ...item, ...data } : item
        )
      }));
      toast.success(`${selectedOption} atualizado com sucesso`);
    } else {
      const newItem = { ...data, ID: items[selectedOption].length + 1 };
      setItems(prevItems => ({
        ...prevItems,
        [selectedOption]: [...prevItems[selectedOption], newItem]
      }));
      toast.success(`Novo ${selectedOption} adicionado com sucesso`);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const buttons = [
    "Despesa", "Sist. Operacional", "Situação Motivo", "Setor Solicitante", "Setor Responsável",
    "Serviço", "Planta", "Informativo", "Familia Equip.", "Executante", "Especialidade",
    "Escopo Tipo", "Escopo Origem", "Área"
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
              onClick={() => handleButtonClick(button.toLowerCase().replace(/\s+/g, ''))}
              variant="outline"
              className="w-full"
            >
              {button}
            </Button>
          ))}
        </CardContent>
      </Card>
      {selectedOption && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selectedOption}</CardTitle>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <GenericForm
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
                initialData={editingItem}
                title={selectedOption}
              />
            ) : (
              <GenericTable
                items={items[selectedOption]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
                filterKey="TX_DESCRICAO"
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CadastroAuxiliar;
