import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaintingServiceForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    etapa: '',
    tipo: '',
    m2Dia: '',
    pintor: '',
    ajudantes: '',
    qtdM2: '',
  });
  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const m2Dia = parseFloat(formData.m2Dia);
    const qtdM2 = parseFloat(formData.qtdM2);
    if (m2Dia && qtdM2) {
      const resultadoHora = qtdM2 / m2Dia;
      const resultadoFinal = resultadoHora * 8; // Considerando 8 horas por dia
      setResultado(resultadoFinal.toFixed(2));
    }
  };

  const handleReset = () => {
    setFormData({
      etapa: '',
      tipo: '',
      m2Dia: '',
      pintor: '',
      ajudantes: '',
      qtdM2: '',
    });
    setResultado(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Serviço de Pintura Industrial</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="etapa">Etapa:</Label>
              <Select onValueChange={(value) => handleSelectChange('etapa', value)} value={formData.etapa}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar Etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="etapa1">Etapa 1</SelectItem>
                  <SelectItem value="etapa2">Etapa 2</SelectItem>
                  <SelectItem value="etapa3">Etapa 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo">Tipo:</Label>
              <Select onValueChange={(value) => handleSelectChange('tipo', value)} value={formData.tipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tipo1">Tipo 1</SelectItem>
                  <SelectItem value="tipo2">Tipo 2</SelectItem>
                  <SelectItem value="tipo3">Tipo 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="m2Dia">M² Dia:</Label>
              <Input id="m2Dia" name="m2Dia" value={formData.m2Dia} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="pintor">Pintor:</Label>
              <Input id="pintor" name="pintor" value={formData.pintor} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ajudantes">Ajudantes:</Label>
              <Input id="ajudantes" name="ajudantes" value={formData.ajudantes} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="qtdM2">QTD M²:</Label>
              <Input id="qtdM2" name="qtdM2" value={formData.qtdM2} onChange={handleInputChange} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <Label>Tempo Estimado:</Label>
              <Input value={resultado ? `${resultado} (Hrs)` : ''} readOnly className="bg-primary text-white font-semibold" />
            </div>
            <div className="space-x-2">
              <Button type="button" onClick={handleReset}>Limpar</Button>
              <Button type="button" onClick={handleCalculate}>Calcular</Button>
              <Button type="button" onClick={onClose}>Voltar</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaintingServiceForm;