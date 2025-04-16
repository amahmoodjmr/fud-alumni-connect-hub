
import React, { useState } from 'react';
import { toast } from 'sonner';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PNG and JPEG files are allowed');
        return;
      }

      const maxSizeBytes = 500 * 1024;
      if (file.size > maxSizeBytes) {
        toast.error('File size must not exceed 500KB');
        return;
      }

      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: data.publicUrl })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      onImageUploaded(data.publicUrl);
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload profile picture');
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
        <div className="flex items-center gap-2">
          <Input 
            id="picture" 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
          />
        </div>
        {!imageUrl && isRequired && (
          <p className="text-red-500 text-xs mt-1">Profile picture is required</p>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
