
import React, { useState, useEffect } from 'react';
import { 
  FileText, Trash2, Plus, Edit 
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

const NewsManagement = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchNews();
  }, []);
  
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false });
        
      if (error) throw error;
      setNews(data || []);
    } catch (error: any) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news');
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
      content: '',
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
          .from('news')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
          
        if (error) throw error;
        toast.success('News article updated successfully');
      } else {
        const { error } = await supabase
          .from('news')
          .insert([{
            ...formData,
            created_by: userId,
            published_date: new Date().toISOString(),
          }]);
          
        if (error) throw error;
        toast.success('News article created successfully');
      }
      
      resetForm();
      fetchNews();
    } catch (error: any) {
      console.error('Error saving news:', error);
      toast.error(editingId ? 'Failed to update news' : 'Failed to create news');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      content: article.content,
      image_url: article.image_url || '',
    });
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      toast.success('News article deleted successfully');
      fetchNews();
    } catch (error: any) {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete news article');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">News Management</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fud-green hover:bg-fud-green-dark">
              <Plus className="h-4 w-4 mr-2" /> Add News
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit News Article' : 'Add News Article'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
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
                  {isLoading ? 'Saving...' : (editingId ? 'Update Article' : 'Create Article')}
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
              <TableHead>Published Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                  No news articles found
                </TableCell>
              </TableRow>
            ) : (
              news.map(article => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {article.published_date ? format(new Date(article.published_date), 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(article.id)}>
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

export default NewsManagement;
