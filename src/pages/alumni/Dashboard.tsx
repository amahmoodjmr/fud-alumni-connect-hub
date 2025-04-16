
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Bell, CreditCard, Users, LogOut, Image, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AlumniDashboard = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
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

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        setProfileData(data);
        
        // Calculate profile completion percentage
        const requiredFields = [
          'first_name', 'last_name', 'phone', 'faculty', 
          'department', 'profile_image_url', 'graduation_date',
          'matriculation_number'
        ];
        
        const completedFields = requiredFields.filter(field => data && data[field]);
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

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Alumni Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {profileData && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={profileData.profile_image_url || ''} />
                  <AvatarFallback>{profileData.first_name?.[0]}{profileData.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium mr-4">{profileData.first_name} {profileData.last_name}</span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <User className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profile Completion</p>
                <h3 className="text-xl font-bold">{profileCompletion}%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Events</p>
                <h3 className="text-xl font-bold">3</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <Bell className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Notifications</p>
                <h3 className="text-xl font-bold">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payments Due</p>
                <h3 className="text-xl font-bold">₦2,500</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Alumni Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex justify-start items-center h-auto py-3 px-4"
                  onClick={() => navigate('/alumni/profile')}
                >
                  <UserPlus className="h-5 w-5 mr-2 text-fud-green" />
                  <div className="text-left">
                    <p className="font-medium">Update Profile</p>
                    <p className="text-xs text-gray-500">Manage your account information</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex justify-start items-center h-auto py-3 px-4"
                  onClick={() => navigate('/alumni/directory')}
                >
                  <Users className="h-5 w-5 mr-2 text-fud-green" />
                  <div className="text-left">
                    <p className="font-medium">Alumni Directory</p>
                    <p className="text-xs text-gray-500">Search and connect with alumni</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex justify-start items-center h-auto py-3 px-4"
                  onClick={() => navigate('/events')}
                >
                  <Calendar className="h-5 w-5 mr-2 text-fud-green" />
                  <div className="text-left">
                    <p className="font-medium">Events</p>
                    <p className="text-xs text-gray-500">Upcoming alumni events</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex justify-start items-center h-auto py-3 px-4"
                  onClick={() => navigate('/alumni/gallery')}
                >
                  <Image className="h-5 w-5 mr-2 text-fud-green" />
                  <div className="text-left">
                    <p className="font-medium">Image Gallery</p>
                    <p className="text-xs text-gray-500">View alumni photos</p>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex justify-start items-center h-auto py-3 px-4"
                  onClick={() => navigate('/alumni/payments')}
                >
                  <CreditCard className="h-5 w-5 mr-2 text-fud-green" />
                  <div className="text-left">
                    <p className="font-medium">Make Payment</p>
                    <p className="text-xs text-gray-500">Pay dues and contributions</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">Profile Updated</p>
                  <p className="text-sm text-gray-500">You updated your profile information</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Payment Reminder</p>
                  <p className="text-sm text-gray-500">Alumni dues payment is due</p>
                  <p className="text-xs text-gray-400">3 days ago</p>
                </div>
                <div className="pb-2">
                  <p className="font-medium">New Event</p>
                  <p className="text-sm text-gray-500">Annual Alumni Reunion announced</p>
                  <p className="text-xs text-gray-400">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
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
      </div>
    </Layout>
  );
};

export default AlumniDashboard;
