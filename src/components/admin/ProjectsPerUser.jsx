import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const ProjectsPerUser = ({ users, projects }) => {
  const [selectedUser, setSelectedUser] = useState('all');
  const [showAddUserProjectForm, setShowAddUserProjectForm] = useState(false);
  const [formData, setFormData] = useState({
    CD_USUARIO: '',
    CD_PROJETO: ''
  });

  const handleAddUserProject = () => {
    setShowAddUserProjectForm(true);
  };

  const handleDeleteUserProject = (projectId) => {
    console.log('Delete user project clicked for project ID:', projectId);
    // Implement delete functionality here
    toast.success('User removed from project successfully');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('User added to project successfully!');
    setShowAddUserProjectForm(false);
    setFormData({ CD_USUARIO: '', CD_PROJETO: '' });
  };

  const filteredProjects = selectedUser === 'all'
    ? projects
    : projects.filter(project => project.users && project.users.includes(selectedUser));

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Gestão de Usuários por Projetos</CardTitle>
        <Button onClick={handleAddUserProject} className="bg-green-500 hover:bg-green-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Usuário ao Projeto
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Selecione um usuário" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os usuários</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.username}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Descrição do Projeto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>
                  <Badge variant={project.status === 'Active' ? 'success' : 'secondary'}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUserProject(project.id)}
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

      <Dialog open={showAddUserProjectForm} onOpenChange={setShowAddUserProjectForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Usuário ao Projeto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="CD_USUARIO">Usuário</Label>
              <Select onValueChange={(value) => handleSelectChange('CD_USUARIO', value)} value={formData.CD_USUARIO}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="CD_PROJETO">Projeto</Label>
              <Select onValueChange={(value) => handleSelectChange('CD_PROJETO', value)} value={formData.CD_PROJETO}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Adicionar Usuário ao Projeto
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProjectsPerUser;
