import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectManagement = ({ projects }) => {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [columnCount, setColumnCount] = useState(1);
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  useEffect(() => {
    const updateColumnCount = () => {
      const height = window.innerHeight;
      if (height < 600) {
        setColumnCount(3);
      } else if (height < 800) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const handleAddProject = () => {
    setIsNewProjectDialogOpen(true);
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project clicked for project ID:', projectId);
    // Implement edit functionality here
  };

  const handleDeleteProject = (projectId) => {
    console.log('Delete project clicked for project ID:', projectId);
    // Implement delete functionality here
  };

  const handleSettingsProject = (projectId) => {
    console.log('Settings clicked for project ID:', projectId);
    // Implement settings functionality here
  };

  const onSubmit = (data) => {
    console.log('New project data:', data);
    toast.success('Projeto adicionado com sucesso!');
    setIsNewProjectDialogOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Gestão de Projetos</CardTitle>
        <Button onClick={handleAddProject} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Novo Projeto
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Início</TableHead>
              <TableHead>Data de Término</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Badge variant={project.status === 'In Progress' ? 'default' : project.status === 'Completed' ? 'success' : 'secondary'}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSettingsProject(project.id)}
                    className="mr-2 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProject(project.id)}
                    className="mr-2 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                    className="hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Projeto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-${columnCount} gap-4`}>
            <div className="space-y-2">
              <Label htmlFor="gid">GID</Label>
              <Input id="gid" {...register("gid", { required: "GID é obrigatório" })} />
              {errors.gid && <span className="text-red-500 text-sm">{errors.gid.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" {...register("description", { required: "Descrição é obrigatória" })} />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status é obrigatório" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" {...register("startDate", { required: "Data de início é obrigatória" })} />
              {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Término</Label>
              <Input id="endDate" type="date" {...register("endDate", { required: "Data de término é obrigatória" })} />
              {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input id="budget" type="number" step="0.01" {...register("budget", { required: "Orçamento é obrigatório" })} />
              {errors.budget && <span className="text-red-500 text-sm">{errors.budget.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contingency">Contingência (%)</Label>
              <Input id="contingency" type="number" step="0.01" {...register("contingency", { required: "Contingência é obrigatória" })} />
              {errors.contingency && <span className="text-red-500 text-sm">{errors.contingency.message}</span>}
            </div>
            <div className="space-y-2 col-span-full">
              <Label htmlFor="information">Informações</Label>
              <Textarea id="information" {...register("information")} />
            </div>
            <Button type="submit" className="col-span-full">Adicionar Projeto</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProjectManagement;
