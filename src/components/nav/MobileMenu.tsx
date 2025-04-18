
import { Link } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  userData: any;
  onClose: () => void;
  onLogout: () => void;
}

export const MobileMenu = ({ isOpen, user, userData, onClose, onLogout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/alumni/directory"
          className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
          onClick={onClose}
        >
          Alumni
        </Link>
        <Link
          to="/events"
          className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
          onClick={onClose}
        >
          Events
        </Link>
        <Link
          to="/alumni/gallery"
          className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
          onClick={onClose}
        >
          Gallery
        </Link>
        <Link
          to="/news"
          className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:text-white hover:bg-fud-green"
          onClick={onClose}
        >
          News
        </Link>

        <div className="pt-4 pb-3 border-t border-gray-200">
          {!user ? (
            <>
              <div className="flex items-center px-3">
                <Button variant="ghost" className="w-full justify-start" asChild onClick={onClose}>
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    <span>Login</span>
                  </Link>
                </Button>
              </div>
              <div className="mt-3 px-3">
                <Button className="w-full bg-fud-green hover:bg-fud-green-dark" asChild onClick={onClose}>
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
                  onClick={onClose}
                >
                  Dashboard
                </Link>
                <Link
                  to="/alumni/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-fud-darkGray hover:bg-gray-100"
                  onClick={onClose}
                >
                  My Profile
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500" 
                  onClick={() => {
                    onLogout();
                    onClose();
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
  );
};
