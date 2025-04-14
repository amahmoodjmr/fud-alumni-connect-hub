
import React, { useState } from 'react';
import { User, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

type ProfilePictureUploadProps = {
  userId: string | undefined;
  currentImageUrl: string | null;
  onImageUpdate: (url: string) => void;
};

const ProfilePictureUpload = ({ userId, currentImageUrl, onImageUpdate }: ProfilePictureUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !userId) return;

    const file = e.target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    setIsUploading(true);
    
    try {
      // Upload to Supabase storage (this is a placeholder - actual implementation would depend on your Supabase setup)
      // For demonstration, we'll just simulate an upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would upload to supabase storage
      // const { data, error } = await supabase.storage
      //  .from('avatars')
      //  .upload(`${userId}/avatar`, file);
      
      // if (error) throw error;
      
      // const url = supabase.storage.from('avatars').getPublicUrl(`${userId}/avatar`).data.publicUrl;
      
      // For now, we'll just use the preview URL
      onImageUpdate(objectUrl);
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      // Reset preview if upload fails
      setPreviewUrl(currentImageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageUpdate('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden relative">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-20 w-20 text-gray-400" />
          )}
          
          {previewUrl && (
            <button 
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
              onClick={removeImage}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="w-full">
          <div className="flex items-center gap-2">
            <input 
              id="picture" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <label 
              htmlFor="picture" 
              className="w-full flex justify-center bg-fud-green hover:bg-fud-green-dark text-white rounded-md py-2 cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload New Picture'}
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureUpload;
