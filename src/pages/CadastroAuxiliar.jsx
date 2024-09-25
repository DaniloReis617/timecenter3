import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import GenericTable from '@/components/GenericTable';
import GenericForm from '@/components/GenericForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItems, createItem, updateItem, deleteItem } from '@/utils/api';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: [selectedOption],
    queryFn: () => getItems(selectedOption),
    enabled: !!selectedOption,
  });

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries([selectedOption]);
      toast.success("Item criado com sucesso");
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries([selectedOption]);
      toast.success("Item atualizado com sucesso");
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries([selectedOption]);
      toast.success("Item excluído com sucesso");
    },
  });

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate({ type: selectedOption, id });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editingItem) {
      updateMutation.mutate({ type: selectedOption, id: editingItem.ID, data });
    } else {
      createMutation.mutate({ type: selectedOption, data });
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
      {selectedOption && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selectedOption}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Carregando...</p>
            ) : (
              <GenericTable
                items={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
                filterKey="TX_DESCRICAO"
              />
            )}
          </CardContent>
        </Card>
      )}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Editar' : 'Novo'} {selectedOption}</DialogTitle>
          </DialogHeader>
          <GenericForm
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            initialData={editingItem}
            title={selectedOption}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CadastroAuxiliar;
