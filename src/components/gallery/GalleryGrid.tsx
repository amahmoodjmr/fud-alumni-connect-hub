
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-sm hover-lift cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <h3 className="text-white font-medium text-sm truncate">{image.title}</h3>
              {image.category && (
                <p className="text-gray-300 text-xs">{image.category}</p>
              )}
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
              >
                <ZoomIn className="h-4 w-4 text-gray-800" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none max-h-[90vh] overflow-hidden">
          <div className="relative bg-black/90 rounded-lg overflow-auto max-h-[90vh]">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 z-10 text-white hover:bg-black/30 rounded-full"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 lg:max-h-[80vh] overflow-hidden">
                {selectedImage && (
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              
              {selectedImage && selectedImage.description && (
                <div className="p-4 lg:p-6 bg-white lg:w-64 lg:min-h-full">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  
                  {selectedImage.date && (
                    <p className="text-sm text-gray-500 mb-3">{selectedImage.date}</p>
                  )}
                  
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
