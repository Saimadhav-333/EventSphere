import React from 'react';
import { LayoutDashboard, Users, ClipboardList, Calendar, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'registrations', label: 'Registrations', icon: <ClipboardList size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`h-screen bg-indigo-700 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:w-64 flex-shrink-0 flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 bg-indigo-800">
        <h1 className="text-xl font-bold text-white">Admin Portal</h1>
      </div>
            
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-100 hover:bg-indigo-600'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
            
      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 text-indigo-100 hover:bg-indigo-600">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;