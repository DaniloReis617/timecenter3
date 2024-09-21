import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubpageMenu from '@/components/SubpageMenu';

const Scope = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubpageMenuOpen, setIsSubpageMenuOpen] = useState(false);

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

  const subpages = [
    { title: "Gestão das Notas e Ordens", path: "notas-ordens" },
    { title: "Desafio do Escopo", path: "desafio-escopo" },
    { title: "Declaração do Escopo", path: "declaracao-escopo" },
    { title: "Gestão das Alterações do Escopo", path: "alteracoes-escopo" },
  ];

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
      <h1 className="text-3xl font-bold">Escopo</h1>
      {selectedProject ? (
        <p className="text-lg">Exibindo dados para o projeto: {selectedProject.name}</p>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Project Selected</AlertTitle>
          <AlertDescription>Please select a project on the home screen.</AlertDescription>
        </Alert>
      )}
      <Button onClick={() => setIsSubpageMenuOpen(true)}>Select Subpage</Button>
      <SubpageMenu
        isOpen={isSubpageMenuOpen}
        onClose={() => setIsSubpageMenuOpen(false)}
        pages={subpages}
        basePath="/scope"
      />
    </div>
  );
};

export default Scope;
