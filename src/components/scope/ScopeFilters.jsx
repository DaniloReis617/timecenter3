import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

const ScopeFilters = ({ filters, onFilterChange }) => {
  const filterOptions = {
    nota: ['NM001', 'NM002', 'NM003'],
    ordem: ['ORD001', 'ORD002', 'ORD003'],
    tag: ['TAG001', 'TAG002', 'TAG003'],
    situacao: ['Pending', 'Approved', 'Rejected']
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <Label htmlFor={key} className="mb-2 block">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Select onValueChange={(value) => onFilterChange(key, value)} value={filters[key]}>
                <SelectTrigger id={key}>
                  <SelectValue placeholder={`Filtrar por ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScopeFilters;