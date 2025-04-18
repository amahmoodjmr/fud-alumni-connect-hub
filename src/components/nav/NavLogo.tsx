
import { Link } from 'react-router-dom';
import { University } from 'lucide-react';

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="bg-white rounded-lg p-1 mr-2">
        <img 
          src="/lovable-uploads/fud-logo.png" 
          alt="FUD Logo" 
          className="h-10 w-10 object-contain"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold text-fud-green-dark">FUD Alumni</h1>
        <p className="text-xs text-fud-neutralGray">Connect Hub</p>
      </div>
    </Link>
  );
};
