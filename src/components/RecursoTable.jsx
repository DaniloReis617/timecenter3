import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

const RecursoTable = ({ recursos, onEdit, onDelete, onAddNew }) => {
  const [filterText, setFilterText] = useState('');

  const filteredRecursos = recursos.filter(recurso => 
    recurso.TX_DESCRICAO.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filtrar por descrição"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={onAddNew} className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" />
          Novo Recurso
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Valor de Custo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecursos.map((recurso) => (
            <TableRow key={recurso.ID}>
              <TableCell className="font-medium">{recurso.ID.toString().padStart(6, '0')}</TableCell>
              <TableCell>{recurso.TX_DESCRICAO}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(recurso.VL_VALOR_CUSTO)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(recurso)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(recurso.ID)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecursoTable;