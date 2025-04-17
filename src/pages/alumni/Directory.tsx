
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AlumniFilter } from '@/components/alumni/AlumniFilter';
import { SearchBar } from '@/components/alumni/SearchBar';
import { ViewToggle } from '@/components/alumni/ViewToggle';
import { AlumniGridView } from '@/components/alumni/AlumniGridView';
import { AlumniTableView } from '@/components/alumni/AlumniTableView';
import { EventsLinkSection } from '@/components/alumni/EventsLinkSection';

const AlumniDirectory = () => {
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    faculty: null,
    department: null,
    graduationYear: null
  });

  // Fetch alumni data from Supabase
  useEffect(() => {
    fetchAlumniData();
  }, []);

  const fetchAlumniData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('last_name', { ascending: true });
        
      if (error) throw error;
      
      setAlumni(data || []);
    } catch (error) {
      console.error('Error fetching alumni data:', error);
      toast.error('Failed to load alumni directory');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleViewChange = (view: 'grid' | 'table') => {
    setViewMode(view);
  };

  // Filter alumni based on search and filters
  const filteredAlumni = alumni.filter(alumnus => {
    const fullName = `${alumnus.first_name || ''} ${alumnus.last_name || ''}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
                        fullName.includes(searchLower) || 
                        (alumnus.email && alumnus.email.toLowerCase().includes(searchLower));
    
    // Filter by faculty
    const matchesFaculty = !filters.faculty || 
                          alumnus.faculty === filters.faculty;
    
    // Filter by department
    const matchesDepartment = !filters.department || 
                            alumnus.department === filters.department;
    
    // Filter by graduation year
    const matchesYear = !filters.graduationYear || 
                      (alumnus.graduation_year && alumnus.graduation_year.toString() === filters.graduationYear);
    
    return matchesSearch && matchesFaculty && matchesDepartment && matchesYear;
  });

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Alumni Directory</h1>
        
        <AlumniFilter onFilterChange={handleFilterChange} />
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={handleSearchChange} 
            />
            
            <ViewToggle 
              viewMode={viewMode} 
              onViewChange={handleViewChange} 
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-fud-green" />
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <AlumniGridView alumni={filteredAlumni} />
            ) : (
              <AlumniTableView alumni={filteredAlumni} />
            )}
            
            <EventsLinkSection />
          </>
        )}
      </div>
    </Layout>
  );
};

export default AlumniDirectory;
