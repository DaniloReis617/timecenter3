import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ApoioForm = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Apoio' : 'Novo Cadastro de Apoio'}</CardTitle>
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
            <Label htmlFor="TX_TIPO">Tipo</Label>
            <Select onValueChange={(value) => register("TX_TIPO").onChange({ target: { value } })} defaultValue={initialData?.TX_TIPO}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                <SelectItem value="Tipo 3">Tipo 3</SelectItem>
              </SelectContent>
            </Select>
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
          <div className="space-y-2">
            <Label htmlFor="VL_PERCENTUAL_CUSTO">Percentual de Custo (%)</Label>
            <Input
              id="VL_PERCENTUAL_CUSTO"
              type="number"
              step="0.01"
              {...register("VL_PERCENTUAL_CUSTO", { 
                required: "Percentual de custo é obrigatório",
                min: { value: 0, message: "Valor deve ser positivo" },
                max: { value: 100, message: "Valor não pode exceder 100%" }
              })}
            />
            {errors.VL_PERCENTUAL_CUSTO && <p className="text-red-500 text-sm">{errors.VL_PERCENTUAL_CUSTO.message}</p>}
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

export default ApoioForm;