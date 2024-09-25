import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trash, Edit } from "lucide-react";

const AreaTable = ({ areas, onEdit, onDelete }) => {
  const [filterText, setFilterText] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredAreas = areas.filter(area => 
    area.TX_DESCRICAO.toLowerCase().includes(filterText.toLowerCase())
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
      <Input
        placeholder="Filtrar por descrição"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="max-w-sm"
      />
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
            <TableHead className="w-[200px] text-right">Quantidade de Dias de Execução</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAreas.map((area) => (
            <TableRow key={area.ID}>
              <TableCell>{area.ID.toString().padStart(6, '0')}</TableCell>
              <TableCell>{area.TX_DESCRICAO}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(area.VL_QUANTIDADE_DIAS_EXECUCAO)}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(area)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(area.ID)}>
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

export default AreaTable;