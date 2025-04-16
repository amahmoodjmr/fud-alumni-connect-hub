
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { User, Upload, Check, CreditCard, AlertTriangle, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

const ProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  // Check if user is logged in & get profile data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          navigate('/login');
          return;
        }
        
        // Get user profile data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) throw error;
        
        // Set user data
        setUserData(data);
        
        // Pre-fill form values
        if (data) {
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
              setValue(key, value);
            }
          });
          
          // Check if profile has required fields
          setProfileComplete(Boolean(
            data.first_name && data.last_name && 
            data.phone && data.faculty && 
            data.department && data.profile_image_url
          ));
          
          // Check if this is a new user (no data besides name)
          if (data.first_name && data.last_name && !data.phone && !data.faculty) {
            setIsNewUser(true);
          } else {
            setIsNewUser(false);
          }
          
          // Set image URL if available
          if (data.profile_image_url) {
            setImageUrl(data.profile_image_url);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate, setValue]);
  
  // Upload profile picture
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setUploadingImage(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userData.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update user profile with new image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: data.publicUrl })
        .eq('id', userData.id);
        
      if (updateError) throw updateError;
      
      setImageUrl(data.publicUrl);
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setUploadingImage(false);
    }
  };
  
  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/login');
        return;
      }
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);
        
      if (error) throw error;
      
      toast.success('Profile updated successfully');
      
      // Set profile complete status
      const isComplete = Boolean(
        data.first_name && data.last_name && 
        data.phone && data.faculty && 
        data.department && imageUrl
      );
      
      setProfileComplete(isComplete);
      setIsNewUser(false);
      
      // If this was a new user completing their profile, redirect to dashboard
      if (isNewUser && isComplete) {
        setTimeout(() => navigate('/alumni/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle payment
  const handlePayment = async () => {
    try {
      toast.info('Redirecting to payment gateway...');
      // Here would be your payment gateway integration
      // For now, we'll just show a success message
      setTimeout(() => {
        toast.success('Payment processed successfully!');
      }, 2000);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Management</h1>
          
          {isNewUser && (
            <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-md flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm text-yellow-700">Please complete your profile</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
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
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Due</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">₦2,500</p>
                  <p className="text-sm text-gray-500">Annual Alumni Dues</p>
                </div>
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-fud-green hover:bg-fud-green-dark"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="profileForm" onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("email")}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        {...register("phone", { required: true })}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">Phone number is required</p>}
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
                        <SelectTrigger className="w-full">
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
                        <Label htmlFor="matriculation_number">Matriculation Number</Label>
                        <Input 
                          id="matriculation_number"
                          {...register("matriculation_number", { required: true })}
                          className={errors.matriculation_number ? "border-red-500" : ""}
                        />
                        {errors.matriculation_number && <p className="text-red-500 text-sm mt-1">Matriculation Number is required</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="graduation_date">Graduation Date</Label>
                        <Input 
                          id="graduation_date"
                          type="date"
                          {...register("graduation_date", { required: true })}
                          className={errors.graduation_date ? "border-red-500" : ""}
                        />
                        {errors.graduation_date && <p className="text-red-500 text-sm mt-1">Graduation date is required</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="faculty">Faculty</Label>
                        <Input 
                          id="faculty"
                          {...register("faculty", { required: true })}
                          className={errors.faculty ? "border-red-500" : ""}
                        />
                        {errors.faculty && <p className="text-red-500 text-sm mt-1">Faculty is required</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department"
                          {...register("department", { required: true })}
                          className={errors.department ? "border-red-500" : ""}
                        />
                        {errors.department && <p className="text-red-500 text-sm mt-1">Department is required</p>}
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
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit"
                  form="profileForm"
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
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileManagement;
