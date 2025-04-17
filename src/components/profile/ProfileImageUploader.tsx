
import React, { useState } from 'react';
import { toast } from 'sonner';
import { UserRound, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ProfileImageUploaderProps {
  userId: string;
  imageUrl: string | null;
  onImageUploaded: (url: string) => void;
  isRequired?: boolean;
}

const ProfileImageUploader = ({ 
  userId, 
  imageUrl, 
  onImageUploaded,
  isRequired = false
}: ProfileImageUploaderProps) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      setSelectedFile(file);
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only PNG and JPEG files are allowed');
        return;
      }

      const maxSizeBytes = 500 * 1024;
      if (selectedFile.size > maxSizeBytes) {
        toast.error('File size must not exceed 500KB');
        return;
      }

      setUploadingImage(true);

      // Create avatars bucket if it doesn't exist
      try {
        // Try to get bucket to check if it exists
        await supabase.storage.getBucket('avatars');
      } catch (error) {
        // If bucket doesn't exist, create it
        await supabase.storage.createBucket('avatars', {
          public: true,
        });
      }

      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: data.publicUrl })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      onImageUploaded(data.publicUrl);
      toast.success('Profile picture uploaded successfully');
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload profile picture: ' + (error.message || error));
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-40 h-40 mb-4">
        <AvatarImage src={imageUrl || ''} alt="Profile" />
        <AvatarFallback className="bg-gray-200">
          <UserRound className="h-20 w-20 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      
      <div className="w-full">
        <Label htmlFor="picture" className="mb-2 block">Upload new picture</Label>
        <div className="flex flex-col gap-2">
          <Input 
            id="picture" 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
          />
          {selectedFile && (
            <Button 
              onClick={uploadImage}
              disabled={uploadingImage}
              className="mt-2"
            >
              {uploadingImage ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </Button>
          )}
        </div>
        {!imageUrl && isRequired && (
          <p className="text-red-500 text-xs mt-1">Profile picture is required</p>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
