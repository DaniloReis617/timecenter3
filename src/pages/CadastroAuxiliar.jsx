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
    despesa: [],
    sistOperacional: [],
    situacaoMotivo: [],
    setorSolicitante: [],
    setorResponsavel: [],
    servico: [],
    planta: [],
    informativo: [],
    familiaEquip: [],
    executante: [],
    especialidade: [],
    escopoTipo: [],
    escopoOrigem: [],
    area: [],
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

  const handleDelete = (itemId) => {
    setItems(prevItems => ({
      ...prevItems,
      [selectedOption]: prevItems[selectedOption].filter(item => item.ID !== itemId)
    }));
    toast.success(`Item excluído com sucesso`);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editingItem) {
      setItems(prevItems => ({
        ...prevItems,
        [selectedOption]: prevItems[selectedOption].map(item => item.ID === editingItem.ID ? { ...item, ...data } : item)
      }));
      toast.success(`Item atualizado com sucesso`);
    } else {
      const newItem = { ...data, ID: items[selectedOption].length + 1 };
      setItems(prevItems => ({
        ...prevItems,
        [selectedOption]: [...prevItems[selectedOption], newItem]
      }));
      toast.success(`Novo item adicionado com sucesso`);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const buttons = [
    "Despesa", "Sist. Operacional", "Situação Motivo", "Setor Solicitante", "Setor Responsável",
    "Serviço", "Planta", "Informativo", "Familia Equip.", "Executante", "Especialidade",
    "Escopo Tipo", "Escopo Origem", "Área"
  ];

  const getOptionKey = (option) => {
    const keyMap = {
      "Despesa": "despesa",
      "Sist. Operacional": "sistOperacional",
      "Situação Motivo": "situacaoMotivo",
      "Setor Solicitante": "setorSolicitante",
      "Setor Responsável": "setorResponsavel",
      "Serviço": "servico",
      "Planta": "planta",
      "Informativo": "informativo",
      "Familia Equip.": "familiaEquip",
      "Executante": "executante",
      "Especialidade": "especialidade",
      "Escopo Tipo": "escopoTipo",
      "Escopo Origem": "escopoOrigem",
      "Área": "area",
    };
    return keyMap[option] || option.toLowerCase();
  };

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
              onClick={() => handleButtonClick(getOptionKey(button))}
              variant="outline"
              className="w-full"
            >
              {button}
            </Button>
          ))}
        </CardContent>
      </Card>
      {selectedOption && selectedOption !== "recurso" && selectedOption !== "apoio" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{buttons.find(b => getOptionKey(b) === selectedOption)}</CardTitle>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <GenericForm
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
                initialData={editingItem}
                title={buttons.find(b => getOptionKey(b) === selectedOption)}
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
