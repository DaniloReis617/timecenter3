import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InfoIcon, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MaintenanceNoteForm from '@/components/MaintenanceNoteForm';
import MaintenanceNoteTable from '@/components/scope/MaintenanceNoteTable';

const Scope = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaintenanceNoteForm, setShowMaintenanceNoteForm] = useState(false);
  const [maintenanceNotes, setMaintenanceNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const storedProject = localStorage.getItem('selectedProject');
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
    // Mock data for maintenance notes
    setMaintenanceNotes([
      { id: 1, note: "NM001", order: "ORD001", tag: "TAG001", equipmentFamily: "Pump", requester: "John Doe", totalHH: 10, totalCost: 1000, scopeType: "Preventive", status: "Pending" },
      { id: 2, note: "NM002", order: "ORD002", tag: "TAG002", equipmentFamily: "Valve", requester: "Jane Smith", totalHH: 15, totalCost: 1500, scopeType: "Corrective", status: "Approved" },
      { id: 3, note: "NM003", order: "ORD003", tag: "TAG003", equipmentFamily: "Motor", requester: "Bob Johnson", totalHH: 8, totalCost: 800, scopeType: "Preventive", status: "Completed" },
      { id: 4, note: "NM004", order: "ORD004", tag: "TAG004", equipmentFamily: "Sensor", requester: "Alice Brown", totalHH: 5, totalCost: 500, scopeType: "Corrective", status: "Pending" },
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

  const filteredNotes = maintenanceNotes.filter(note => 
    note.note.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || note.status === statusFilter)
  );

  const totalHH = filteredNotes.reduce((sum, note) => sum + note.totalHH, 0);
  const totalCost = filteredNotes.reduce((sum, note) => sum + note.totalCost, 0);

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
        <TabsList>
          <TabsTrigger value="gestao-notas-ordens">Gestão das Notas e Ordens</TabsTrigger>
          <TabsTrigger value="desafio-escopo">Desafio do Escopo</TabsTrigger>
          <TabsTrigger value="declaracao-escopo">Declaração do Escopo</TabsTrigger>
          <TabsTrigger value="gestao-alteracoes">Gestão das Alterações do Escopo</TabsTrigger>
        </TabsList>
        <TabsContent value="gestao-notas-ordens">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestão das Notas e Ordens</h2>
              <Button onClick={() => setShowMaintenanceNoteForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nova Nota de Manutenção
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Notas</CardTitle>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredNotes.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de HH</CardTitle>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalHH}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {totalCost.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredNotes.filter(note => note.status === 'Pending').length} Pendentes
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Pesquisar notas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="Pending">Pendente</SelectItem>
                  <SelectItem value="Approved">Aprovado</SelectItem>
                  <SelectItem value="Completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <MaintenanceNoteTable
              notes={filteredNotes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
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
      {showMaintenanceNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingNote ? 'Editar Nota de Manutenção' : 'Cadastrar Nova Nota de Manutenção'}
            </h2>
            <MaintenanceNoteForm initialData={editingNote} />
            <Button onClick={handleCloseForm} className="mt-4">Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scope;
