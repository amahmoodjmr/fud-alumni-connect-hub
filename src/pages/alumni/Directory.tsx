
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Sample data for alumni
const alumniData = [
  {
    id: 1,
    name: 'Amina Ibrahim',
    department: 'Computer Science',
    graduationYear: 2020,
    faculty: 'Science',
    location: 'Kano',
    email: 'amina.ibrahim@example.com',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    name: 'Mohammed Ali',
    department: 'Economics',
    graduationYear: 2019,
    faculty: 'Social Sciences',
    location: 'Abuja',
    email: 'mohammed.ali@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    name: 'John Okafor',
    department: 'Biochemistry',
    graduationYear: 2018,
    faculty: 'Science',
    location: 'Lagos',
    email: 'john.okafor@example.com',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    name: 'Fatima Bello',
    department: 'Law',
    graduationYear: 2021,
    faculty: 'Law',
    location: 'Kaduna',
    email: 'fatima.bello@example.com',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    name: 'David Adekoya',
    department: 'Mechanical Engineering',
    graduationYear: 2017,
    faculty: 'Engineering',
    location: 'Port Harcourt',
    email: 'david.adekoya@example.com',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    name: 'Zainab Usman',
    department: 'Medicine',
    graduationYear: 2016,
    faculty: 'Medicine',
    location: 'Kano',
    email: 'zainab.usman@example.com',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

// Sample data for departments
const departments = [
  'All Departments',
  'Computer Science',
  'Economics',
  'Biochemistry',
  'Law',
  'Mechanical Engineering',
  'Medicine'
];

// Sample data for faculties
const faculties = [
  'All Faculties',
  'Science',
  'Social Sciences',
  'Law',
  'Engineering',
  'Medicine'
];

// Sample data for graduation years
const graduationYears = [
  'All Years',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021'
];

const AlumniDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedFaculty, setSelectedFaculty] = useState('All Faculties');
  const [selectedYear, setSelectedYear] = useState('All Years');

  // Filter alumni based on search and filters
  const filteredAlumni = alumniData.filter(alumni => {
    // Filter by search query
    const matchesSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumni.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by department
    const matchesDepartment = selectedDepartment === 'All Departments' || 
                             alumni.department === selectedDepartment;
    
    // Filter by faculty
    const matchesFaculty = selectedFaculty === 'All Faculties' || 
                          alumni.faculty === selectedFaculty;
    
    // Filter by graduation year
    const matchesYear = selectedYear === 'All Years' || 
                       alumni.graduationYear.toString() === selectedYear;
    
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map(alumni => (
              <Card key={alumni.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={alumni.profileImage} 
                      alt={alumni.name} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{alumni.name}</h3>
                    <p className="text-sm text-gray-600">
                      {alumni.department}, {alumni.graduationYear}
                    </p>
                    <p className="text-sm text-gray-600">
                      Faculty of {alumni.faculty}
                    </p>
                    <p className="text-sm text-gray-600">
                      {alumni.location}
                    </p>
                    <div className="mt-2">
                      <a 
                        href={`mailto:${alumni.email}`} 
                        className="text-sm text-fud-green hover:underline"
                      >
                        {alumni.email}
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
      </div>
    </Layout>
  );
};

export default AlumniDirectory;
