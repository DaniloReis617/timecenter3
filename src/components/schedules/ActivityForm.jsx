import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActivityForm = ({ activity, onCalculate, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const renderFields = () => {
    switch (activity.id) {
      case 1:
      case 2:
      case 3:
      case 5:
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="activity">Atividade</Label>
                <Select onValueChange={(value) => handleSelectChange('activity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity1">Atividade 1</SelectItem>
                    <SelectItem value="activity2">Atividade 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pressureClass">Classe de Pressão</Label>
                <Select onValueChange={(value) => handleSelectChange('pressureClass', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Classe de Pressão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class1">Classe 1</SelectItem>
                    <SelectItem value="class2">Classe 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="diameter">Diâmetro Ex.</Label>
              <Select onValueChange={(value) => handleSelectChange('diameter', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar Diâmetro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diameter1">Diâmetro 1</SelectItem>
                  <SelectItem value="diameter2">Diâmetro 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="duration">Duração (hs)</Label>
                <Input id="duration" name="duration" value={formData.duration || ''} onChange={handleInputChange} readOnly />
              </div>
              <div>
                <Label htmlFor="quantity">Qt Rec. (Ca)</Label>
                <Input id="quantity" name="quantity" value={formData.quantity || ''} onChange={handleInputChange} readOnly />
              </div>
              <div>
                <Label htmlFor="hh">Hh</Label>
                <Input id="hh" name="hh" value={formData.hh || ''} onChange={handleInputChange} readOnly />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="activity">Atividade</Label>
                <Select onValueChange={(value) => handleSelectChange('activity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity1">Atividade 1</SelectItem>
                    <SelectItem value="activity2">Atividade 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duração</Label>
                <Input id="duration" name="duration" value={formData.duration || ''} onChange={handleInputChange} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="quantity">QTD</Label>
                <Input id="quantity" name="quantity" value={formData.quantity || ''} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="qtRec">Qt Rec. (Ca)</Label>
                <Input id="qtRec" name="qtRec" value={formData.qtRec || ''} onChange={handleInputChange} readOnly />
              </div>
              <div>
                <Label htmlFor="hh">Hh</Label>
                <Input id="hh" name="hh" value={formData.hh || ''} onChange={handleInputChange} readOnly />
              </div>
            </div>
          </>
        );
      default:
        return <p>Selecione uma atividade para ver o formulário correspondente.</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{activity.name}</h2>
      {renderFields()}
      <div className="flex justify-end space-x-4 mt-6">
        <Button type="button" onClick={() => setFormData({})} variant="outline">Limpar</Button>
        <Button type="submit">Calcular</Button>
        <Button type="button" onClick={onClose} variant="secondary">Voltar</Button>
      </div>
    </form>
  );
};

export default ActivityForm;