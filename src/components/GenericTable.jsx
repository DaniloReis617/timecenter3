import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Trash, Edit, Plus } from "lucide-react";

const GenericTable = ({ items, onEdit, onDelete, onAddNew, filterKey }) => {
  const [filterText, setFilterText] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const filteredItems = items.filter(item => 
    item[filterKey].toLowerCase().includes(filterText.toLowerCase())
  ).sort((a, b) => {
    if (sortAscending) {
      return a[filterKey].localeCompare(b[filterKey]);
    } else {
      return b[filterKey].localeCompare(a[filterKey]);
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
          Novo Cadastro
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
          {filteredItems.map((item) => (
            <TableRow key={item.ID}>
              <TableCell>{item.ID.toString().padStart(6, '0')}</TableCell>
              <TableCell>{item[filterKey]}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(item.ID)}>
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

export default GenericTable;
