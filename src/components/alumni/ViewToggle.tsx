
import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  viewMode: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === 'grid' ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={viewMode === 'grid' ? "bg-fud-green hover:bg-fud-green-dark" : ""}
      >
        <Grid className="h-4 w-4 mr-1" />
        Grid View
      </Button>
      <Button
        variant={viewMode === 'table' ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange('table')}
        className={viewMode === 'table' ? "bg-fud-green hover:bg-fud-green-dark" : ""}
      >
        <List className="h-4 w-4 mr-1" />
        Table View
      </Button>
    </div>
  );
}
