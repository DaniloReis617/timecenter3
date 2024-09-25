import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trash, Edit, Plus } from "lucide-react";

const ApoioTable = ({ apoios, onEdit, onDelete, onAddNew }) => {
  const [filterText, setFilterText] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredApoios = apoios.filter(apoio => 
    apoio.TX_DESCRICAO.toLowerCase().includes(filterText.toLowerCase())
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
          Novo Cadastro de Apoio
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
            <TableHead className="w-[200px]">Tipo</TableHead>
            <TableHead className="w-[150px] text-right">Valor de Custo</TableHead>
            <TableHead className="w-[150px] text-right">Percentual de Custo</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApoios.map((apoio) => (
            <TableRow key={apoio.ID}>
              <TableCell>{apoio.ID.toString().padStart(6, '0')}</TableCell>
              <TableCell>{apoio.TX_DESCRICAO}</TableCell>
              <TableCell>{apoio.TX_TIPO}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(apoio.VL_VALOR_CUSTO)}
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2 }).format(apoio.VL_PERCENTUAL_CUSTO / 100)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(apoio)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(apoio.ID)}>
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

export default ApoioTable;