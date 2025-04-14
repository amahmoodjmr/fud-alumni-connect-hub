
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Search, 
  User, 
  X, 
  LogIn,
  BookOpen,
  GraduationCap,
  Image,
  CreditCard,
  Calendar
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/alumni" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Alumni</Link>
            <Link to="/events" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Events</Link>
            <Link to="/gallery" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Gallery</Link>
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

            <Button variant="ghost" asChild className="mr-2">
              <Link to="/login">
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            </Button>
            
            <Button asChild className="bg-fud-green hover:bg-fud-green-dark">
              <Link to="/register">Register</Link>
            </Button>
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
            >
              Home
            </Link>
            <Link
              to="/alumni"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
            >
              Alumni
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
            >
              Events
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
            >
              Gallery
            </Link>
            <Link
              to="/news"
              className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
            >
              News
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login</span>
                  </Link>
                </Button>
              </div>
              <div className="mt-3 px-3">
                <Button className="w-full bg-fud-green hover:bg-fud-green-dark" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
