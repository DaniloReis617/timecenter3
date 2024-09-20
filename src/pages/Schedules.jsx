import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaintingServiceForm from '@/components/schedules/PaintingServiceForm';

const Schedules = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPaintingForm, setShowPaintingForm] = useState(false);

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

  const serviceCards = [
    { title: "Serviço de Pintura", image: "pintura.jpg", description: "Descrição do serviço de pintura" },
    { title: "Execução de Atividades", image: "execucao.jpg", description: "Descrição da execução de atividades" },
    { title: "Serviço de Isolamento", image: "isolamento.jpg", description: "Descrição do serviço de isolamento" },
    { title: "Serviço de Andaime", image: "andaime.jpg", description: "Descrição do serviço de andaime" },
    { title: "Caldeiraria e Solda", image: "caldeiraria.jpg", description: "Descrição de caldeiraria e solda" },
    { title: "Outro Serviço", image: "outro.jpg", description: "Descrição de outro serviço" },
    { title: "Serviço Adicional 1", image: "adicional1.jpg", description: "Descrição do serviço adicional 1" },
    { title: "Serviço Adicional 2", image: "adicional2.jpg", description: "Descrição do serviço adicional 2" },
  ];

  const ServiceCard = ({ title, image, description }) => (
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 m-4">
      <CardContent className="flex flex-col items-center space-y-4">
        <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
        <CardTitle className="text-xl font-bold mb-2 text-center">{title}</CardTitle>
        <p className="text-center text-sm mb-4">{description}</p>
        <Button className="w-full" onClick={() => title === "Serviço de Pintura" && setShowPaintingForm(true)}>
          Selecionar
        </Button>
      </CardContent>
    </Card>
  );

  if (isLoading) return <div>Loading...</div>;

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
    <div className="space-y-8">
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
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Detalhamento das FT's</h2>
            {/* Add your content for Detalhamento das FT's here */}
          </div>
        </TabsContent>
        <TabsContent value="auditoria-cronogramas">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Auditoria dos Cronogramas</h2>
            {/* Add your content for Auditoria dos Cronogramas here */}
          </div>
        </TabsContent>
        <TabsContent value="calculadora-metricas">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Calculadora de Métricas</h2>
            <div className="flex flex-wrap -mx-4 justify-center">
              {serviceCards.map((card, index) => (
                <ServiceCard key={index} {...card} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {showPaintingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <PaintingServiceForm onClose={() => setShowPaintingForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
