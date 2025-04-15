
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { User, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';

const ProfileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      console.log('Profile data:', data);
      toast.success("Profile updated successfully!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Profile Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <User className="h-20 w-20 text-gray-400" />
                </div>
                
                <div className="w-full">
                  <Label htmlFor="picture" className="mb-2 block">Upload new picture</Label>
                  <div className="flex items-center gap-2">
                    <Input id="picture" type="file" />
                    <Button size="sm" className="bg-fud-green hover:bg-fud-green-dark">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        {...register("firstName", { required: true })}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">First name is required</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        {...register("lastName", { required: true })}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">Last name is required</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        {...register("email", { required: true })}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
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
                      <Select>
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
                        <Label htmlFor="alumniId">Alumni ID</Label>
                        <Input 
                          id="alumniId"
                          {...register("alumniId")}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input 
                          id="graduationYear"
                          type="number"
                          {...register("graduationYear")}
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
