
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag } from 'lucide-react';

// Sample news data
const newsData = [
  {
    id: '1',
    title: 'FUD Alumni Association Announces New Leadership',
    excerpt: 'The Federal University Dutse Alumni Association has elected a new executive board to lead the organization for the next two years.',
    content: 'The Federal University Dutse Alumni Association has elected a new executive board to lead the organization for the next two years. The election, which took place during the Annual General Meeting, saw the emergence of Dr. Ahmed Ibrahim as the new President, along with other executive members. The new leadership has promised to focus on strengthening the alumni network, supporting career development initiatives, and increasing the association\'s contribution to the university\'s development.',
    date: 'May 12, 2023',
    author: 'Alumni Office',
    category: 'Announcement',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Alumni-Funded Scholarship Program Launches',
    excerpt: 'A new scholarship program funded by alumni contributions will support 50 students starting next semester.',
    content: 'A new scholarship program funded by alumni contributions will support 50 students starting next semester. The initiative, spearheaded by the Class of 2010, aims to provide financial assistance to academically gifted students from economically disadvantaged backgrounds. Each scholarship will cover tuition fees and provide a stipend for books and other academic materials. The program demonstrates the continued commitment of FUD alumni to give back to their alma mater and support the next generation of students.',
    date: 'April 28, 2023',
    author: 'Scholarship Committee',
    category: 'Education',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2674&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    title: 'FUD Alumna Recognized with National Award',
    excerpt: 'Dr. Amina Ibrahim, a 2015 graduate, was honored with the National Science Award for her groundbreaking research.',
    content: 'Dr. Amina Ibrahim, a 2015 graduate of the Federal University Dutse, was honored with the National Science Award for her groundbreaking research in sustainable agriculture. Her work on drought-resistant crop varieties has gained international recognition and is being implemented in several communities across Northern Nigeria. The university community celebrates this achievement as it reflects the quality of education and research capabilities fostered at FUD.',
    date: 'April 15, 2023',
    author: 'Communications Team',
    category: 'Achievement',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '4',
    title: 'Alumni Mentorship Program Exceeds Expectations',
    excerpt: 'The recently launched alumni mentorship program has already connected over 200 students with industry professionals.',
    content: 'The recently launched alumni mentorship program has already connected over 200 students with industry professionals. The program, which began just three months ago, aims to bridge the gap between academic knowledge and practical industry experience. Feedback from both mentors and mentees has been overwhelmingly positive, with many students reporting improved clarity about career paths and professional development. The success of this initiative demonstrates the strong bonds within the FUD community and the willingness of alumni to support current students.',
    date: 'March 22, 2023',
    author: 'Career Services',
    category: 'Career',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3'
  },
  {
    id: '5',
    title: 'FUD Alumni Chapter Opens in Abuja',
    excerpt: 'A new alumni chapter has been established in Abuja to serve graduates living and working in the Federal Capital Territory.',
    content: 'A new alumni chapter has been established in Abuja to serve graduates living and working in the Federal Capital Territory. The inaugural meeting, attended by over 50 alumni, featured networking opportunities and discussions on how to strengthen the FUD brand in the capital. The chapter plans to organize regular events, professional development workshops, and community service activities. This expansion is part of the alumni association\'s strategy to create a more robust nationwide network that keeps graduates connected regardless of their location after university.',
    date: 'March 5, 2023',
    author: 'Regional Chapters Coordinator',
    category: 'Network',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
  },
  {
    id: '6',
    title: 'Alumni Donate State-of-the-Art Equipment to Science Lab',
    excerpt: 'The Class of 2005 has donated modern laboratory equipment to the university\'s science department.',
    content: 'The Class of 2005 has donated modern laboratory equipment to the university\'s science department as part of their reunion activities. The donation, valued at over ₦15 million, includes microscopes, spectrophotometers, and other essential tools for advanced scientific research and teaching. This contribution will significantly enhance the learning experience for current students and support faculty research endeavors. University authorities have expressed profound gratitude for this generous gesture, which exemplifies the spirit of giving back that FUD strives to instill in its graduates.',
    date: 'February 18, 2023',
    author: 'Development Office',
    category: 'Donation',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=2674&ixlib=rb-4.0.3'
  }
];

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredNews = newsData.filter(news => news.isFeatured);
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Alumni News</h1>
          <p className="text-gray-600">Stay updated with the latest news and announcements from the FUD alumni community</p>
        </div>

        {/* Featured News */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews[0] && (
              <Card className="overflow-hidden">
                <div className="h-64">
                  <img 
                    src={featuredNews[0].image} 
                    alt={featuredNews[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-2">
                    {featuredNews[0].category}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{featuredNews[0].title}</h3>
                  <p className="text-gray-600 mb-4">{featuredNews[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredNews[0].date}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredNews[0].author}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-3">
                  <Button variant="outline" className="text-fud-green border-fud-green hover:bg-fud-green hover:text-white">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {featuredNews.slice(1, 4).map((news) => (
                <Card key={news.id} className="overflow-hidden">
                  <div className="flex h-32">
                    <div className="w-1/3">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="w-2/3 p-4">
                      <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded mb-1">
                        {news.category}
                      </div>
                      <h3 className="font-bold mb-1 line-clamp-1">{news.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{news.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{news.date}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {/* All News */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All News</h2>
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="announcement">Announcements</TabsTrigger>
                <TabsTrigger value="achievement">Achievements</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-block px-2 py-1 bg-fud-green-50 text-fud-green text-xs rounded">
                      {news.category}
                    </div>
                    <div className="text-xs text-gray-500">
                      {news.date}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span>{news.author}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                  <Button variant="link" className="text-fud-green p-0 h-auto">
                    Read More
                  </Button>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>{news.category}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
