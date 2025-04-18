import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/login');
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      
      setUserData(data);
      
      if (data) {
        const hasRequiredFields = Boolean(
          data.first_name && data.last_name && 
          data.faculty && data.department && 
          data.profile_image_url
        );
        
        setProfileComplete(hasRequiredFields);
        
        if (data.first_name && data.last_name && !data.faculty) {
          setIsNewUser(true);
        } else {
          setIsNewUser(false);
        }
        
        if (data.profile_image_url) {
          setImageUrl(data.profile_image_url);
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data: ' + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/login');
        return;
      }
      
      // Clean up data to match database schema
      if (data.graduation_date) {
        const date = new Date(data.graduation_date);
        data.graduation_year = date.getFullYear();
        delete data.graduation_date;
      }
      
      // Remove fields that don't exist in the profiles table schema
      const fieldsToRemove = ['city', 'matriculation_number'];
      fieldsToRemove.forEach(field => {
        if (field in data) {
          delete data[field];
        }
      });
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully');
      
      const isComplete = Boolean(
        data.first_name && data.last_name && 
        data.faculty && data.department && 
        imageUrl
      );
      
      setProfileComplete(isComplete);
      setIsNewUser(false);
      
      // Always navigate to dashboard after successful update
      setTimeout(() => navigate('/alumni/dashboard'), 1500);
      
      // Refresh user data
      fetchUserData();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile: ' + (error.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return {
    isLoading,
    uploadingImage,
    imageUrl,
    profileComplete,
    isNewUser,
    userData,
    updateProfile,
    handleImageUploaded,
    fetchUserData
  };
}
