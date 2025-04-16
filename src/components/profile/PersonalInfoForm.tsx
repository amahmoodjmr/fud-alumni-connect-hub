
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoFormProps {
  initialData: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  isNewUser: boolean;
}

const PersonalInfoForm = ({ initialData, onSubmit, isLoading, isNewUser }: PersonalInfoFormProps) => {
  const methods = useForm({
    defaultValues: initialData || {}
  });
  
  const { register, handleSubmit, setValue, formState: { errors } } = methods;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
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
        </FormProvider>
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
              {isNewUser ? 'Complete Profile & Continue' : 'Save Changes'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalInfoForm;
