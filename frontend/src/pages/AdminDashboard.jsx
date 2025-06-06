import React, { useState, useEffect } from 'react';
import Sidebar from '../adminPages/Sidebar';
import Header from '../adminPages/Header';
import DashboardOverview from '../adminPages/DashboardOverview';
import UsersList from '../adminPages/UsersList';
import RegistrationsList from '../adminPages/RegistrationsList';
import EventsList from '../adminPages/EventsList';
import { Menu } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null); // will store admin details
  const [loading, setLoading] = useState(true);

  // Fetch admin details using token
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); // or sessionStorage or context
      if (!token) {
        console.error('Token not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8086/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UsersList />;
      case 'registrations':
        return <RegistrationsList />;
      case 'events':
        return <EventsList />;
      default:
        return <DashboardOverview />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - fixed position on large screens, slide over on small screens */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex-shrink-0`}
      >
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={true} // Always true, as we control visibility with the parent div
        />
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header user={user} toggleSidebar={toggleSidebar}>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        </Header>
        
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" 
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Main content with scrollable area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
        
        {/* Footer - fixed at bottom */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4 text-center text-sm text-gray-600">
          Admin Dashboard © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;