import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AreaForm = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Área' : 'Novo Cadastro de Área'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="TX_DESCRICAO">Descrição</Label>
            <Input
              id="TX_DESCRICAO"
              {...register("TX_DESCRICAO", { required: "Descrição é obrigatória" })}
            />
            {errors.TX_DESCRICAO && <p className="text-red-500 text-sm">{errors.TX_DESCRICAO.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="VL_QUANTIDADE_DIAS_EXECUCAO">Quantidade de Dias de Execução</Label>
            <Input
              id="VL_QUANTIDADE_DIAS_EXECUCAO"
              type="number"
              step="0.01"
              {...register("VL_QUANTIDADE_DIAS_EXECUCAO", { 
                required: "Quantidade de dias é obrigatória",
                min: { value: 0, message: "Valor deve ser positivo" }
              })}
            />
            {errors.VL_QUANTIDADE_DIAS_EXECUCAO && <p className="text-red-500 text-sm">{errors.VL_QUANTIDADE_DIAS_EXECUCAO.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AreaForm;
