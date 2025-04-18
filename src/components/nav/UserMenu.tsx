
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  userData: any;
  onLogout: () => void;
}

export const UserMenu = ({ userData, onLogout }: UserMenuProps) => {
  return (
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
          <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
