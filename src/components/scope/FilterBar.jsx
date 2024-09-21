import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FilterBar = ({ filters, onFilterChange, notes = [] }) => {
  const getUniqueOptions = (field) => {
    if (!Array.isArray(notes)) return ['all'];
    return ['all', ...new Set(notes.map(note => note[field] || '').filter(Boolean))];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div>
        <Label htmlFor="nota-filter">ID Nota Manutenção</Label>
        <Select
          id="nota-filter"
          value={filters.nota}
          onValueChange={(value) => onFilterChange('nota', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {getUniqueOptions('id_nota_manutencao').map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="ordem-filter">Ordem</Label>
        <Select
          id="ordem-filter"
          value={filters.ordem}
          onValueChange={(value) => onFilterChange('ordem', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {getUniqueOptions('tx_ordem').map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tag-filter">Tag</Label>
        <Select
          id="tag-filter"
          value={filters.tag}
          onValueChange={(value) => onFilterChange('tag', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {getUniqueOptions('tx_tag').map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="situacao-filter">Situação</Label>
        <Select
          id="situacao-filter"
          value={filters.situacao}
          onValueChange={(value) => onFilterChange('situacao', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {getUniqueOptions('tx_situacao').map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
