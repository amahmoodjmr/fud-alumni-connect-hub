
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/ui/hero-section';
import { Card, CardContent } from '@/components/ui/card';
import { EventCard } from '@/components/events/EventCard';
import { NewsCard } from '@/components/news/NewsCard';
import Layout from '@/components/layout/Layout';
import { GraduationCap, Network, Calendar, Wallet, Image, Users, CheckCircle } from 'lucide-react';

// Sample data
const features = [
  {
    icon: <GraduationCap />,
    title: 'Alumni Directory',
    description: 'Connect with fellow graduates across different years, departments, and locations.'
  },
  {
    icon: <Network />,
    title: 'Career Networks',
    description: 'Explore career opportunities and mentorship through our global alumni network.'
  },
  {
    icon: <Calendar />,
    title: 'Alumni Events',
    description: 'Stay informed about reunions, workshops, and networking events.'
  },
  {
    icon: <Wallet />,
    title: 'Payments Portal',
    description: 'Easily make alumni contributions and manage your membership fees.'
  },
  {
    icon: <Image />,
    title: 'Media Gallery',
    description: 'Access photos and videos from past events and campus memories.'
  },
  {
    icon: <Users />,
    title: 'Online Community',
    description: 'Participate in discussions and stay connected with the FUD community.'
  }
];

const sampleEvents = [
  {
    id: '1',
    title: 'Annual Alumni Reunion',
    date: 'June 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'FUD Campus, Main Auditorium',
    category: 'Reunion',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Career Development Workshop',
    date: 'July 3, 2023',
    time: '2:00 PM - 5:00 PM',
    location: 'Virtual (Zoom)',
    category: 'Workshop'
  },
  {
    id: '3',
    title: 'Alumni Meet & Greet',
    date: 'August 10, 2023',
    time: '6:00 PM - 9:00 PM',
    location: 'FUD Campus, Student Center',
    category: 'Networking'
  }
];

const sampleNews = [
  {
    id: '1',
    title: 'FUD Alumni Association Announces New Leadership',
    excerpt: 'The Federal University Dutse Alumni Association has elected a new executive board to lead the organization for the next two years.',
    date: 'May 12, 2023',
    author: 'Alumni Office',
    category: 'Announcement',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Alumni-Funded Scholarship Program Launches',
    excerpt: 'A new scholarship program funded by alumni contributions will support 50 students starting next semester.',
    date: 'April 28, 2023',
    author: 'Scholarship Committee'
  },
  {
    id: '3',
    title: 'FUD Alumna Recognized with National Award',
    excerpt: 'Dr. Amina Ibrahim, a 2015 graduate, was honored with the National Science Award for her groundbreaking research.',
    date: 'April 15, 2023',
    author: 'Communications Team'
  }
];

const benefits = [
  'Access to exclusive networking events and career resources',
  'Opportunities to mentor current students',
  'Invitations to special university functions and ceremonies',
  'Discounts on continuing education programs',
  'Use of campus facilities including library and sports complex',
  'Subscription to alumni newsletter and university publications'
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Connect with Federal University Dutse Alumni"
        subtitle="Join a vibrant community of graduates building networks and creating opportunities."
        ctaText="Join the Network"
        ctaLink="/register"
        backgroundImage="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1972&auto=format&fit=crop"
      />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-fud-darkGray">Alumni Platform Features</h2>
            <p className="text-lg text-gray-600">
              Discover the tools and resources available to FUD alumni through our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-fud-green-50 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <div className="text-fud-green-600">
                      {React.cloneElement(feature.icon, { className: 'h-6 w-6' })}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-fud-darkGray">Upcoming Events</h2>
              <p className="text-lg text-gray-600">
                Stay connected with the latest alumni gatherings and activities.
              </p>
            </div>
            <Link to="/events">
              <Button variant="outline" className="text-fud-green border-fud-green hover:bg-fud-green-50">
                View All Events
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEvents.map((event) => (
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
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-fud-darkGray">Latest News</h2>
              <p className="text-lg text-gray-600">
                Updates and stories from the FUD alumni community.
              </p>
            </div>
            <Link to="/news">
              <Button variant="outline" className="text-fud-green border-fud-green hover:bg-fud-green-50">
                View All News
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleNews.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                author={news.author}
                category={news.category}
                isFeatured={news.isFeatured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-fud-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-fud-darkGray">Benefits of Alumni Membership</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our network and enjoy exclusive benefits designed to support your personal and professional growth.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-fud-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button className="mt-8 bg-fud-green hover:bg-fud-green-dark" asChild>
                <Link to="/register">
                  Become a Member
                </Link>
              </Button>
            </div>

            <div className="relative hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop" 
                alt="FUD Campus"
                className="rounded-lg shadow-xl" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=300&auto=format&fit=crop" 
                  alt="FUD Alumni Event" 
                  className="rounded w-48 h-32 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-fud-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect with Fellow Alumni?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join the FUD Alumni Connect Hub today and become part of our growing community of successful graduates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
            <Button size="lg" className="bg-white text-fud-green hover:bg-gray-100" asChild>
              <Link to="/register">
                Register Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
