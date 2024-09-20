import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Stakeholders = () => {
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
      <h1 className="text-3xl font-bold">Stakeholders Management</h1>

      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="stakeholders">
        <TabsList>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="other">Conteúdo de outra tela</TabsTrigger>
        </TabsList>
        <TabsContent value="stakeholders">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da tela de Stakeholders</h2>
            {/* Add your stakeholders content here */}
          </div>
        </TabsContent>
        <TabsContent value="other">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo de outra tela de Stakeholders</h2>
            {/* Add your other content here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stakeholders;
