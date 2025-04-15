
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GraduationCap, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Form schema for login
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Extended schema for registration
const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  alumniId: z.string().min(3, 'Alumni ID must be at least 3 characters'),
  graduationYear: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 1980, {
    message: 'Please enter a valid graduation year',
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

type AuthFormProps = {
  mode: 'login' | 'register';
  isAdmin?: boolean;
};

export function AuthForm({ mode, isAdmin = false }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Determine which schema to use based on mode
  const formSchema = mode === 'login' ? loginSchema : registerSchema;
  
  // Create form
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'login' 
      ? { email: '', password: '' } 
      : { email: '', password: '', firstName: '', lastName: '', alumniId: '', graduationYear: '' },
  });

  // Form submission
  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    setIsLoading(true);
    try {
      if (mode === 'login') {
        const { email, password } = data as LoginFormValues;
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Check if user is an admin
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', authData.user?.id)
          .single();

        if (profileError) throw profileError;

        // Redirect based on admin status
        if (isAdmin && !profileData.is_admin) {
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin authentication required.');
        }

        toast.success('Login successful!');
        navigate(isAdmin ? '/admin/dashboard' : '/alumni/dashboard');
      } else {
        // Registration flow
        const { email, password, firstName, lastName, alumniId, graduationYear } = data as RegisterFormValues;
        
        // Sign up with Supabase
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              alumni_id: alumniId,
              graduation_year: parseInt(graduationYear),
            }
          }
        });

        if (signUpError) throw signUpError;

        // Attempt to sign in immediately after signup instead of redirecting to verification page
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          toast.success('Registration successful! Please check your email for verification if needed.');
          navigate('/login');
        } else {
          toast.success('Registration and login successful!');
          navigate('/alumni/dashboard');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="bg-fud-green-50 rounded-full p-3">
          <GraduationCap className="h-8 w-8 text-fud-green" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-1">
        {mode === 'login' 
          ? (isAdmin ? 'Admin Login' : 'Alumni Login') 
          : 'Alumni Registration'}
      </h1>
      
      <p className="text-gray-500 text-center mb-6">
        {mode === 'login' 
          ? 'Welcome back! Please enter your details.' 
          : 'Join the FUD alumni network!'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="alumniId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alumni ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your alumni ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input placeholder="Year of graduation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {mode === 'login' && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-fud-green hover:underline">
                Forgot password?
              </Link>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-fud-green hover:bg-fud-green-dark"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Registering...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Register'
            )}
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link to="/register" className="text-fud-green hover:underline">
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-fud-green hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
