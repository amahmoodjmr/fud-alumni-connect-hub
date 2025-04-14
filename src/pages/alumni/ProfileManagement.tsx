
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import ProfilePictureUpload from '@/components/profile/ProfilePictureUpload';
import { supabase } from '@/integrations/supabase/client';

const ProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUserId(session.user.id);
        
        // Fetch profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (data && !error) {
          // Set form values
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null) setValue(key, value);
          });
          
          // Set profile image if exists
          if (data.profile_image_url) {
            setProfileImageUrl(data.profile_image_url);
          }
        }
      }
    };
    
    fetchUserProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    if (!userId) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Include the profile image URL in the data to update
      const updatedData = {
        ...data,
        profile_image_url: profileImageUrl,
        updated_at: new Date()
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', userId);
        
      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageUpdate = (url: string) => {
    setProfileImageUrl(url);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Profile Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ProfilePictureUpload 
              userId={userId}
              currentImageUrl={profileImageUrl}
              onImageUpdate={handleProfileImageUpdate}
            />
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input 
                        id="first_name"
                        {...register("first_name", { required: true })}
                        className={errors.first_name ? "border-red-500" : ""}
                      />
                      {errors.first_name && <p className="text-red-500 text-sm mt-1">First name is required</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input 
                        id="last_name"
                        {...register("last_name", { required: true })}
                        className={errors.last_name ? "border-red-500" : ""}
                      />
                      {errors.last_name && <p className="text-red-500 text-sm mt-1">Last name is required</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        disabled // Email should be managed through auth settings
                        {...register("email")}
                      />
                      <p className="text-xs text-gray-500 mt-1">Email can only be changed through account settings</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        {...register("phone")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input 
                        id="dob"
                        type="date"
                        {...register("dob")}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setValue('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="alumni_id">Alumni ID</Label>
                        <Input 
                          id="alumni_id"
                          {...register("alumni_id")}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="graduation_year">Graduation Year</Label>
                        <Input 
                          id="graduation_year"
                          type="number"
                          {...register("graduation_year")}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="faculty">Faculty</Label>
                        <Input 
                          id="faculty"
                          {...register("faculty")}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department"
                          {...register("department")}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea 
                          id="address"
                          {...register("address")}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            {...register("city")}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input 
                            id="state"
                            {...register("state")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-fud-green hover:bg-fud-green-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin mr-2">○</span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileManagement;
