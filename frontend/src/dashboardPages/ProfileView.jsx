import React from 'react';

const ProfileView = ({ user, onEditClick }) => {
  // Sample user data if none provided
  const userData = user || {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: '/api/placeholder/150/150',
    joinDate: 'January 2023',
    eventsAttended: 12,
    eventsCreated: 5,
    bio: 'Event enthusiast and community organizer with a passion for bringing people together.',
    interests: ['Music', 'Technology', 'Food', 'Art']
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="relative">
          <img 
            src={userData.avatar} 
            alt={`${userData.name}'s profile`} 
            className="w-24 h-24 rounded-full object-cover border-4 border-red-200 shadow ring-2 ring-red-400/30"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-red-800">{userData.name}</h1>
          <p className="text-red-600">{userData.email}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
            <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
              Member since {userData.joinDate}
            </span>
            <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
              {userData.eventsAttended} Events Attended
            </span>
            <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
              {userData.eventsCreated} Events Created
            </span>
          </div>
        </div>

        {/* Edit Button */}
        <button 
          onClick={onEditClick}
          className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors shadow font-semibold flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-red-100"></div>

      {/* Bio Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">About</h2>
        <p className="text-gray-700">{userData.bio}</p>
      </div>

      {/* Interests */}
      <div>
        <h2 className="text-lg font-semibold text-red-800 mb-2">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {userData.interests.map((interest, index) => (
            <span 
              key={index} 
              className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="text-red-700 font-bold text-xl">{userData.eventsAttended}</div>
          <div className="text-gray-600 text-sm">Events Attended</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="text-red-700 font-bold text-xl">{userData.eventsCreated}</div>
          <div className="text-gray-600 text-sm">Events Created</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-sm flex flex-col items-center">
          <div className="text-red-700 font-bold text-xl">4.8</div>
          <div className="text-gray-600 text-sm">Average Rating</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
