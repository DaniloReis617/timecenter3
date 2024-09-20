import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityForm from './ActivityForm';

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
  const [result, setResult] = useState(null);

  const handleActivitySelect = (activityId) => {
    setSelectedActivity(activities.find(a => a.id === parseInt(activityId)));
    setResult(null);
  };

  const handleCalculate = (formData) => {
    // Implement calculation logic based on the selected activity
    const calculatedResult = parseFloat(formData.quantity || 0) * parseFloat(formData.duration || 0);
    setResult(calculatedResult.toFixed(2));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Execução de Atividades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className="w-1/3 border-r pr-4">
            <h3 className="text-lg font-semibold mb-4">Atividades</h3>
            <div className="space-y-2">
              {activities.map((activity) => (
                <Button
                  key={activity.id}
                  onClick={() => handleActivitySelect(activity.id)}
                  className={`w-full justify-start ${
                    selectedActivity?.id === activity.id 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary hover:bg-primary/90 hover:text-white text-black'
                  }`}
                >
                  {activity.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-2/3">
            {selectedActivity && (
              <ActivityForm
                activity={selectedActivity}
                onCalculate={handleCalculate}
                onClose={onClose}
              />
            )}
            {result !== null && (
              <div className="mt-4">
                <Label htmlFor="estimatedTime">Tempo Estimado</Label>
                <Input
                  id="estimatedTime"
                  value={`${result} (Hrs)`}
                  readOnly
                  className="bg-primary text-white font-semibold"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityExecutionForm;
