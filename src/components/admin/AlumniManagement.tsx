import React, { useState, useEffect } from 'react';
import { Users, Trash2, UserX, Search } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AlumniManagement = () => {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState<any[]>([]);
  
  useEffect(() => {
    fetchAlumni();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAlumni(alumni);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = alumni.filter(alum => {
      return (
        alum.first_name?.toLowerCase().includes(query) ||
        alum.last_name?.toLowerCase().includes(query) ||
        alum.department?.toLowerCase().includes(query) ||
        alum.faculty?.toLowerCase().includes(query)
      );
    });
    
    setFilteredAlumni(filtered);
  }, [searchQuery, alumni]);
  
  const fetchAlumni = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('first_name', { ascending: true });
        
      if (error) throw error;
      setAlumni(data || []);
      setFilteredAlumni(data || []);
    } catch (error: any) {
      console.error('Error fetching alumni:', error);
      toast.error('Failed to load alumni data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this alumni profile? This cannot be undone.')) return;
    
    setIsLoading(true);
    try {
      // First delete the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (profileError) throw profileError;
      
      // Then delete the user in auth
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      
      if (authError) {
        toast.error('User profile deleted but account remains. Contact administrator.');
        console.error('Error deleting user account:', authError);
      } else {
        toast.success('Alumni deleted successfully');
      }
      
      fetchAlumni();
    } catch (error: any) {
      console.error('Error deleting alumni:', error);
      toast.error('Failed to delete alumni: ' + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Alumni Management</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alumni..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Graduation Year</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Loading alumni data...
                </TableCell>
              </TableRow>
            ) : filteredAlumni.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No alumni found
                </TableCell>
              </TableRow>
            ) : (
              filteredAlumni.map(alum => (
                <TableRow key={alum.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {alum.profile_image_url ? (
                          <img src={alum.profile_image_url} alt={`${alum.first_name} ${alum.last_name}`} className="w-full h-full object-cover" />
                        ) : (
                          <Users className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                      <span>{alum.first_name} {alum.last_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{alum.department || '-'}</TableCell>
                  <TableCell>{alum.faculty || '-'}</TableCell>
                  <TableCell>{alum.graduation_year || '-'}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(alum.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AlumniManagement;
