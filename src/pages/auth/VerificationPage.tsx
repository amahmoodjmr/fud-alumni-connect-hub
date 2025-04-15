
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Mail, RefreshCcw } from 'lucide-react';

const VerificationPage = () => {
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('No user found. Please log in again.');
      navigate('/login');
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email!,
      });

      if (error) throw error;

      toast.success('Verification email resent successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <div className="bg-fud-green-50 rounded-full p-4 inline-block mb-4">
            <Mail className="h-12 w-12 text-fud-green" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification email to your registered email address. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handleResendVerification} 
              disabled={isResending} 
              className="w-full bg-fud-green hover:bg-fud-green-dark"
            >
              {isResending ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              If you didn't receive the email, please check your spam folder or click the button above to resend.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationPage;
