import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const MaintenanceNoteForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Here you would typically make an API call to save the data
      console.log('Form data:', data);
      toast.success('Nota de manutenção adicionada com sucesso!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao adicionar nota de manutenção. Por favor, tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Identificação da Nota</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_projeto">Código do Projeto</Label>
            <Input id="cd_projeto" {...register('cd_projeto', { required: true })} placeholder="Digite o código do projeto" />
          </div>
          <div>
            <Label htmlFor="tx_nota">Descrição da Nota</Label>
            <Input id="tx_nota" {...register('tx_nota', { required: true })} placeholder="Digite a descrição da nota" />
          </div>
          <div>
            <Label htmlFor="tx_ordem">Ordem</Label>
            <Input id="tx_ordem" {...register('tx_ordem')} placeholder="Digite o número da ordem" />
          </div>
          <div>
            <Label htmlFor="tx_tag">Tag</Label>
            <Input id="tx_tag" {...register('tx_tag')} placeholder="Digite o tag" />
          </div>
          <div>
            <Label htmlFor="tx_tag_linha">Tag da Linha</Label>
            <Input id="tx_tag_linha" {...register('tx_tag_linha')} placeholder="Digite o tag da linha" />
          </div>
          <div>
            <Label htmlFor="cd_servico">Código do Serviço</Label>
            <Input id="cd_servico" {...register('cd_servico')} placeholder="Digite o código do serviço" />
          </div>
          <div className="col-span-2">
            <Label htmlFor="tx_descricao_servico">Descrição do Serviço</Label>
            <Textarea id="tx_descricao_servico" {...register('tx_descricao_servico')} placeholder="Descreva o serviço" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solicitante e Responsável</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_setor_solicitante">Código do Setor Solicitante</Label>
            <Input id="cd_setor_solicitante" {...register('cd_setor_solicitante')} placeholder="Digite o código do setor solicitante" />
          </div>
          <div>
            <Label htmlFor="tx_nome_solicitante">Nome do Solicitante</Label>
            <Input id="tx_nome_solicitante" {...register('tx_nome_solicitante')} placeholder="Digite o nome do solicitante" />
          </div>
          <div>
            <Label htmlFor="cd_setor_responsavel">Código do Setor Responsável</Label>
            <Input id="cd_setor_responsavel" {...register('cd_setor_responsavel')} placeholder="Digite o código do setor responsável" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes Técnicos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_familia_equipamentos">Família de Equipamentos</Label>
            <Input id="cd_familia_equipamentos" {...register('cd_familia_equipamentos')} placeholder="Digite a família de equipamentos" />
          </div>
          <div>
            <Label htmlFor="cd_planta">Código da Planta</Label>
            <Input id="cd_planta" {...register('cd_planta')} placeholder="Digite o código da planta" />
          </div>
          <div>
            <Label htmlFor="cd_area">Código da Área</Label>
            <Input id="cd_area" {...register('cd_area')} placeholder="Digite o código da área" />
          </div>
          <div>
            <Label htmlFor="cd_especialidade">Código da Especialidade</Label>
            <Input id="cd_especialidade" {...register('cd_especialidade')} placeholder="Digite o código da especialidade" />
          </div>
          <div>
            <Label htmlFor="cd_sistema_operacional_1">Sistema Operacional 1</Label>
            <Input id="cd_sistema_operacional_1" {...register('cd_sistema_operacional_1')} placeholder="Digite o sistema operacional 1" />
          </div>
          <div>
            <Label htmlFor="cd_sistema_operacional_2">Sistema Operacional 2</Label>
            <Input id="cd_sistema_operacional_2" {...register('cd_sistema_operacional_2')} placeholder="Digite o sistema operacional 2" />
          </div>
          <div>
            <Label htmlFor="tx_equipamento_mestre">Equipamento Mestre</Label>
            <Input id="tx_equipamento_mestre" {...register('tx_equipamento_mestre')} placeholder="Digite o equipamento mestre" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escopo e Situação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_escopo_origem">Origem do Escopo</Label>
            <Input id="cd_escopo_origem" {...register('cd_escopo_origem')} placeholder="Digite a origem do escopo" />
          </div>
          <div>
            <Label htmlFor="cd_escopo_tipo">Tipo de Escopo</Label>
            <Input id="cd_escopo_tipo" {...register('cd_escopo_tipo')} placeholder="Digite o tipo do escopo" />
          </div>
          <div>
            <Label htmlFor="cd_situacao_motivo">Motivo da Situação</Label>
            <Input id="cd_situacao_motivo" {...register('cd_situacao_motivo')} placeholder="Digite o motivo da situação" />
          </div>
          <div>
            <Label htmlFor="tx_rec_inspecao">Recomendação de Inspeção</Label>
            <Input id="tx_rec_inspecao" {...register('tx_rec_inspecao')} placeholder="Digite a recomendação" />
          </div>
          <div>
            <Label htmlFor="fl_nmp">Tem Nota Manut. Parada?</Label>
            <Select id="fl_nmp" {...register('fl_nmp')}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="fl_ase">Tem Autorização de Serviço Extra?</Label>
            <Select id="fl_ase" {...register('fl_ase')}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="tx_ase">Autorização Serviço Extra</Label>
            <Input id="tx_ase" {...register('tx_ase')} placeholder="Digite a autorização" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Executantes</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cd_executante_1">Código do Executante 1</Label>
            <Input id="cd_executante_1" {...register('cd_executante_1')} placeholder="Digite o código do executante 1" />
          </div>
          <div>
            <Label htmlFor="cd_executante_2">Código do Executante 2</Label>
            <Input id="cd_executante_2" {...register('cd_executante_2')} placeholder="Digite o código do executante 2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dt_atualizacao">Data de Atualização</Label>
            <Input id="dt_atualizacao" type="date" {...register('dt_atualizacao')} />
          </div>
          <div className="col-span-2">
            <Label htmlFor="tx_observacao">Observação Adicional</Label>
            <Textarea id="tx_observacao" {...register('tx_observacao')} placeholder="Digite as observações" />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Adicionar Nota</Button>
    </form>
  );
};

export default MaintenanceNoteForm;
