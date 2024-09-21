import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from 'sonner';

const MaintenanceNoteForm = ({ initialData, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  const onSubmitForm = async (data) => {
    try {
      await onSubmit(data);
      toast.success('Nota de manutenção salva com sucesso!');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao salvar nota de manutenção. Por favor, tente novamente.');
    }
  };

  return (
    <ScrollArea className="h-[80vh] pr-4">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_projeto">Código do Projeto</Label>
            <Input id="cd_projeto" {...register('cd_projeto', { required: true })} />
          </div>
          <div>
            <Label htmlFor="tx_nota">Descrição da Nota</Label>
            <Input id="tx_nota" {...register('tx_nota', { required: true })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tx_ordem">Ordem</Label>
            <Input id="tx_ordem" {...register('tx_ordem')} />
          </div>
          <div>
            <Label htmlFor="tx_tag">Tag</Label>
            <Input id="tx_tag" {...register('tx_tag')} />
          </div>
        </div>

        <div>
          <Label htmlFor="tx_descricao_servico">Descrição do Serviço</Label>
          <Textarea id="tx_descricao_servico" {...register('tx_descricao_servico')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_setor_solicitante">Setor Solicitante</Label>
            <Input id="cd_setor_solicitante" {...register('cd_setor_solicitante')} />
          </div>
          <div>
            <Label htmlFor="tx_nome_solicitante">Nome do Solicitante</Label>
            <Input id="tx_nome_solicitante" {...register('tx_nome_solicitante')} />
          </div>
        </div>

        <div>
          <Label htmlFor="cd_familia_equipamentos">Família de Equipamentos</Label>
          <Input id="cd_familia_equipamentos" {...register('cd_familia_equipamentos')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_escopo_origem">Origem do Escopo</Label>
            <Input id="cd_escopo_origem" {...register('cd_escopo_origem')} />
          </div>
          <div>
            <Label htmlFor="cd_escopo_tipo">Tipo de Escopo</Label>
            <Input id="cd_escopo_tipo" {...register('cd_escopo_tipo')} />
          </div>
        </div>

        <div>
          <Label htmlFor="tx_observacao">Observação Adicional</Label>
          <Textarea id="tx_observacao" {...register('tx_observacao')} />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </ScrollArea>
  );
};

export default MaintenanceNoteForm;
