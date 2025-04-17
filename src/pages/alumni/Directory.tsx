
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlumniCard } from '@/components/alumni/AlumniCard';
import { AlumniFilter } from '@/components/alumni/AlumniFilter';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <div className="flex-1 relative">
              <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                startIcon={<Search className="h-4 w-4" />}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? "bg-fud-green hover:bg-fud-green-dark" : ""}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid View
              </Button>
              <Button
                variant={viewMode === 'table' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('table')}
                className={viewMode === 'table' ? "bg-fud-green hover:bg-fud-green-dark" : ""}
              >
                <List className="h-4 w-4 mr-1" />
                Table View
              </Button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-fud-green" />
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map(alumnus => (
                    <AlumniCard
                      key={alumnus.id}
                      id={alumnus.id}
                      firstName={alumnus.first_name || ''}
                      lastName={alumnus.last_name || ''}
                      imageUrl={alumnus.profile_image_url}
                      graduationYear={alumnus.graduation_year || 'N/A'}
                      department={alumnus.department || 'N/A'}
                      faculty={alumnus.faculty || 'N/A'}
                      location={alumnus.state || ''}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">No alumni found matching your criteria.</p>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Graduation Year</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlumni.length > 0 ? (
                      filteredAlumni.map(alumnus => (
                        <TableRow key={alumnus.id}>
                          <TableCell className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={alumnus.profile_image_url} />
                              <AvatarFallback>{alumnus.first_name?.[0]}{alumnus.last_name?.[0]}</AvatarFallback>
                            </Avatar>
                            <span>{alumnus.first_name} {alumnus.last_name}</span>
                          </TableCell>
                          <TableCell>{alumnus.graduation_year || 'N/A'}</TableCell>
                          <TableCell>{alumnus.department || 'N/A'}</TableCell>
                          <TableCell>{alumnus.faculty || 'N/A'}</TableCell>
                          <TableCell>{alumnus.state || 'N/A'}</TableCell>
                          <TableCell>
                            <a href={`mailto:${alumnus.email}`} className="text-fud-green hover:underline">
                              {alumnus.email}
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No alumni found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            )}
            
            <div className="mt-6 border-t pt-4 text-center">
              <p className="text-gray-600 mb-2">Connect with your fellow alumni at our events</p>
              <Button asChild variant="outline" className="hover:bg-fud-green hover:text-white">
                <Link to="/events">View Alumni Events</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AlumniDirectory;
