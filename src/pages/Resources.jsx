import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Resources = () => {
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
      <h1 className="text-3xl font-bold">Recursos</h1>

      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="comparativo-hh">
        <TabsList>
          <TabsTrigger value="comparativo-hh">Comparativo do HH</TabsTrigger>
          <TabsTrigger value="levantamento-hh">Levantamento do HH</TabsTrigger>
          <TabsTrigger value="histograma-preliminar">Histograma Preliminar</TabsTrigger>
        </TabsList>
        <TabsContent value="comparativo-hh">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Comparativo do HH</h2>
            {/* Add your content for Comparativo do HH here */}
          </div>
        </TabsContent>
        <TabsContent value="levantamento-hh">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Levantamento do HH</h2>
            {/* Add your content for Levantamento do HH here */}
          </div>
        </TabsContent>
        <TabsContent value="histograma-preliminar">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Histograma Preliminar</h2>
            {/* Add your content for Histograma Preliminar here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
