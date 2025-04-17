
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex-1 relative">
      <Input
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
        startIcon={<Search className="h-4 w-4" />}
      />
    </div>
  );
}
