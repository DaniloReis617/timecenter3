import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trash, Edit, Plus } from "lucide-react";

const EscopoOrigemTable = ({ escopoOrigens, onEdit, onDelete, onAddNew }) => {
  const [filterText, setFilterText] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredEscopoOrigens = escopoOrigens.filter(escopo => 
    escopo.TX_DESCRICAO.toLowerCase().includes(filterText.toLowerCase())
  ).sort((a, b) => {
    if (sortAscending) {
      return a.TX_DESCRICAO.localeCompare(b.TX_DESCRICAO);
    } else {
      return b.TX_DESCRICAO.localeCompare(a.TX_DESCRICAO);
    }
  });

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

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
          Novo Cadastro de Escopo Origem
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[300px]">
              <div className="flex items-center cursor-pointer" onClick={toggleSort}>
                Descrição
                {sortAscending ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEscopoOrigens.map((escopo) => (
            <TableRow key={escopo.ID}>
              <TableCell>{escopo.ID.toString().padStart(6, '0')}</TableCell>
              <TableCell>{escopo.TX_DESCRICAO}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(escopo)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(escopo.ID)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EscopoOrigemTable;