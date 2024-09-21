import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectConfigForm = ({ project, onClose }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      GID: project?.GID || '',
      CD_PROJETO: project?.CD_PROJETO || '',
      FL_NUMERO_NOTA_OBRIGATORIO: project?.FL_NUMERO_NOTA_OBRIGATORIO || '',
      FL_NUMERO_ORDEM_OBRIGATORIO: project?.FL_NUMERO_ORDEM_OBRIGATORIO || '',
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here you would typically make an API call to update the project configuration
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Configuração do Projeto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="GID">GID</Label>
            <Input id="GID" {...register("GID")} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="CD_PROJETO">Código do Projeto</Label>
            <Input id="CD_PROJETO" {...register("CD_PROJETO")} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="FL_NUMERO_NOTA_OBRIGATORIO">ID Nota Obrigatória?</Label>
            <Controller
              name="FL_NUMERO_NOTA_OBRIGATORIO"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger>
                    <Select.Value placeholder="Selecione uma opção" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="S">Sim</Select.Item>
                    <Select.Item value="N">Não</Select.Item>
                  </Select.Content>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="FL_NUMERO_ORDEM_OBRIGATORIO">ID Ordem Obrigatória?</Label>
            <Controller
              name="FL_NUMERO_ORDEM_OBRIGATORIO"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <Select.Trigger>
                    <Select.Value placeholder="Selecione uma opção" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="S">Sim</Select.Item>
                    <Select.Item value="N">Não</Select.Item>
                  </Select.Content>
                </Select>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectConfigForm;