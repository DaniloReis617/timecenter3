import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
    const calculatedResult = parseFloat(formData.quantity || 0) * parseFloat(formData.duration || 0);
    setResult(calculatedResult.toFixed(2));
  };

  const formatButtonText = (text) => {
    return text.split(' ').reduce((acc, word, index, array) => {
      if (index % 2 === 0 && index < array.length - 1) {
        return [...acc, `${word} ${array[index + 1]}`];
      } else if (index % 2 !== 0) {
        return acc;
      }
      return [...acc, word];
    }, []).join('\n');
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
                  className={`w-full h-auto py-2 px-3 text-xs whitespace-pre-wrap ${
                    selectedActivity?.id === activity.id 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary hover:bg-primary/90 hover:text-white text-black'
                  }`}
                >
                  {formatButtonText(activity.name)}
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
                <p className="font-semibold">Tempo Estimado: {result} (Hrs)</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityExecutionForm;
