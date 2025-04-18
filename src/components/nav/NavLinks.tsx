
import { Link } from 'react-router-dom';

export const NavLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Home</Link>
      <Link to="/alumni/directory" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Alumni</Link>
      <Link to="/events" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Events</Link>
      <Link to="/alumni/gallery" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">Gallery</Link>
      <Link to="/news" className="link-underline text-fud-darkGray hover:text-fud-green px-3 py-2 text-sm font-medium">News</Link>
    </div>
  );
};
