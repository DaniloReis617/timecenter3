import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects, getUsers } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState('');

  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  const handleAddUser = () => {
    // Implement add user functionality
    console.log('Add user clicked');
  };

  const handleEditUser = () => {
    // Implement edit user functionality
    console.log('Edit user clicked');
  };

  const handleAddUserProject = () => {
    // Implement add user to project functionality
    console.log('Add user to project clicked');
  };

  const handleEditUserProject = () => {
    // Implement edit user project functionality
    console.log('Edit user project clicked');
  };

  const handleAddProject = () => {
    // Implement add project functionality
    console.log('Add project clicked');
  };

  const handleEditProject = () => {
    // Implement edit project functionality
    console.log('Edit project clicked');
  };

  const renderUserDashboard = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard de Usuários</h2>
        <div className="space-x-2">
          <Button onClick={handleAddUser}>➕👤 Novo</Button>
          <Button onClick={handleEditUser}>✏️👤 Editar</Button>
        </div>
      </div>
      {usersLoading ? (
        <p>Carregando usuários...</p>
      ) : usersError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Falha ao carregar usuários.</AlertDescription>
        </Alert>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nível</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderProjectsPerUser = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários por Projetos</h2>
        <div className="space-x-2">
          <Button onClick={handleAddUserProject}>➕👤 Novo</Button>
          <Button onClick={handleEditUserProject}>✏️👤 Editar</Button>
        </div>
      </div>
      <Select value={selectedUser} onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um usuário" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos os usuários</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.username}>
              {user.username}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {projectsLoading ? (
        <p>Carregando projetos...</p>
      ) : projectsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Falha ao carregar projetos.</AlertDescription>
        </Alert>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição do Projeto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );

  const renderProjectManagement = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Projetos</h2>
        <div className="space-x-2">
          <Button onClick={handleAddProject}>➕👤 Novo</Button>
          <Button onClick={handleEditProject}>✏️👤 Editar</Button>
        </div>
      </div>
      {projectsLoading ? (
        <p>Carregando projetos...</p>
      ) : projectsError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Falha ao carregar projetos.</AlertDescription>
        </Alert>
      ) : (
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
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tela de Administração</h1>
      <Tabs defaultValue="user-dashboard">
        <TabsList>
          <TabsTrigger value="user-dashboard">Dashboards de Usuários</TabsTrigger>
          <TabsTrigger value="projects-per-user">Projetos por Usuário</TabsTrigger>
          <TabsTrigger value="project-management">Gestão de Projetos</TabsTrigger>
        </TabsList>
        <TabsContent value="user-dashboard">{renderUserDashboard()}</TabsContent>
        <TabsContent value="projects-per-user">{renderProjectsPerUser()}</TabsContent>
        <TabsContent value="project-management">{renderProjectManagement()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
