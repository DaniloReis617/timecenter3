import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MaintenanceNoteTable = ({ notes, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-[100px] font-semibold">ID</TableHead>
          <TableHead className="font-semibold">Nota</TableHead>
          <TableHead className="font-semibold">Ordem</TableHead>
          <TableHead className="font-semibold">Tag</TableHead>
          <TableHead className="font-semibold">Família de Equipamentos</TableHead>
          <TableHead className="font-semibold">Solicitante</TableHead>
          <TableHead className="font-semibold text-right">HH Total</TableHead>
          <TableHead className="font-semibold text-right">Custo Total</TableHead>
          <TableHead className="font-semibold">Tipo de Escopo</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="text-right font-semibold">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id} className="hover:bg-gray-50 transition-colors">
            <TableCell className="font-medium">{note.id.toString().padStart(6, '0')}</TableCell>
            <TableCell>{note.note}</TableCell>
            <TableCell>{note.order}</TableCell>
            <TableCell>{note.tag}</TableCell>
            <TableCell>{note.equipmentFamily}</TableCell>
            <TableCell>{note.requester}</TableCell>
            <TableCell className="text-right">{note.totalHH}</TableCell>
            <TableCell className="text-right">R$ {note.totalCost.toFixed(2)}</TableCell>
            <TableCell>{note.scopeType}</TableCell>
            <TableCell>
              <Badge variant={
                note.status === 'Approved' ? 'success' :
                note.status === 'Pending' ? 'warning' :
                'destructive'
              }>
                {note.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(note)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Note</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Note</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default MaintenanceNoteTable;
