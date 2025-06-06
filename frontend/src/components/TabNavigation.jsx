import React from 'react';
import { Calendar, User, Home } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'allEvents', label: 'All Events', icon: <Home className="h-5 w-5" /> },
    { id: 'myEvents', label: 'My Events', icon: <Calendar className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex-1 flex items-center justify-center px-1 py-4 text-sm font-medium transition-all duration-200 ease-in-out border-b-2 ${
                activeTab === tab.id
                  ? 'border-red-700 text-red-700'
                  : 'border-transparent text-gray-500 hover:text-red-500 hover:border-red-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className={`p-1 rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-red-50 text-red-600' 
                    : 'text-gray-400 group-hover:text-red-500 group-hover:bg-red-50'
                } transition-colors duration-200`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}