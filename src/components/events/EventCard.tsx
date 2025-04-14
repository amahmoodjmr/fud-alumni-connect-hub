
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  category?: string;
  isFeatured?: boolean;
  isUpcoming?: boolean;
}

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  imageUrl = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  category = 'Event',
  isFeatured = false,
  isUpcoming = true
}: EventCardProps) {
  return (
    <Card className={`overflow-hidden hover-lift transition-all duration-300 ${isFeatured ? 'border-fud-green-300' : ''}`}>
      <Link to={`/events/${id}`}>
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
            />
          </div>
          
          {isFeatured && (
            <div className="absolute top-0 right-0 m-3">
              <Badge variant="secondary" className="bg-fud-green text-white font-medium">
                Featured
              </Badge>
            </div>
          )}
          
          {isUpcoming && (
            <div className="absolute top-0 left-0 m-3">
              <Badge className="bg-yellow-500 text-white">Upcoming</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-3">
            <Badge variant="outline" className="text-fud-green-dark border-fud-green-200 font-normal">
              {category}
            </Badge>
          </div>
          
          <h3 className="font-bold text-xl mb-2 text-fud-darkGray line-clamp-2">
            {title}
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <CalendarDays className="h-4 w-4 mr-2 text-fud-green" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-fud-green" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-fud-green" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button 
            size="sm"
            variant="outline" 
            className="text-fud-green border-fud-green hover:bg-fud-green-50"
          >
            View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
