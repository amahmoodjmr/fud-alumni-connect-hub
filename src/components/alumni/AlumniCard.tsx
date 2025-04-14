
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Building, GraduationCap } from 'lucide-react';

interface AlumniCardProps {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  graduationYear: number;
  department: string;
  faculty: string;
  location?: string;
  occupation?: string;
}

export function AlumniCard({ 
  id, 
  firstName, 
  lastName, 
  imageUrl, 
  graduationYear, 
  department,
  faculty,
  location,
  occupation
}: AlumniCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300">
      <Link to={`/alumni/${id}`}>
        <CardContent className="p-0">
          <div className="flex flex-col items-center p-6 pt-8 bg-gradient-to-b from-fud-green-50 to-white">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md mb-4">
              {!imageError && imageUrl ? (
                <AvatarImage 
                  src={imageUrl} 
                  alt={`${firstName} ${lastName}`} 
                  onError={handleImageError} 
                />
              ) : (
                <AvatarFallback className="bg-fud-green text-white text-xl">
                  {firstName.charAt(0)}{lastName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <h3 className="text-xl font-bold text-center mb-1">{firstName} {lastName}</h3>
            
            {occupation && (
              <div className="flex items-center text-fud-neutralGray mb-2 text-sm">
                <Building className="h-3.5 w-3.5 mr-1" />
                <span>{occupation}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center text-fud-neutralGray text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{location}</span>
              </div>
            )}
          </div>

          <CardFooter className="bg-white p-4 flex flex-col items-start gap-1.5">
            <div className="flex items-center text-sm">
              <GraduationCap className="h-4 w-4 mr-2 text-fud-green" />
              <span className="text-gray-700">{department}, {faculty}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-fud-green" />
              <span className="text-gray-700">Class of {graduationYear}</span>
            </div>
          </CardFooter>
        </CardContent>
      </Link>
    </Card>
  );
}
