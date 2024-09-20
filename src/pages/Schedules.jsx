import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Schedules = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <CardContent className="flex flex-col items-center">
        <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
        <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
        <p className="text-center text-sm">{description}</p>
        <Button className="mt-4">Selecionar</Button>
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
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Calculadora de Métricas</h2>
            <div className="flex flex-wrap -mx-4">
              {serviceCards.map((card, index) => (
                <ServiceCard key={index} {...card} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedules;
