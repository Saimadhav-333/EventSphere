import React from 'react';
import RegisteredEventCard from './RegisteredEventCard';

export default function MyEventsTab({ 
  registeredEvents, 
  cancelRegistration, 
  setActiveTab, 
  formatDate, 
  formatTime 
}) {
  return registeredEvents.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {registeredEvents.map(registration => (
        <RegisteredEventCard 
          key={registration.id} 
          registration={registration}
          onCancel={() => cancelRegistration(registration.id)}
          formatDate={formatDate}
          formatTime={formatTime}
        />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-inner border border-red-100">
      <svg width="48" height="48" fill="none" className="mb-4">
        <circle cx="24" cy="24" r="24" fill="#F87171" fillOpacity="0.1" />
        <path d="M16 24h16M24 16v16" stroke="#F87171" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <p className="text-red-600 text-lg font-semibold mb-4">You haven't registered for any events yet.</p>
      <button 
        onClick={() => setActiveTab('allEvents')} 
        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-700 hover:to-red-800 transition"
      >
        Browse Events
      </button>
    </div>
  );
}
