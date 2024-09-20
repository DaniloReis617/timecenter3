import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const ProjectManagement = ({ projects }) => {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    gid: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    budget: '',
    contingency: '',
    information: ''
  });

  const handleAddProject = () => {
    setIsNewProjectDialogOpen(true);
  };

  const handleEditProject = () => {
    console.log('Edit project clicked');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setNewProject(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New project data:', newProject);
    // Here you would typically make an API call to save the new project
    toast.success('Projeto adicionado com sucesso!');
    setIsNewProjectDialogOpen(false);
    setNewProject({
      gid: '',
      description: '',
      status: '',
      startDate: '',
      endDate: '',
      budget: '',
      contingency: '',
      information: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Projetos</h2>
        <div className="space-x-2">
          <Button onClick={handleAddProject}>➕ Novo</Button>
          <Button onClick={handleEditProject}>✏️ Editar</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Início</TableHead>
            <TableHead>Data de Término</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Projeto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gid">GID</Label>
              <Input id="gid" name="gid" value={newProject.gid} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" name="description" value={newProject.description} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={handleStatusChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" name="startDate" type="date" value={newProject.startDate} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <Input id="endDate" name="endDate" type="date" value={newProject.endDate} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input id="budget" name="budget" type="number" step="0.01" value={newProject.budget} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contingency">Contingência (%)</Label>
              <Input id="contingency" name="contingency" type="number" step="0.01" value={newProject.contingency} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="information">Informações</Label>
              <Textarea id="information" name="information" value={newProject.information} onChange={handleInputChange} />
            </div>
            <Button type="submit">Adicionar Projeto</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;
