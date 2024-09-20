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

  const handleEditProject = () => {
    console.log('Edit project clicked');
  };

  const onSubmit = (data) => {
    console.log('New project data:', data);
    toast.success('Projeto adicionado com sucesso!');
    setIsNewProjectDialogOpen(false);
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
    </div>
  );
};

export default ProjectManagement;
