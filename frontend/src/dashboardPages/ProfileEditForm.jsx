import React from 'react';

export default function ProfileEditForm({ user, onChange, onSave, onCancel }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-800">Edit Profile</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onCancel}
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-red-700 hover:to-red-800 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-700 text-5xl font-bold shadow ring-2 ring-red-200">
            {user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
        
        <div className="flex-grow space-y-4">
          <div>
            <label className="block text-sm font-semibold text-red-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName || ''}
              onChange={onChange}
              className="w-full px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-red-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName || ''}
              onChange={onChange}
              className="w-full px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-red-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={onChange}
              className="w-full px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-red-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone || ''}
              onChange={onChange}
              className="w-full px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
