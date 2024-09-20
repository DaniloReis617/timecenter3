import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects, getUsers } from '@/utils/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserDashboard from '@/components/admin/UserDashboard';
import ProjectsPerUser from '@/components/admin/ProjectsPerUser';
import ProjectManagement from '@/components/admin/ProjectManagement';

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

  if (usersLoading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (usersError || projectsError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tela de Administração</h1>
      <Tabs defaultValue="user-dashboard">
        <TabsList>
          <TabsTrigger value="user-dashboard">Dashboards de Usuários</TabsTrigger>
          <TabsTrigger value="projects-per-user">Projetos por Usuário</TabsTrigger>
          <TabsTrigger value="project-management">Gestão de Projetos</TabsTrigger>
        </TabsList>
        <TabsContent value="user-dashboard">
          <UserDashboard users={users} />
        </TabsContent>
        <TabsContent value="projects-per-user">
          <ProjectsPerUser users={users} projects={projects} />
        </TabsContent>
        <TabsContent value="project-management">
          <ProjectManagement projects={projects} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
