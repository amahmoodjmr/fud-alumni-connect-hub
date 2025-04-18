
import { Link } from 'react-router-dom';
import { LogIn, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  return (
    <>
      <Button variant="ghost" asChild className="mr-2">
        <Link to="/login">
          <LogIn className="h-5 w-5 mr-1" />
          <span>Login</span>
        </Link>
      </Button>
      
      <Button asChild className="bg-fud-green hover:bg-fud-green-dark mr-2">
        <Link to="/register">Register</Link>
      </Button>

      <Button variant="outline" asChild>
        <Link to="/admin/login">
          <ShieldCheck className="h-5 w-5 mr-1" />
          <span>Admin</span>
        </Link>
      </Button>
    </>
  );
};
