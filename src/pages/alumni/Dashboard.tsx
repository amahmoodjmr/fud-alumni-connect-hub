
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Bell, CreditCard, Users, Search, Image, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AlumniDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Alumni Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <User className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profile Completion</p>
                <h3 className="text-xl font-bold">75%</h3>
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
        
        {/* Alumni Features Section */}
        <h2 className="text-xl font-semibold mb-4">Alumni Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/alumni/profile">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-fud-green-50 p-4 rounded-full mb-4">
                  <User className="h-8 w-8 text-fud-green" />
                </div>
                <h3 className="font-medium mb-2">Manage Profile</h3>
                <p className="text-sm text-gray-500">Update your personal information and profile picture</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/alumni/directory">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-fud-green-50 p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-fud-green" />
                </div>
                <h3 className="font-medium mb-2">Alumni Directory</h3>
                <p className="text-sm text-gray-500">Find and connect with other alumni</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/gallery">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-fud-green-50 p-4 rounded-full mb-4">
                  <Image className="h-8 w-8 text-fud-green" />
                </div>
                <h3 className="font-medium mb-2">Image Gallery</h3>
                <p className="text-sm text-gray-500">View photos from university events and reunions</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/alumni/payments">
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-fud-green-50 p-4 rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-fud-green" />
                </div>
                <h3 className="font-medium mb-2">Make Payments</h3>
                <p className="text-sm text-gray-500">Pay dues and make contributions</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <p className="font-medium">Payment Submitted</p>
                  <p className="text-sm text-gray-500">You made an alumni contribution payment</p>
                  <p className="text-xs text-gray-400">3 days ago</p>
                </div>
                <div className="pb-2">
                  <p className="font-medium">Event RSVP</p>
                  <p className="text-sm text-gray-500">You registered for Annual Alumni Reunion</p>
                  <p className="text-xs text-gray-400">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
