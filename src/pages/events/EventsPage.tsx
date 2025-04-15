
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { EventCard } from '@/components/events/EventCard';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample events data
const eventsData = [
  {
    id: '1',
    title: 'Annual Alumni Reunion',
    date: 'June 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'FUD Campus, Main Auditorium',
    description: 'Join us for the annual reunion of Federal University Dutse alumni. Connect with former classmates, network with professionals, and participate in various activities organized for the day.',
    category: 'Reunion',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Career Development Workshop',
    date: 'July 3, 2023',
    time: '2:00 PM - 5:00 PM',
    location: 'Virtual (Zoom)',
    description: 'This virtual workshop will provide alumni with tools and strategies for career advancement. Topics include resume building, interview techniques, and networking strategies.',
    category: 'Workshop',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'Alumni Meet & Greet',
    date: 'August 10, 2023',
    time: '6:00 PM - 9:00 PM',
    location: 'FUD Campus, Student Center',
    description: 'An informal gathering for alumni to meet and network in a relaxed setting. Light refreshments will be provided.',
    category: 'Networking',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Homecoming Weekend',
    date: 'September 22-24, 2023',
    time: 'All Day',
    location: 'FUD Campus',
    description: 'A weekend full of activities including campus tours, sporting events, cultural performances, and networking dinners.',
    category: 'Reunion',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3'
  },
  {
    id: '5',
    title: 'Professional Networking Dinner',
    date: 'October 15, 2023',
    time: '7:00 PM - 10:00 PM',
    location: 'Grand Hotel, Dutse',
    description: 'Join fellow alumni for a formal dinner and networking event. Guest speakers will share insights on industry trends.',
    category: 'Networking',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3'
  },
  {
    id: '6',
    title: 'Alumni Mentorship Program Launch',
    date: 'November 5, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Online',
    description: 'The launch of our new mentorship program connecting experienced alumni with recent graduates and current students.',
    category: 'Workshop',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  }
];

const EventsPage = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredEvents = filter === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.category.toLowerCase() === filter.toLowerCase());

  const featuredEvents = eventsData.filter(event => event.isFeatured);
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Alumni Events</h1>
          <p className="text-gray-600">Stay connected and engaged with upcoming events for FUD alumni</p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                category={event.category}
                isFeatured={event.isFeatured}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="reunion">Reunions</TabsTrigger>
                <TabsTrigger value="workshop">Workshops</TabsTrigger>
                <TabsTrigger value="networking">Networking</TabsTrigger>
              </TabsList>
              
              <div className="hidden md:block">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="reunion">Reunions</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-2">
                        {event.category}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 border-fud-green text-fud-green hover:bg-fud-green hover:text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reunion">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.filter(event => event.category === 'Reunion').map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-2">
                        {event.category}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 border-fud-green text-fud-green hover:bg-fud-green hover:text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="workshop">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.filter(event => event.category === 'Workshop').map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-2">
                        {event.category}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 border-fud-green text-fud-green hover:bg-fud-green hover:text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="networking">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.filter(event => event.category === 'Networking').map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-2">
                        {event.category}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4 border-fud-green text-fud-green hover:bg-fud-green hover:text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
