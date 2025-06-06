import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Define the tabs with their icons and labels
  const tabs = [
    { id: 'allEvents', label: 'All Events', icon: '🎟️' },
    { id: 'myEvents', label: 'My Events', icon: '📅' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="flex bg-white rounded-2xl shadow-md px-2 py-1 overflow-hidden border border-red-100">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex items-center gap-2 px-6 py-2 mx-1 my-1 rounded-full font-semibold text-base transition-all duration-200 relative overflow-hidden
            ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow'
                : 'text-red-700 hover:bg-red-50'
            }`}
          onClick={() => handleTabClick(tab.id)}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.label}
          {tab.id === 'myEvents' && (
            <span className={`ml-2 w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full shadow-sm
              ${
                activeTab === tab.id
                  ? 'bg-white bg-opacity-30 text-white'
                  : 'bg-red-100 text-red-700'
              }`}>
              3
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
