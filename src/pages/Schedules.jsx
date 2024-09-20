import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Schedules = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedResourceStage, setSelectedResourceStage] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const storedProject = localStorage.getItem('selectedProject');
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
  }, []);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const executionActivities = [
    { ID: 1, Atividades: "RAQUETEAMENTO / DESRAQ. DE UNIÕES FLANGEADAS" },
    { ID: 2, Atividades: "FECHAM/TORQUE UNIÕES FLANGEADAS" },
    { ID: 3, Atividades: "ABERTURA / FECHAMENTO DE BOCA DE VISITA" },
    { ID: 4, Atividades: "BANDEJAMENTO" },
    { ID: 5, Atividades: "REMOÇÃO / INSTALAÇÃO DE VÁLVULAS FLANGEADAS" },
    { ID: 6, Atividades: "TROCADORES DE CALOR" },
    { ID: 7, Atividades: "PADRÃO ENSAIOS NÃO DESTRUTIVOS (END's)" },
    { ID: 8, Atividades: "SERVIÇO DE LIMPEZA COM HIDROJATO" }
  ];

  const resourceStages = [
    { Etapa: "Preparação de Superfície", Tipo: "Ferramenta manual", m2_dia: 6, Pintores: 1, Ajudante: null },
    { Etapa: "Preparação de Superfície", Tipo: "Ferramenta mecânica", m2_dia: 10, Pintores: 1, Ajudante: null },
    { Etapa: "Preparação de Superfície", Tipo: "Jateamento abrasivo (cabine de jato)", m2_dia: 30, Pintores: 2, Ajudante: 1 },
    { Etapa: "Preparação de Superfície", Tipo: "Hidrojateamento (pistola)", m2_dia: 20, Pintores: 2, Ajudante: 1 },
    { Etapa: "Preparação de Superfície", Tipo: "Hidrojateamento (robô)", m2_dia: 35, Pintores: 2, Ajudante: 1 },
    { Etapa: "Método de Aplicação", Tipo: "Pistola convencional", m2_dia: 75, Pintores: 2, Ajudante: 1 },
    { Etapa: "Método de Aplicação", Tipo: "Pistola airless", m2_dia: 160, Pintores: 2, Ajudante: 1 },
    { Etapa: "Método de Aplicação", Tipo: "Rolo", m2_dia: 30, Pintores: 1, Ajudante: null },
    { Etapa: "Método de Aplicação", Tipo: "Trincha (stripe coat)", m2_dia: 20, Pintores: 1, Ajudante: null }
  ];

  const descriptionQuantities = [
    { Descricao: "Silicato de Cálcio", Tipo: "Tubulação até 4\"", Quant_ml: 18, Qt_Rec_Is_Fu: 2 },
    { Descricao: "Silicato de Cálcio", Tipo: "Tubulação de 5\" a 8\"", Quant_ml: 15, Qt_Rec_Is_Fu: 2 },
    { Descricao: "Silicato de Cálcio", Tipo: "Tubulação de 10\" até 16\"", Quant_ml: 12, Qt_Rec_Is_Fu: 2 },
    { Descricao: "Manta de Fibra Cerâmica", Tipo: "Tubulação até 4\"", Quant_ml: 40, Qt_Rec_Is_Fu: 2 }
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load projects. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cronogramas</h1>

      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="detalhamento-fts">
        <TabsList>
          <TabsTrigger value="detalhamento-fts">Detalhamento das FT's</TabsTrigger>
          <TabsTrigger value="auditoria-cronogramas">Auditoria dos Cronogramas</TabsTrigger>
          <TabsTrigger value="calculadora-metricas">Calculadora de Métricas</TabsTrigger>
        </TabsList>
        <TabsContent value="detalhamento-fts">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Detalhamento das FT's</h2>
            {/* Add your content for Detalhamento das FT's here */}
          </div>
        </TabsContent>
        <TabsContent value="auditoria-cronogramas">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Auditoria dos Cronogramas</h2>
            {/* Add your content for Auditoria dos Cronogramas here */}
          </div>
        </TabsContent>
        <TabsContent value="calculadora-metricas">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividades de Execução</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedActivity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma Atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    {executionActivities.map((activity) => (
                      <SelectItem key={activity.ID} value={activity.Atividades}>
                        {activity.Atividades}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedActivity && (
                  <p className="mt-2">Atividade Selecionada: {selectedActivity}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Etapas de Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedResourceStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma Etapa de Recursos" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(resourceStages.map(stage => stage.Etapa))].map((etapa) => (
                      <SelectItem key={etapa} value={etapa}>
                        {etapa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedResourceStage && (
                  <div className="mt-2">
                    <p>Etapa Selecionada: {selectedResourceStage}</p>
                    {resourceStages
                      .filter(stage => stage.Etapa === selectedResourceStage)
                      .map((stage, index) => (
                        <p key={index}>
                          Tipo: {stage.Tipo}, m²/dia: {stage.m2_dia}, Pintores: {stage.Pintores}, 
                          Ajudante: {stage.Ajudante !== null ? stage.Ajudante : 'N/A'}
                        </p>
                      ))
                    }
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Descrição e Quantidades</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedDescription}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma Descrição" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(descriptionQuantities.map(item => item.Descricao))].map((descricao) => (
                      <SelectItem key={descricao} value={descricao}>
                        {descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDescription && (
                  <div className="mt-2">
                    {descriptionQuantities
                      .filter(item => item.Descricao === selectedDescription)
                      .map((item, index) => (
                        <p key={index}>
                          Tipo: {item.Tipo}, Quantidade (ml): {item.Quant_ml}, Qt_Rec_Is_Fu: {item.Qt_Rec_Is_Fu}
                        </p>
                      ))
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedules;
