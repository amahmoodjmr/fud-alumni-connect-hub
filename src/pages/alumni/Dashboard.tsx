
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Bell, CreditCard, Users, LogOut, Image, UserPlus, Edit, Shield, ShieldCheck, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AlumniDashboard = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid'>('unpaid');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;
        
        setProfileData(profileData);
        
        // Calculate profile completion percentage
        const requiredFields = [
          'first_name', 'last_name', 'phone', 'faculty', 
          'department', 'profile_image_url', 'graduation_year',
          'alumni_id'
        ];
        
        const completedFields = requiredFields.filter(field => profileData && profileData[field]);
        const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
        setProfileCompletion(completionPercentage);
        
        // Check if profile is incomplete (less than 70% complete)
        if (completionPercentage < 70) {
          toast.info("Please complete your profile to access all features", {
            duration: 5000,
            action: {
              label: "Update Profile",
              onClick: () => navigate('/alumni/profile')
            }
          });
        }
        
        // Fetch payment status
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('status')
          .eq('user_id', session.user.id)
          .eq('payment_type', 'membership')
          .order('payment_date', { ascending: false })
          .limit(1);
          
        if (!paymentError && paymentData && paymentData.length > 0) {
          setPaymentStatus(paymentData[0].status === 'completed' ? 'paid' : 'unpaid');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Failed to log out");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-fud-green border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {/* Welcome Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={profileData?.profile_image_url || ''} />
                  <AvatarFallback className="text-lg">{profileData?.first_name?.[0]}{profileData?.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <Badge className={`absolute -bottom-2 right-0 ${paymentStatus === 'paid' ? 'bg-green-500' : 'bg-amber-500'}`}>
                  {paymentStatus === 'paid' ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl font-bold mb-1">Welcome, {profileData?.first_name} {profileData?.last_name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{profileData?.department || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Faculty</p>
                    <p className="font-medium">{profileData?.faculty || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Graduation Year</p>
                    <p className="font-medium">{profileData?.graduation_year || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Alumni ID</p>
                    <p className="font-medium">{profileData?.alumni_id || 'Not assigned'}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/alumni/profile">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="rounded-full overflow-hidden border-4 border-white shadow-md h-20 w-20 flex items-center justify-center bg-gray-50">
                  {paymentStatus === 'paid' ? (
                    <ShieldCheck className="h-10 w-10 text-green-500" />
                  ) : (
                    <ShieldOff className="h-10 w-10 text-amber-500" />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">
                  {paymentStatus === 'paid' ? 'Verified Member' : 'Pending Verification'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Membership Payment Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-fud-green" />
                  Membership Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentStatus === 'paid' ? (
                  <div className="bg-green-50 border border-green-100 rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <ShieldCheck className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="font-medium text-lg text-green-700">Thank you for your support!</h3>
                    </div>
                    
                    <p className="text-green-600 mb-4">
                      Your membership payment has been received and your account is fully verified.
                      Enjoy all the benefits of being a verified member of the Alumni Association.
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-medium mb-2">Membership Benefits:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                      <li>Full access to alumni networking events</li>
                      <li>Career development resources and opportunities</li>
                      <li>Mentorship programs</li>
                      <li>Exclusive access to university facilities</li>
                      <li>Discounts on continuing education programs</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4">Complete your ₦5000 membership payment to become a verified member and access all alumni benefits.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Card className="border-2 hover:border-fud-green cursor-pointer transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <CreditCard className="h-10 w-10 mb-4 mt-2 text-fud-green" />
                            <h3 className="font-medium">Pay with ATM Card</h3>
                            <p className="text-sm text-gray-500 mt-1">Secure online payment with your ATM card</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 hover:border-fud-green cursor-pointer transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-4 mt-2 text-fud-green">
                              <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                              <path d="M14 2v4h-4V2" />
                              <path d="M12 18h.01" />
                              <path d="M8 12h8" />
                              <path d="M8 16h4" />
                            </svg>
                            <h3 className="font-medium">Bank Transfer</h3>
                            <p className="text-sm text-gray-500 mt-1">Make a transfer to our bank account</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Button asChild className="w-full bg-fud-green hover:bg-fud-green-dark">
                      <Link to="/alumni/payments">Proceed to Payment</Link>
                    </Button>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Your payment status: <span className="font-medium text-amber-500">Pending</span></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-fud-green" />
                  Alumni Network Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <p className="font-medium">New Alumni Registration</p>
                    <p className="text-sm text-gray-500">5 new alumni from your department joined</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                  
                  <div className="border-b pb-2">
                    <p className="font-medium">Upcoming Reunion</p>
                    <p className="text-sm text-gray-500">Annual graduation class reunion announced</p>
                    <p className="text-xs text-gray-400">1 week ago</p>
                  </div>
                  
                  <div className="pb-2">
                    <p className="font-medium">New Job Opportunities</p>
                    <p className="text-sm text-gray-500">3 job postings for graduates of your department</p>
                    <p className="text-xs text-gray-400">3 days ago</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Connect with Alumni
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Alumni News Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Alumni News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-medium">New Scholarships Available</p>
                <p className="text-sm text-gray-500">The alumni association is funding 10 new scholarships</p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-medium">Campus Expansion</p>
                <p className="text-sm text-gray-500">FUD is expanding with a new engineering building</p>
                <p className="text-xs text-gray-400">1 week ago</p>
              </div>
              <div className="pb-2">
                <p className="font-medium">Alumni Recognition Awards</p>
                <p className="text-sm text-gray-500">Nominations open for the annual alumni recognition awards</p>
                <p className="text-xs text-gray-400">2 weeks ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AlumniDashboard;
