import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecursoForm = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Recurso' : 'Novo Recurso'}</CardTitle>
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
            <Label htmlFor="VL_VALOR_CUSTO">Valor de Custo (R$)</Label>
            <Input
              id="VL_VALOR_CUSTO"
              type="number"
              step="0.01"
              {...register("VL_VALOR_CUSTO", { 
                required: "Valor de custo é obrigatório",
                min: { value: 0, message: "Valor deve ser positivo" }
              })}
            />
            {errors.VL_VALOR_CUSTO && <p className="text-red-500 text-sm">{errors.VL_VALOR_CUSTO.message}</p>}
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

export default RecursoForm;