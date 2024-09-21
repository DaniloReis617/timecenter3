import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects, getMaintenanceNotes } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InfoIcon, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaintenanceNoteForm from '@/components/MaintenanceNoteForm';
import MaintenanceNoteTable from '@/components/scope/MaintenanceNoteTable';
import FilterBar from '@/components/scope/FilterBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Scope = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMaintenanceNoteForm, setShowMaintenanceNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    nota: 'all',
    ordem: 'all',
    tag: 'all',
    situacao: 'all',
  });

  useEffect(() => {
    const storedProject = localStorage.getItem('selectedProject');
    if (storedProject) {
      setSelectedProject(JSON.parse(storedProject));
    }
  }, []);

  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const { data: maintenanceNotes, isLoading: notesLoading, error: notesError } = useQuery({
    queryKey: ['maintenanceNotes', selectedProject?.id],
    queryFn: () => getMaintenanceNotes(selectedProject?.id),
    enabled: !!selectedProject,
  });

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowMaintenanceNoteForm(true);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete note with id:', id);
  };

  const handleCloseForm = () => {
    setShowMaintenanceNoteForm(false);
    setEditingNote(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredNotes = maintenanceNotes?.filter(note =>
    (filters.nota === 'all' || note.id_nota_manutencao === filters.nota) &&
    (filters.ordem === 'all' || note.tx_ordem === filters.ordem) &&
    (filters.tag === 'all' || note.tx_tag === filters.tag) &&
    (filters.situacao === 'all' || note.tx_situacao === filters.situacao) &&
    Object.values(note).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const isLoading = projectsLoading || notesLoading;
  const error = projectsError || notesError;

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  const totalNotes = filteredNotes.length;
  const totalOrders = new Set(filteredNotes.map(note => note.tx_ordem)).size;
  const totalHH = filteredNotes.reduce((sum, note) => sum + (note.vl_hh_total || 0), 0);
  const totalCost = filteredNotes.reduce((sum, note) => sum + (note.vl_custo_total || 0), 0);

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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Gestão das Notas e Ordens</CardTitle>
                <Button onClick={() => setShowMaintenanceNoteForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Nova Nota de Manutenção
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScopeMetrics
                totalNotes={totalNotes}
                totalOrders={totalOrders}
                totalHH={totalHH}
                totalCost={totalCost}
              />
              <FilterBar filters={filters} onFilterChange={handleFilterChange} notes={maintenanceNotes} />
              <div className="mb-4">
                <Input
                  placeholder="Pesquisar notas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
              <MaintenanceNoteTable
                notes={filteredNotes}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="desafio-escopo">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Desafio do Escopo</h2>
              {/* Add your content for Desafio do Escopo here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="declaracao-escopo">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Declaração do Escopo</h2>
              {/* Add your content for Declaração do Escopo here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gestao-alteracoes">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Conteúdo da aba Gestão das Alterações do Escopo</h2>
              {/* Add your content for Gestão das Alterações do Escopo here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={showMaintenanceNoteForm} onOpenChange={setShowMaintenanceNoteForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingNote ? 'Editar Nota de Manutenção' : 'Nova Nota de Manutenção'}</DialogTitle>
          </DialogHeader>
          <MaintenanceNoteForm
            initialData={editingNote}
            onClose={handleCloseForm}
            onSubmit={() => {
              // Handle form submission
              handleCloseForm();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ScopeMetrics = ({ totalNotes, totalOrders, totalHH, totalCost }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <MetricCard title="Total de Notas" value={totalNotes} />
    <MetricCard title="Total de Ordens" value={totalOrders} />
    <MetricCard title="Total de HH" value={totalHH.toFixed(2)} />
    <MetricCard title="Custo Total" value={`R$ ${totalCost.toFixed(2)}`} />
  </div>
);

const MetricCard = ({ title, value }) => (
  <Card>
    <CardHeader className="p-4">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default Scope;
