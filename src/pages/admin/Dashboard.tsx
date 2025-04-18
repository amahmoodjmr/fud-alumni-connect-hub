
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, BarChart, Cog, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Link to="/admin/panel">
            <Button className="bg-fud-green hover:bg-fud-green-dark">
              <Settings className="h-4 w-4 mr-2" />
              Administration Panel
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Alumni</p>
                <h3 className="text-xl font-bold">1,234</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Events</p>
                <h3 className="text-xl font-bold">6</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <FileText className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">News Articles</p>
                <h3 className="text-xl font-bold">18</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="bg-fud-green-50 p-3 rounded-full mr-4">
                <BarChart className="h-6 w-6 text-fud-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payments</p>
                <h3 className="text-xl font-bold">₦485,000</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alumni Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-500">Name</th>
                    <th className="text-left font-medium text-gray-500">Department</th>
                    <th className="text-left font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Amina Ibrahim</td>
                    <td className="py-2">Computer Science</td>
                    <td className="py-2">Apr 12, 2023</td>
                  </tr>
                  <tr>
                    <td className="py-2">Mohammed Ali</td>
                    <td className="py-2">Economics</td>
                    <td className="py-2">Apr 10, 2023</td>
                  </tr>
                  <tr>
                    <td className="py-2">John Okafor</td>
                    <td className="py-2">Biochemistry</td>
                    <td className="py-2">Apr 8, 2023</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-500">Event</th>
                    <th className="text-left font-medium text-gray-500">Date</th>
                    <th className="text-left font-medium text-gray-500">Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Annual Reunion</td>
                    <td className="py-2">Jun 15, 2023</td>
                    <td className="py-2">124</td>
                  </tr>
                  <tr>
                    <td className="py-2">Career Workshop</td>
                    <td className="py-2">Jul 3, 2023</td>
                    <td className="py-2">56</td>
                  </tr>
                  <tr>
                    <td className="py-2">Meet & Greet</td>
                    <td className="py-2">Aug 10, 2023</td>
                    <td className="py-2">42</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/panel?tab=alumni">
                <Button className="w-full p-4 bg-fud-green text-white rounded-lg hover:bg-fud-green-dark">
                  Manage Alumni
                </Button>
              </Link>
              <Link to="/admin/panel?tab=events">
                <Button className="w-full p-4 bg-fud-green text-white rounded-lg hover:bg-fud-green-dark">
                  Manage Events
                </Button>
              </Link>
              <Link to="/admin/panel?tab=news">
                <Button className="w-full p-4 bg-fud-green text-white rounded-lg hover:bg-fud-green-dark">
                  Manage News
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
