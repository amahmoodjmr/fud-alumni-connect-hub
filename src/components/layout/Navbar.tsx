import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavLogo } from '@/components/nav/NavLogo';
import { NavLinks } from '@/components/nav/NavLinks';
import { AuthButtons } from '@/components/nav/AuthButtons';
import { UserMenu } from '@/components/nav/UserMenu';
import { MobileMenu } from '@/components/nav/MobileMenu';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        const {
          data
        } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setUserData(data);
      }
    };
    checkSession();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        setTimeout(async () => {
          const {
            data
          } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          setUserData(data);
        }, 0);
      } else {
        setUserData(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    const {
      error
    } = await supabase.auth.signOut();
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
  return <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLogo />
          <NavLinks />

          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                
              </DropdownMenuContent>
            </DropdownMenu>

            {!user ? <AuthButtons /> : <UserMenu userData={userData} onLogout={handleLogout} />}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-fud-green focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} user={user} userData={userData} onClose={() => setIsMenuOpen(false)} onLogout={handleLogout} />
    </nav>;
};
export default Navbar;