import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScopeSummary = ({ maintenanceNotes }) => {
  const totalHH = maintenanceNotes.reduce((sum, note) => sum + note.totalHH, 0);
  const totalCost = maintenanceNotes.reduce((sum, note) => sum + note.totalCost, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Projeto</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryItem title="Total de Notas" value={maintenanceNotes.length} />
          <SummaryItem title="Total de Ordens" value={maintenanceNotes.length} />
          <SummaryItem title="Total de HH" value={totalHH} />
          <SummaryItem title="Custo Total" value={`R$ ${totalCost.toFixed(2)}`} />
        </div>
      </CardContent>
    </Card>
  );
};

const SummaryItem = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ScopeSummary;