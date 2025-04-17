
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function EventsLinkSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="mt-6 border-t pt-4 text-center">
      <p className="text-gray-600 mb-2">Connect with your fellow alumni at our events</p>
      
      {isAuthenticated ? (
        <Button asChild variant="outline" className="hover:bg-fud-green hover:text-white">
          <Link to="/events">View & Register for Alumni Events</Link>
        </Button>
      ) : (
        <div className="space-y-2">
          <Button asChild variant="outline" className="hover:bg-fud-green hover:text-white">
            <Link to="/events">View Alumni Events</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-1">
            <Link to="/login" className="text-fud-green hover:underline">Login</Link> or 
            <Link to="/register" className="text-fud-green hover:underline ml-1">Register</Link> to sign up for events
          </p>
        </div>
      )}
    </div>
  );
}
