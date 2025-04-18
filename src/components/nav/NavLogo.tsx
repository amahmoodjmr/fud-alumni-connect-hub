
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="bg-fud-green rounded-lg p-1 mr-2">
        <GraduationCap className="h-8 w-8 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-fud-green-dark">FUD Alumni</h1>
        <p className="text-xs text-fud-neutralGray">Connect Hub</p>
      </div>
    </Link>
  );
};
