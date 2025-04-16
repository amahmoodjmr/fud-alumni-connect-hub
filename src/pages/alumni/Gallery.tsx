
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Filter, Loader2 } from 'lucide-react';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('upload_date', { ascending: false });
          
        if (error) throw error;
        
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        toast.error('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, []);
  
  const filteredImages = images.filter(image => 
    image.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Alumni Gallery</h1>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search gallery..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Categories
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-fud-green" />
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg'; 
                    }}
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium truncate">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{image.description}</p>
                  )}
                  {image.category && (
                    <div className="mt-2">
                      <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                        {image.category}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No gallery images found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
