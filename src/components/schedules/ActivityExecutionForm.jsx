import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  { id: 1, name: "RAQUETEAMENTO / DESRAQ. DE UNIÕES FLANGEADAS" },
  { id: 2, name: "FECHAMENTO / TORQUE UNIÕES FLANGEADAS" },
  { id: 3, name: "ABERTURA / FECHAMENTO DE BOCA DE VISITA" },
  { id: 4, name: "BANDEJAMENTO" },
  { id: 5, name: "REMOÇÃO / INSTALAÇÃO DE VÁLVULAS" },
  { id: 6, name: "Atividade 6" },
  { id: 7, name: "Atividade 7" },
  { id: 8, name: "Atividade 8" },
];

const ActivityExecutionForm = ({ onClose }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activities.find(a => a.id === parseInt(activityId)));
    setFormData({});
    setResult(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // Implement calculation logic based on the selected activity
    // This is a placeholder calculation
    const calculatedResult = parseFloat(formData.quantity || 0) * parseFloat(formData.duration || 0);
    setResult(calculatedResult.toFixed(2));
  };

  const renderForm = () => {
    switch (selectedActivity?.id) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
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
            <div>
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
          </>
        );
      // Add cases for other activities...
      default:
        return <p>Selecione uma atividade para ver o formulário correspondente.</p>;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Execução de Atividades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 border-r pr-4">
            <h3 className="text-lg font-semibold mb-4">Atividades</h3>
            {activities.map((activity) => (
              <Button
                key={activity.id}
                onClick={() => handleActivitySelect(activity.id)}
                className={`w-full mb-2 text-left justify-start ${selectedActivity?.id === activity.id ? 'bg-primary text-white' : 'bg-secondary hover:bg-primary/90 hover:text-white'}`}
              >
                {activity.name}
              </Button>
            ))}
          </div>
          <div className="col-span-2">
            <form className="space-y-4">
              {renderForm()}
              {selectedActivity && (
                <>
                  <div>
                    <Label htmlFor="estimatedTime">Tempo Estimado</Label>
                    <Input id="estimatedTime" value={result ? `${result} (Hrs)` : ''} readOnly className="bg-primary text-white font-semibold" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={() => setFormData({})} variant="outline">Limpar</Button>
                    <Button type="button" onClick={handleCalculate}>Calcular</Button>
                    <Button type="button" onClick={onClose} variant="secondary">Voltar</Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityExecutionForm;
