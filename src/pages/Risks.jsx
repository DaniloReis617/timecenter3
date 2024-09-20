import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Risks = () => {
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
      <h1 className="text-3xl font-bold">Riscos</h1>

      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="mapeamento-riscos">
        <TabsList>
          <TabsTrigger value="mapeamento-riscos">Mapeamento dos Riscos por Nota</TabsTrigger>
          <TabsTrigger value="outras-paginas">Outras Páginas</TabsTrigger>
        </TabsList>
        <TabsContent value="mapeamento-riscos">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Mapeamento dos Riscos por Nota</h2>
            {/* Add your content for Mapeamento dos Riscos por Nota here */}
          </div>
        </TabsContent>
        <TabsContent value="outras-paginas">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba de outra página</h2>
            {/* Add your content for other pages here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Risks;
