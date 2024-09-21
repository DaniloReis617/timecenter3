import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const UserDashboard = ({ users }) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    GID: '',
    TX_LOGIN: '',
    NR_NIVEL: '',
    FL_STATUS: ''
  });

  const handleAddUser = () => {
    setFormData({
      GID: '',
      TX_LOGIN: '',
      NR_NIVEL: '',
      FL_STATUS: ''
    });
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      GID: user.id,
      TX_LOGIN: user.username,
      NR_NIVEL: user.role === 'Manager' ? '1' : '2',
      FL_STATUS: user.status === 'Active' ? 'A' : 'I'
    });
    setShowEditForm(true);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user clicked for user ID:', userId);
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
    toast.success('Usuário adicionado com sucesso!');
    setShowUserForm(false);
    setShowEditForm(false);
    setFormData({
      GID: '',
      TX_LOGIN: '',
      NR_NIVEL: '',
      FL_STATUS: ''
    });
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="GID">GID</Label>
        <Input
          id="GID"
          name="GID"
          value={formData.GID}
          onChange={handleInputChange}
          required
          readOnly={showEditForm}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="TX_LOGIN">Login</Label>
        <Input
          id="TX_LOGIN"
          name="TX_LOGIN"
          value={formData.TX_LOGIN}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="NR_NIVEL">Nível Permissão</Label>
        <Select
          onValueChange={(value) => handleSelectChange('NR_NIVEL', value)}
          value={formData.NR_NIVEL}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Nível 1</SelectItem>
            <SelectItem value="2">Nível 2</SelectItem>
            <SelectItem value="3">Nível 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="FL_STATUS">Status</Label>
        <Select
          onValueChange={(value) => handleSelectChange('FL_STATUS', value)}
          value={formData.FL_STATUS}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A">Ativo</SelectItem>
            <SelectItem value="I">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        {showEditForm ? 'Atualizar Usuário' : 'Adicionar Usuário'}
      </Button>
    </form>
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Dashboard de Usuários</CardTitle>
        <Button onClick={handleAddUser} className="bg-green-500 hover:bg-green-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditUser(user)}
                    className="mr-2 hover:bg-blue-100"
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.id)}
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

      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserDashboard;
