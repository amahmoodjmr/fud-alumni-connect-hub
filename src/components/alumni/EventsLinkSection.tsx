
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function EventsLinkSection() {
  return (
    <div className="mt-6 border-t pt-4 text-center">
      <p className="text-gray-600 mb-2">Connect with your fellow alumni at our events</p>
      <Button asChild variant="outline" className="hover:bg-fud-green hover:text-white">
        <Link to="/events">View Alumni Events</Link>
      </Button>
    </div>
  );
}
