import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Plus, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProjectConfigForm from './ProjectConfigForm';

const ProjectManagement = ({ projects }) => {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    setIsNewProjectDialogOpen(true);
  };

  const handleEditProject = (projectId) => {
    console.log('Edit project clicked for project ID:', projectId);
  };

  const handleDeleteProject = (projectId) => {
    console.log('Delete project clicked for project ID:', projectId);
  };

  const handleSettingsProject = (project) => {
    setSelectedProject(project);
    setShowConfigForm(true);
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
                    onClick={() => handleSettingsProject(project)}
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

      {showConfigForm && (
        <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Configuração do Projeto</DialogTitle>
            </DialogHeader>
            <ProjectConfigForm project={selectedProject} onClose={() => setShowConfigForm(false)} />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default ProjectManagement;
