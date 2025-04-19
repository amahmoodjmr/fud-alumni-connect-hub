
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Filter, Loader2, ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Define our gallery images with metadata
  const galleryImages = [
    {
      id: '1',
      url: '/public/lovable-uploads/0c5df63f-c62d-49c6-a874-a09c7852fd49.png',
      title: 'FUD Main Gate',
      description: 'The iconic main entrance of Federal University Dutse, symbolizing the gateway to knowledge and excellence.',
      category: 'Campus Infrastructure',
      date: '2024'
    },
    {
      id: '2',
      url: '/public/lovable-uploads/f6608933-175d-4b83-85df-9c30fdd157fc.png',
      title: 'FUD Entrance View',
      description: "A scenic view of the FUD main gate surrounded by lush greenery, showcasing the university's beautiful landscape.",
      category: 'Campus Infrastructure',
      date: '2024'
    },
    {
      id: '3',
      url: '/public/lovable-uploads/2499a905-e8f4-457d-9c3d-667a023433ac.png',
      title: 'FUD Official Logo',
      description: 'The official emblem of Federal University Dutse, featuring symbolic elements representing knowledge, excellence, and service.',
      category: 'University Identity',
      date: '2024'
    },
    {
      id: '4',
      url: '/public/lovable-uploads/03a3efe5-76fc-4927-85be-7174003e7b18.png',
      title: 'Historic Gate Photo',
      description: 'A historic black and white photograph of the FUD entrance, showcasing the architectural heritage of the institution.',
      category: 'Historic Photos',
      date: '2024'
    },
    {
      id: '5',
      url: '/public/lovable-uploads/f98db8c5-0b31-4257-befc-b76edf9cd761.png',
      title: 'NCC Partnership Logo',
      description: 'Nigerian Communications Commission logo, representing strong partnerships with national regulatory bodies.',
      category: 'Partnerships',
      date: '2024'
    },
    {
      id: '6',
      url: '/public/lovable-uploads/05eb44f8-2a84-4384-bd67-65934f88b33b.png',
      title: 'Vice Chancellor Portrait',
      description: 'Prof. Abdulkarim Sabo Mohammed, the Vice Chancellor of Federal University Dutse.',
      category: 'Leadership',
      date: '2024'
    },
    {
      id: '7',
      url: '/public/lovable-uploads/5db2d627-5478-4636-ad4f-2f1bd4b0e0a9.png',
      title: 'Vice Chancellor Address',
      description: 'The Vice Chancellor delivering an address during an important university function.',
      category: 'Events',
      date: '2024'
    },
    {
      id: '8',
      url: '/public/lovable-uploads/5606a8aa-3b2a-4de4-90ec-decf951fdba1.png',
      title: 'Graduation Ceremony',
      description: 'A panoramic view of FUD graduates during a convocation ceremony, representing academic achievement.',
      category: 'Events',
      date: '2024'
    },
    {
      id: '9',
      url: '/public/lovable-uploads/3fd6d745-1d3e-4611-bed1-d6c536b12660.png',
      title: 'University Library',
      description: 'The Federal University Dutse Library, a center for learning and research excellence.',
      category: 'Campus Infrastructure',
      date: '2024'
    }
  ];

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Alumni Gallery</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search gallery..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <GalleryGrid images={filteredImages} />
      </div>
    </Layout>
  );
};

export default Gallery;
