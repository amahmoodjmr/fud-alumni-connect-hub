
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Trash2, Plus, Edit, X, UploadCloud 
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogFooter, DialogHeader, 
  DialogTitle, DialogTrigger, DialogClose 
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const EventsManagement = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });
        
      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      image_url: '',
    });
    setEditingId(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (editingId) {
        const { error } = await supabase
          .from('events')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
          
        if (error) throw error;
        toast.success('Event updated successfully');
      } else {
        const { error } = await supabase
          .from('events')
          .insert([{
            ...formData,
            created_by: userId,
          }]);
          
        if (error) throw error;
        toast.success('Event created successfully');
      }
      
      resetForm();
      fetchEvents();
    } catch (error: any) {
      console.error('Error saving event:', error);
      toast.error(editingId ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date ? event.event_date.substring(0, 10) : '',
      location: event.location || '',
      image_url: event.image_url || '',
    });
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Events Management</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fud-green hover:bg-fud-green-dark">
              <Plus className="h-4 w-4 mr-2" /> Add Event
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Event Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="event_date" className="block text-sm font-medium mb-1">Event Date</label>
                    <Input
                      id="event_date"
                      name="event_date"
                      type="date"
                      value={formData.event_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-fud-green hover:bg-fud-green-dark" disabled={isLoading}>
                  {isLoading ? 'Saving...' : (editingId ? 'Update Event' : 'Create Event')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map(event => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.event_date ? format(new Date(event.event_date), 'MMM dd, yyyy') : '-'}</TableCell>
                  <TableCell>{event.location || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        
                        {/* Reuse the same dialog content */}
                      </Dialog>
                      
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventsManagement;
