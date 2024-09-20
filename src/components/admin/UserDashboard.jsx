import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UserDashboard = ({ users }) => {
  const handleAddUser = () => {
    console.log('Add user clicked');
  };

  const handleEditUser = () => {
    console.log('Edit user clicked');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard de Usuários</h2>
        <div className="space-x-2">
          <Button onClick={handleAddUser}>➕👤 Novo</Button>
          <Button onClick={handleEditUser}>✏️👤 Editar</Button>
        </div>
      </div>
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
    </div>
  );
};

export default UserDashboard;