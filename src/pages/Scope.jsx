import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MaintenanceNoteForm from '@/components/MaintenanceNoteForm';

const Scope = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaintenanceNoteForm, setShowMaintenanceNoteForm] = useState(false);

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

  const GestaoNotasOrdens = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestão das Notas e Ordens</h2>
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-sm font-medium">Total de Notas</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Total de Ordens</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Total de HH</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Custo Total</h3>
              <p className="text-2xl font-bold">R$ 0,00</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button onClick={() => setShowMaintenanceNoteForm(true)}>Cadastrar Nova Nota de Manutenção</Button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Detalhes das Notas e Ordens</h3>
        <p>Tabela de dados será implementada aqui</p>
      </div>
      {showMaintenanceNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Cadastrar Nova Nota de Manutenção</h2>
            <MaintenanceNoteForm />
            <Button onClick={() => setShowMaintenanceNoteForm(false)} className="mt-4">Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );

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

      <Tabs defaultValue="gestao-notas-ordens">
        <TabsList>
          <TabsTrigger value="gestao-notas-ordens">Gestão das Notas e Ordens</TabsTrigger>
          <TabsTrigger value="desafio-escopo">Desafio do Escopo</TabsTrigger>
          <TabsTrigger value="declaracao-escopo">Declaração do Escopo</TabsTrigger>
          <TabsTrigger value="gestao-alteracoes">Gestão das Alterações do Escopo</TabsTrigger>
        </TabsList>
        <TabsContent value="gestao-notas-ordens">
          <GestaoNotasOrdens />
        </TabsContent>
        <TabsContent value="desafio-escopo">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Desafio do Escopo</h2>
            {/* Add your content for Desafio do Escopo here */}
          </div>
        </TabsContent>
        <TabsContent value="declaracao-escopo">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Declaração do Escopo</h2>
            {/* Add your content for Declaração do Escopo here */}
          </div>
        </TabsContent>
        <TabsContent value="gestao-alteracoes">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Gestão das Alterações do Escopo</h2>
            {/* Add your content for Gestão das Alterações do Escopo here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scope;
