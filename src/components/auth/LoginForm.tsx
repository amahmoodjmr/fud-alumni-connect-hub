
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
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isAdmin?: boolean;
}

export function LoginForm({ isAdmin = false }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { 
      email: '', 
      password: '' 
    }
  });

  const handleSubmit = async (formData: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { email, password } = formData;
      
      // Handle admin login specifically
      if (isAdmin) {
        // Check if this is our default admin credentials
        if (email === 'admin@fud.edu.ng' && password === 'Admin@123') {
          // Sign in with admin credentials
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: 'admin@fud.edu.ng',
            password: 'Admin@123',
          });
          
          if (signInError) {
            // If the admin doesn't exist yet, create it
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
              email: 'admin@fud.edu.ng', 
              password: 'Admin@123',
            });
            
            if (signUpError) throw signUpError;
            
            if (authData?.user) {
              await supabase.from('profiles').insert({
                id: authData.user.id,
                first_name: 'Admin',
                last_name: 'User',
                is_admin: true
              });

              // Sign in after creating
              await supabase.auth.signInWithPassword({
                email: 'admin@fud.edu.ng',
                password: 'Admin@123',
              });
            }
          }
          
          toast.success('Admin login successful!');
          navigate('/admin/panel');
          return;
        }
      }
      
      // Regular login flow
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is an admin - use select('*') to avoid TypeScript error
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user?.id)
        .single();

      if (profileError) throw profileError;

      // Redirect based on admin status
      if (isAdmin) {
        // If trying to access admin page but not an admin, sign out and show error
        if (!profileData?.is_admin) {
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin authentication required.');
        }
        
        // If admin login successful, go to admin panel
        toast.success('Admin login successful!');
        navigate('/admin/panel');
        return;
      }
      
      // Regular user login - go to alumni dashboard
      toast.success('Login successful!');
      navigate('/alumni/dashboard');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-fud-green hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-fud-green hover:bg-fud-green-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
        
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-fud-green hover:underline">
            Register
          </Link>
        </div>
      </form>
    </Form>
  );
}
