import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Quality = () => {
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
      <h1 className="text-3xl font-bold">Qualidade</h1>

      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="plano-inspecao">
        <TabsList>
          <TabsTrigger value="plano-inspecao">Plano de Inspeção</TabsTrigger>
          <TabsTrigger value="plano-ensaios">Plano de Ensaios</TabsTrigger>
          <TabsTrigger value="mapa-juntas">Mapa de Juntas</TabsTrigger>
          <TabsTrigger value="plano-teste">Plano de Teste</TabsTrigger>
        </TabsList>
        <TabsContent value="plano-inspecao">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Importação do Plano de Inspeção</h2>
            {/* Add your content for Plano de Inspeção here */}
          </div>
        </TabsContent>
        <TabsContent value="plano-ensaios">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Importação do Plano de Ensaios</h2>
            {/* Add your content for Plano de Ensaios here */}
          </div>
        </TabsContent>
        <TabsContent value="mapa-juntas">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Importação do Mapa de Juntas</h2>
            {/* Add your content for Mapa de Juntas here */}
          </div>
        </TabsContent>
        <TabsContent value="plano-teste">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Importação do Plano de Teste</h2>
            {/* Add your content for Plano de Teste here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quality;
