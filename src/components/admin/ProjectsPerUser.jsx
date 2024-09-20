import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectsPerUser = ({ users, projects }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleAddUserProject = () => {
    console.log('Add user to project clicked');
  };

  const handleEditUserProject = () => {
    console.log('Edit user project clicked');
  };

  const filteredProjects = selectedUser
    ? projects.filter(project => project.users.includes(selectedUser))
    : projects;

  return (
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
          <SelectItem value="all">Todos os usuários</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.username}>
              {user.username}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição do Projeto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsPerUser;