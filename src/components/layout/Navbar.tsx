
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Search, 
  User, 
  X, 
  LogIn,
  LogOut,
  GraduationCap,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUserData(data);
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        
        // When user signs in, fetch their profile data
        if (session?.user) {
          setTimeout(async () => {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            setUserData(data);
          }, 0);
        } else {
          setUserData(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Site Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-fud-green rounded-lg p-1 mr-2">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fud-green-dark">FUD Alumni</h1>
                <p className="text-xs text-fud-neutralGray">Connect Hub</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/alumni/directory" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Alumni</Link>
            <Link to="/events" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Events</Link>
            <Link to="/alumni/gallery" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Gallery</Link>
            <Link to="/news" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">News</Link>
          </div>

          {/* Authentication Buttons - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center px-2 py-2">
                  <input 
                    type="search" 
                    className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-fud-green"
                    placeholder="Search alumni..." 
                  />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {!user ? (
              <>
                <Button variant="ghost" asChild className="mr-2">
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-1" />
                    <span>Login</span>
                  </Link>
                </Button>
                
                <Button asChild className="bg-fud-green hover:bg-fud-green-dark">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userData?.profile_image_url} />
                        <AvatarFallback>
                          {userData?.first_name?.[0]}{userData?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{userData?.first_name || 'Alumni'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/alumni/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/alumni/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-fud-green focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/alumni/directory"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Alumni
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/alumni/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/news"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              {!user ? (
                <>
                  <div className="flex items-center px-3">
                    <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">
                        <LogIn className="h-5 w-5 mr-2" />
                        <span>Login</span>
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 px-3">
                    <Button className="w-full bg-fud-green hover:bg-fud-green-dark" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center px-3">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={userData?.profile_image_url} />
                      <AvatarFallback>
                        {userData?.first_name?.[0]}{userData?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{userData?.first_name} {userData?.last_name}</span>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Link
                      to="/alumni/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/alumni/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
