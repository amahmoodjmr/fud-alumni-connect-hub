
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

// Mock data for dropdowns
const faculties = [
  "Faculty of Agriculture", 
  "Faculty of Arts", 
  "Faculty of Computing", 
  "Faculty of Education", 
  "Faculty of Engineering",
  "Faculty of Law", 
  "Faculty of Medicine", 
  "Faculty of Science",
  "Faculty of Social Sciences"
];

const departments = {
  "Faculty of Agriculture": ["Agricultural Economics", "Animal Science", "Crop Science", "Soil Science"],
  "Faculty of Computing": ["Computer Science", "Information Technology", "Software Engineering", "Cyber Security"],
  "Faculty of Science": ["Biochemistry", "Chemistry", "Mathematics", "Microbiology", "Physics"],
  "Faculty of Arts": ["Arabic", "English", "History", "Islamic Studies"],
  "Faculty of Education": ["Education Administration", "Educational Psychology", "Science Education"],
  "Faculty of Engineering": ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering"],
  "Faculty of Law": ["Private Law", "Public Law", "Islamic Law"],
  "Faculty of Medicine": ["Anatomy", "Medicine", "Nursing", "Pharmacy"],
  "Faculty of Social Sciences": ["Economics", "Mass Communication", "Political Science", "Sociology"]
};

const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

interface AlumniFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  name: string;
  faculty: string | null;
  department: string | null;
  graduationYear: string | null;
}

export function AlumniFilter({ onFilterChange }: AlumniFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    faculty: null,
    department: null,
    graduationYear: null
  });

  // Get departments based on selected faculty
  const getDepartments = () => {
    if (!selectedFaculty) return [];
    return departments[selectedFaculty as keyof typeof departments] || [];
  };

  const handleInputChange = (field: keyof FilterState, value: string | null) => {
    const newFilters = { ...filters, [field]: value };
    
    // If faculty changes, reset department
    if (field === 'faculty') {
      setSelectedFaculty(value);
      newFilters.department = null;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: '',
      faculty: null,
      department: null,
      graduationYear: null
    };
    setFilters(resetFilters);
    setSelectedFaculty(null);
    onFilterChange(resetFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-fud-darkGray">Alumni Directory</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={toggleExpand}
        >
          <Filter className="h-4 w-4 mr-1" />
          {isExpanded ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Basic Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name..."
            className="pl-9"
            value={filters.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <Button 
          className="bg-fud-green hover:bg-fud-green-dark text-white"
          onClick={() => onFilterChange(filters)}
        >
          Search
        </Button>
        {(filters.name || filters.faculty || filters.department || filters.graduationYear) && (
          <Button variant="ghost" size="icon" onClick={handleReset} title="Clear filters">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 animate-fade-in">
          <div>
            <Label htmlFor="faculty">Faculty</Label>
            <Select 
              value={filters.faculty || ""} 
              onValueChange={(value) => handleInputChange('faculty', value)}
            >
              <SelectTrigger id="faculty">
                <SelectValue placeholder="Select faculty" />
              </SelectTrigger>
              <SelectContent>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty} value={faculty}>
                    {faculty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              value={filters.department || ""}
              onValueChange={(value) => handleInputChange('department', value)}
              disabled={!selectedFaculty}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder={selectedFaculty ? "Select department" : "Select faculty first"} />
              </SelectTrigger>
              <SelectContent>
                {getDepartments().map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Select
              value={filters.graduationYear || ""}
              onValueChange={(value) => handleInputChange('graduationYear', value)}
            >
              <SelectTrigger id="graduationYear">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
