
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Users, Calendar, FileText, BarChart, 
  Settings, ChevronRight 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventsManagement from '@/components/admin/EventsManagement';
import NewsManagement from '@/components/admin/NewsManagement';
import AlumniManagement from '@/components/admin/AlumniManagement';

const AdminPanel = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Administrator Panel</h1>
        
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="events">Events Management</TabsTrigger>
            <TabsTrigger value="news">News Management</TabsTrigger>
            <TabsTrigger value="alumni">Alumni Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="border rounded-lg p-6">
            <EventsManagement />
          </TabsContent>
          
          <TabsContent value="news" className="border rounded-lg p-6">
            <NewsManagement />
          </TabsContent>
          
          <TabsContent value="alumni" className="border rounded-lg p-6">
            <AlumniManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
