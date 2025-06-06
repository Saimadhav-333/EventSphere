// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, User, Menu, X, Bell } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md py-2" : "bg-gradient-to-r from-red-600 to-red-800 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Calendar 
                  className={`h-8 w-8 ${isScrolled ? "text-red-600" : "text-white"}`} 
                  strokeWidth={2.5} 
                />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
              </div>
              <span className={`font-bold text-2xl ${isScrolled ? "text-red-600" : "text-white"} tracking-tight`}>
                Event<span className="font-extrabold">App</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive("/") 
                  ? (isScrolled ? "text-red-600 bg-red-50" : "text-white bg-red-700") 
                  : (isScrolled ? "text-gray-700 hover:text-red-600 hover:bg-red-50" : "text-white/90 hover:text-white hover:bg-red-700")
              }`}>
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive("/about") 
                  ? (isScrolled ? "text-red-600 bg-red-50" : "text-white bg-red-700") 
                  : (isScrolled ? "text-gray-700 hover:text-red-600 hover:bg-red-50" : "text-white/90 hover:text-white hover:bg-red-700")
              }`}>
              About
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive("/contact") 
                  ? (isScrolled ? "text-red-600 bg-red-50" : "text-white bg-red-700") 
                  : (isScrolled ? "text-gray-700 hover:text-red-600 hover:bg-red-50" : "text-white/90 hover:text-white hover:bg-red-700")
              }`}>
              Contact
            </Link>
            
            <div className="flex items-center pl-6 space-x-4 border-l border-red-400/30">
              <button className="rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-all relative">
                <Bell className={isScrolled ? "h-5 w-5 text-red-500" : "h-5 w-5 text-white"} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-white"></span>
              </button>
              
              <Link 
                to="/login" 
                className={`font-medium text-sm transition-all ${
                  isScrolled ? "text-gray-700 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}>
                Log in
              </Link>
              
              <Link 
                to="/signup" 
                className={`flex items-center text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg shadow-red-200" 
                    : "bg-white text-red-600 hover:bg-red-50 shadow-md hover:shadow-lg shadow-red-900/20"
                }`}>
                <User className="mr-1.5 h-4 w-4" />
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? "text-gray-700 hover:text-red-500 hover:bg-red-50" : "text-white hover:bg-red-700"
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/") ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/about") ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/contact") ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-600 hover:bg-red-50"
            }`}
          >
            Contact
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block mt-1 px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}