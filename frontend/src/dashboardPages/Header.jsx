import React from 'react';

const Header = ({ userData, handleLogout, dropdownOpen, toggleDropdown }) => {
  // Get user's initial for avatar
  const getInitial = () => {
    if (!userData || !userData.name) return '?';
    return userData.name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="font-bold text-2xl flex items-center gap-2 tracking-tight">
        <span className="text-3xl">📅</span>
        Event Manager
      </div>

      {userData && (
        <div className="relative">
          <button 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 ${
              dropdownOpen ? 'bg-red-800' : 'hover:bg-red-700'
            }`}
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="w-10 h-10 rounded-full bg-white text-red-700 flex items-center justify-center font-bold border-2 border-red-200 shadow ring-2 ring-red-400/30">
              {getInitial()}
            </div>
            <span className="ml-2 font-medium">{userData.name}</span>
            <svg
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-red-200' : 'text-red-100'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          <div 
            className={`absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-red-100 overflow-hidden transition-all duration-300 ${
              dropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
            }`}
          >
            <div className="flex flex-col py-2">
              <a 
                href="#profile"
                className="px-5 py-3 text-gray-800 hover:bg-red-50 flex items-center gap-3 border-l-4 border-transparent hover:border-red-600 font-medium transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                <span>👤</span> My Profile
              </a>
              <a 
                href="#settings"
                className="px-5 py-3 text-gray-800 hover:bg-red-50 flex items-center gap-3 border-l-4 border-transparent hover:border-red-600 font-medium transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                <span>⚙️</span> Settings
              </a>
              <button 
                className="w-full text-left px-5 py-3 text-red-700 hover:bg-red-100 flex items-center gap-3 border-t border-red-100 font-semibold transition-all duration-200"
                onClick={() => {
                  handleLogout();
                  toggleDropdown();
                }}
              >
                <span>🚪</span> <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
