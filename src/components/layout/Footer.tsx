import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-fud-green-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-2" />
              <div>
                <h1 className="text-xl font-bold">FUD Alumni</h1>
                <p className="text-xs text-gray-300">Connect Hub</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              The Federal University Dutse Alumni Connect Hub brings together graduates to network, 
              collaborate, and contribute to the development of our alma mater.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition-colors text-sm">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Alumni Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Alumni Services</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/alumni-directory" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/career-paths" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Career Paths
                </Link>
              </li>
              <li>
                <Link to="/payments" className="text-gray-300 hover:text-white transition-colors text-sm"></Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors text-sm"></Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-300 mt-0.5" />
                <span className="text-sm text-gray-300">
                  Federal University Dutse, Jigawa State, Nigeria
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-sm text-gray-300">alumni@fud.edu.ng</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-sm text-gray-300">+234 123 4567 890</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-fud-green-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} FUD Alumni Connect Hub. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;