import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaintenanceNoteForm from '@/components/MaintenanceNoteForm';
import MaintenanceNoteTable from '@/components/scope/MaintenanceNoteTable';

const Scope = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaintenanceNoteForm, setShowMaintenanceNoteForm] = useState(false);
  const [maintenanceNotes, setMaintenanceNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [filters, setFilters] = useState({
    nota: '',
    ordem: '',
    tag: '',
    situacao: ''
  });

  useEffect(() => {
    const storedProject = localStorage.getItem('selectedProject');
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
    // Mock data for maintenance notes
    setMaintenanceNotes([
      { id: 1, note: "NM001", order: "ORD001", tag: "TAG001", equipmentFamily: "Pump", requester: "John Doe", totalHH: 10, totalCost: 1000, scopeType: "Preventive", status: "Pending" },
      { id: 2, note: "NM002", order: "ORD002", tag: "TAG002", equipmentFamily: "Valve", requester: "Jane Smith", totalHH: 15, totalCost: 1500, scopeType: "Corrective", status: "Approved" },
    ]);
  }, []);

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowMaintenanceNoteForm(true);
  };

  const handleDelete = (id) => {
    setMaintenanceNotes(maintenanceNotes.filter(note => note.id !== id));
  };

  const handleCloseForm = () => {
    setShowMaintenanceNoteForm(false);
    setEditingNote(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredNotes = maintenanceNotes.filter(note => 
    (filters.nota === '' || note.note.includes(filters.nota)) &&
    (filters.ordem === '' || note.order.includes(filters.ordem)) &&
    (filters.tag === '' || note.tag.includes(filters.tag)) &&
    (filters.situacao === '' || note.status.toLowerCase().includes(filters.situacao.toLowerCase()))
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
        <TabsList className="mb-4">
          <TabsTrigger value="gestao-notas-ordens">Gestão das Notas e Ordens</TabsTrigger>
          <TabsTrigger value="desafio-escopo">Desafio do Escopo</TabsTrigger>
          <TabsTrigger value="declaracao-escopo">Declaração do Escopo</TabsTrigger>
          <TabsTrigger value="gestao-alteracoes">Gestão das Alterações do Escopo</TabsTrigger>
        </TabsList>
        <TabsContent value="gestao-notas-ordens">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Total de Notas</h3>
                    <p className="text-2xl font-bold">{maintenanceNotes.length}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Total de Ordens</h3>
                    <p className="text-2xl font-bold">{maintenanceNotes.length}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Total de HH</h3>
                    <p className="text-2xl font-bold">{maintenanceNotes.reduce((sum, note) => sum + note.totalHH, 0)}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Custo Total</h3>
                    <p className="text-2xl font-bold">R$ {maintenanceNotes.reduce((sum, note) => sum + note.totalCost, 0).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="nota">ID Nota</Label>
                    <Input id="nota" name="nota" value={filters.nota} onChange={handleFilterChange} placeholder="Filtrar por ID da Nota" />
                  </div>
                  <div>
                    <Label htmlFor="ordem">Ordem</Label>
                    <Input id="ordem" name="ordem" value={filters.ordem} onChange={handleFilterChange} placeholder="Filtrar por Ordem" />
                  </div>
                  <div>
                    <Label htmlFor="tag">Tag</Label>
                    <Input id="tag" name="tag" value={filters.tag} onChange={handleFilterChange} placeholder="Filtrar por Tag" />
                  </div>
                  <div>
                    <Label htmlFor="situacao">Situação</Label>
                    <Input id="situacao" name="situacao" value={filters.situacao} onChange={handleFilterChange} placeholder="Filtrar por Situação" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Notas de Manutenção</h2>
              <Button onClick={() => setShowMaintenanceNoteForm(true)}>Cadastrar Nova Nota</Button>
            </div>
            <MaintenanceNoteTable
              notes={filteredNotes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </TabsContent>
        <TabsContent value="desafio-escopo">
          <Card>
            <CardHeader>
              <CardTitle>Desafio do Escopo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conteúdo da aba Desafio do Escopo será implementado aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="declaracao-escopo">
          <Card>
            <CardHeader>
              <CardTitle>Declaração do Escopo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conteúdo da aba Declaração do Escopo será implementado aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gestao-alteracoes">
          <Card>
            <CardHeader>
              <CardTitle>Gestão das Alterações do Escopo</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Conteúdo da aba Gestão das Alterações do Escopo será implementado aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={showMaintenanceNoteForm} onOpenChange={setShowMaintenanceNoteForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? 'Editar Nota de Manutenção' : 'Cadastrar Nova Nota de Manutenção'}
            </DialogTitle>
          </DialogHeader>
          <MaintenanceNoteForm initialData={editingNote} onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scope;
