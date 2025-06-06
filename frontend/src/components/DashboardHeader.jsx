import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, LogOut, Settings, Calendar, Search } from 'lucide-react';

export default function DashboardHeader({ userData, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Create full name from firstName and lastName properties
  const fullName = userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}`
    : userData?.firstName || userData?.lastName || 'User';

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-red-700 font-bold text-lg">ED</span>
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight">EventDash</span>
            </div>
            <button 
              className="ml-4 md:hidden rounded-md p-2 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-white transition duration-150"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-red-300" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-red-600 rounded-full bg-red-800/30 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-red-800/50"
                placeholder="Search events..."
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition duration-150 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Calendar
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-800 transition duration-150">
              Explore
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="p-1 rounded-full hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-white transition duration-150"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-red-900"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in-down">
                  <div className="py-2 px-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-2">
                    <div className="px-4 py-3 hover:bg-gray-50 transition duration-150">
                      <p className="text-sm font-medium text-gray-900">New event added: Tech Conference</p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 transition duration-150">
                      <p className="text-sm font-medium text-gray-900">Registration confirmed for Charity Run</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                  <div className="py-2 px-4 border-t border-gray-200">
                    <a href="#" className="text-xs font-medium text-red-600 hover:text-red-800">View all notifications</a>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-3" ref={profileRef}>
              <button 
                className="flex items-center space-x-2 max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white transition duration-150"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {userData?.profileImage ? (
                    <img src={userData.profileImage} alt={fullName} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <span className="hidden md:inline-block text-sm font-medium">{fullName}</span>
              </button>
              
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in-down">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center">
                    <User className="mr-2 h-4 w-4" /> Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </a>
                  <button 
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 transition duration-150 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-800 transition duration-150">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-800 transition duration-150">
              Calendar
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-800 transition duration-150">
              Explore
            </a>
          </div>
          
          {/* Mobile search bar */}
          <div className="px-2 pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-red-300" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-red-600 rounded-full bg-red-800/30 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-red-800/50"
                placeholder="Search events..."
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}