
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample gallery data
const galleryData = [
  {
    id: 1,
    category: 'events',
    title: 'Annual Alumni Dinner',
    description: 'Images from the 2023 Annual Alumni Dinner',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  },
  {
    id: 2,
    category: 'campus',
    title: 'Campus Tour',
    description: 'Images from the FUD campus',
    images: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  },
  {
    id: 3,
    category: 'reunions',
    title: 'Class of 2015 Reunion',
    description: 'Images from the Class of 2015 reunion',
    images: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ]
  }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGalleries = activeCategory === 'all' 
    ? galleryData
    : galleryData.filter(gallery => gallery.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Alumni Gallery</h1>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="events" onClick={() => setActiveCategory('events')}>Events</TabsTrigger>
            <TabsTrigger value="campus" onClick={() => setActiveCategory('campus')}>Campus</TabsTrigger>
            <TabsTrigger value="reunions" onClick={() => setActiveCategory('reunions')}>Reunions</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGalleries.map(gallery => (
            <Card key={gallery.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={gallery.images[0]} 
                  alt={gallery.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{gallery.title}</h3>
                <p className="text-sm text-gray-500">{gallery.description}</p>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {gallery.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
