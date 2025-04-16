
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AlumniDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedFaculty, setSelectedFaculty] = useState('All Faculties');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);
  const [departments, setDepartments] = useState(['All Departments']);
  const [faculties, setFaculties] = useState(['All Faculties']);
  const [graduationYears, setGraduationYears] = useState(['All Years']);

  // Fetch alumni data from Supabase
  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('last_name', { ascending: true });
          
        if (error) throw error;
        
        setAlumni(data || []);
        
        // Extract unique departments, faculties, and graduation years for filters
        if (data && data.length > 0) {
          const uniqueDepartments = ['All Departments', ...new Set(data.map(a => a.department).filter(Boolean))];
          const uniqueFaculties = ['All Faculties', ...new Set(data.map(a => a.faculty).filter(Boolean))];
          const uniqueYears = ['All Years', ...new Set(data.map(a => a.graduation_year).filter(Boolean).map(String))];
          
          setDepartments(uniqueDepartments);
          setFaculties(uniqueFaculties);
          setGraduationYears(uniqueYears);
        }
      } catch (error) {
        console.error('Error fetching alumni data:', error);
        toast.error('Failed to load alumni directory');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlumniData();
  }, []);

  // Filter alumni based on search and filters
  const filteredAlumni = alumni.filter(alumnus => {
    const fullName = `${alumnus.first_name} ${alumnus.last_name}`.toLowerCase();
    const email = alumnus.email?.toLowerCase() || '';
    
    // Filter by search query
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                         email.includes(searchQuery.toLowerCase());
    
    // Filter by department
    const matchesDepartment = selectedDepartment === 'All Departments' || 
                             alumnus.department === selectedDepartment;
    
    // Filter by faculty
    const matchesFaculty = selectedFaculty === 'All Faculties' || 
                          alumnus.faculty === selectedFaculty;
    
    // Filter by graduation year
    const matchesYear = selectedYear === 'All Years' || 
                       (alumnus.graduation_year && alumnus.graduation_year.toString() === selectedYear);
    
    return matchesSearch && matchesDepartment && matchesFaculty && matchesYear;
  });

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Alumni Directory</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept, index) => (
                    <SelectItem key={index} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty, index) => (
                    <SelectItem key={index} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Graduation Year" />
                </SelectTrigger>
                <SelectContent>
                  {graduationYears.map((year, index) => (
                    <SelectItem key={index} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button className="bg-fud-green hover:bg-fud-green-dark">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-fud-green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.length > 0 ? (
              filteredAlumni.map(alumnus => (
                <Card key={alumnus.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Avatar className="w-16 h-16 rounded-full object-cover">
                        <AvatarImage src={alumnus.profile_image_url} alt={`${alumnus.first_name} ${alumnus.last_name}`} />
                        <AvatarFallback>{alumnus.first_name?.[0]}{alumnus.last_name?.[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg">{alumnus.first_name} {alumnus.last_name}</h3>
                      <p className="text-sm text-gray-600">
                        {alumnus.department}, {alumnus.graduation_year || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Faculty of {alumnus.faculty || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {alumnus.state || 'N/A'}
                      </p>
                      <div className="mt-2">
                        <a 
                          href={`mailto:${alumnus.email}`} 
                          className="text-sm text-fud-green hover:underline"
                        >
                          {alumnus.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No alumni found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlumniDirectory;
