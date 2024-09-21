import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const ProjectForm = ({ project, onClose }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      GID: project?.id || '',
      TX_DESCRICAO: project?.name || '',
      FL_STATUS: project?.status || 'Active',
      DT_INICIO: project?.startDate || '',
      DT_TERMINO: project?.endDate || '',
      VL_VALOR_ORCAMENTO: project?.budget || '',
      VL_PERCENTUAL_CONTINGENCIA: project?.contingency || '',
      TX_INFORMACAO: project?.information || '',
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    toast.success(project ? 'Projeto atualizado com sucesso!' : 'Projeto criado com sucesso!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="TX_DESCRICAO">Descrição</Label>
          <Input id="TX_DESCRICAO" {...register("TX_DESCRICAO", { required: true })} />
        </div>
        <div>
          <Label htmlFor="FL_STATUS">Status</Label>
          <Controller
            name="FL_STATUS"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Ativo</SelectItem>
                  <SelectItem value="Inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="DT_INICIO">Data de Início</Label>
          <Input id="DT_INICIO" type="date" {...register("DT_INICIO", { required: true })} />
        </div>
        <div>
          <Label htmlFor="DT_TERMINO">Data de Término</Label>
          <Input id="DT_TERMINO" type="date" {...register("DT_TERMINO", { required: true })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="VL_VALOR_ORCAMENTO">Orçamento (R$)</Label>
          <Input id="VL_VALOR_ORCAMENTO" type="number" step="0.01" {...register("VL_VALOR_ORCAMENTO", { required: true })} />
        </div>
        <div>
          <Label htmlFor="VL_PERCENTUAL_CONTINGENCIA">Contingência (%)</Label>
          <Input id="VL_PERCENTUAL_CONTINGENCIA" type="number" step="0.01" {...register("VL_PERCENTUAL_CONTINGENCIA", { required: true })} />
        </div>
      </div>
      <div>
        <Label htmlFor="TX_INFORMACAO">Informações</Label>
        <Textarea id="TX_INFORMACAO" {...register("TX_INFORMACAO")} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default ProjectForm;