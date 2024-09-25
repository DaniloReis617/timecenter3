import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import GenericTable from '@/components/GenericTable';
import GenericForm from '@/components/GenericForm';
import AreaTable from '@/components/AreaTable';
import AreaForm from '@/components/AreaForm';
import RecursoTable from '@/components/RecursoTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItems, createItem, updateItem, deleteItem, getAreas, createArea, updateArea, deleteArea, getRecursos, createRecurso, updateRecurso, deleteRecurso } from '@/utils/api';

const CadastroAuxiliar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: [selectedOption],
    queryFn: () => {
      if (selectedOption === 'Área') return getAreas();
      if (selectedOption === 'Recurso') return getRecursos();
      return getItems(selectedOption);
    },
    enabled: !!selectedOption,
  });

  const createMutation = useMutation({
    mutationFn: (data) => {
      if (selectedOption === 'Área') return createArea(data);
      if (selectedOption === 'Recurso') return createRecurso(data);
      return createItem({ type: selectedOption, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([selectedOption]);
      toast.success("Item criado com sucesso");
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      if (selectedOption === 'Área') return updateArea(data);
      if (selectedOption === 'Recurso') return updateRecurso(data);
      return updateItem({ type: selectedOption, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([selectedOption]);
      toast.success("Item atualizado com sucesso");
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (selectedOption === 'Área') return deleteArea({ id });
      if (selectedOption === 'Recurso') return deleteRecurso({ id });
      return deleteItem({ type: selectedOption, id });
    },
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
    deleteMutation.mutate(id);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.ID, data });
    } else {
      createMutation.mutate(data);
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
            ) : selectedOption === 'Área' ? (
              <AreaTable
                areas={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
              />
            ) : selectedOption === 'Recurso' ? (
              <RecursoTable
                recursos={items}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
              />
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
          {selectedOption === 'Área' ? (
            <AreaForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              initialData={editingItem}
            />
          ) : selectedOption === 'Recurso' ? (
            <GenericForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              initialData={editingItem}
              title={selectedOption}
              fields={[
                { name: 'TX_DESCRICAO', label: 'Descrição', type: 'text' },
                { name: 'VL_VALOR_CUSTO', label: 'Valor de Custo', type: 'number' }
              ]}
            />
          ) : (
            <GenericForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              initialData={editingItem}
              title={selectedOption}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CadastroAuxiliar;
