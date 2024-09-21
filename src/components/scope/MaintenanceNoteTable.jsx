import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

const MaintenanceNoteTable = ({ notes, onEdit, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Nota</TableHead>
        <TableHead>Ordem</TableHead>
        <TableHead>Tag</TableHead>
        <TableHead>Família de Equipamentos</TableHead>
        <TableHead>Solicitante</TableHead>
        <TableHead>HH Total</TableHead>
        <TableHead>Custo Total</TableHead>
        <TableHead>Tipo de Escopo</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {notes.map((note) => (
        <TableRow key={note.id}>
          <TableCell className="font-medium">{note.id.toString().padStart(6, '0')}</TableCell>
          <TableCell>{note.note}</TableCell>
          <TableCell>{note.order}</TableCell>
          <TableCell>{note.tag}</TableCell>
          <TableCell>{note.equipmentFamily}</TableCell>
          <TableCell>{note.requester}</TableCell>
          <TableCell>{note.totalHH}</TableCell>
          <TableCell>{note.totalCost ? `R$ ${note.totalCost.toFixed(2)}` : 'N/A'}</TableCell>
          <TableCell>{note.scopeType}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              note.status === 'Approved' ? 'bg-green-100 text-green-800' :
              note.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {note.status}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(note)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default MaintenanceNoteTable;
