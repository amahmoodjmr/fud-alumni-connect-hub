
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Filter, Loader2, Calendar, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [years, setYears] = useState(['All']);
  
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
        
        // Extract unique categories and years
        if (data && data.length > 0) {
          const uniqueCategories = ['All', ...new Set(data.map(img => img.category).filter(Boolean))];
          
          // Extract years from upload dates
          const uniqueYears = ['All'];
          data.forEach(img => {
            if (img.upload_date) {
              const year = new Date(img.upload_date).getFullYear().toString();
              if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
              }
            }
          });
          
          setCategories(uniqueCategories);
          setYears(uniqueYears);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        toast.error('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGallery();
  }, []);
  
  const filteredImages = images.filter(image => {
    // Filter by search term
    const matchesSearch = 
      (image.title?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (image.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (image.category?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
    
    // Filter by year
    const matchesYear = selectedYear === 'All' || 
      (image.upload_date && new Date(image.upload_date).getFullYear().toString() === selectedYear);
    
    return matchesSearch && matchesCategory && matchesYear;
  });
  
  // Group images by category for display
  const groupedImages = () => {
    const groups: { [key: string]: any[] } = {};
    
    filteredImages.forEach(image => {
      const category = image.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(image);
    });
    
    return groups;
  };

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
              
              <div className="w-full md:w-40">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Year" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-fud-green" />
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="space-y-8">
            {selectedCategory !== 'All' ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-fud-green" />
                  {selectedCategory}
                </h2>
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
                        {image.upload_date && (
                          <div className="mt-2">
                            <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                              {new Date(image.upload_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              Object.entries(groupedImages()).map(([category, images]) => (
                <div key={category}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-fud-green" />
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
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
                          {image.upload_date && (
                            <div className="mt-2">
                              <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                                {new Date(image.upload_date).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No gallery images found.</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
