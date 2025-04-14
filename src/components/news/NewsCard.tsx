
import { Link } from 'react-router-dom';
import { CalendarDays, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl?: string;
  category?: string;
  isFeatured?: boolean;
}

export function NewsCard({
  id,
  title,
  excerpt,
  date,
  author,
  imageUrl = 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  category = 'News',
  isFeatured = false
}: NewsCardProps) {
  return (
    <Link to={`/news/${id}`}>
      <Card className={`overflow-hidden hover-lift transition-all duration-300 h-full flex flex-col ${
        isFeatured ? 'border-fud-green-300' : ''
      }`}>
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
              <Badge variant="secondary" className="bg-fud-green text-white">
                Featured
              </Badge>
            </div>
          )}
          
          <div className="absolute top-0 left-0 m-3">
            <Badge className="bg-fud-green-100 text-fud-green-800 border-none">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-xl mb-2 text-fud-darkGray line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{excerpt}</p>
          
          <div className="text-sm text-gray-500 flex flex-wrap gap-y-2 gap-x-4">
            <div className="flex items-center">
              <CalendarDays className="h-3.5 w-3.5 mr-1" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1" />
              <span>{author}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
