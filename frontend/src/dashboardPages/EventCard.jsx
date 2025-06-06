import React from 'react';
import EventCard from './EventCard';

export default function AllEventsTab({ 
  events, 
  isRegisteredForEvent, 
  registerForEvent, 
  getRegistrationId, 
  cancelRegistration, 
  formatDate, 
  formatTime 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.length > 0 ? (
        events.map(event => (
          <EventCard 
            key={event.id} 
            event={event}
            isRegistered={isRegisteredForEvent(event.id)}
            onRegister={() => registerForEvent(event.id)}
            onCancel={() => cancelRegistration(getRegistrationId(event.id))}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        ))
      ) : (
        <div className="col-span-3 flex flex-col items-center justify-center py-20 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-inner border border-red-100">
          <svg width="48" height="48" fill="none" className="mb-4">
            <circle cx="24" cy="24" r="24" fill="#F87171" fillOpacity="0.1" />
            <path d="M16 24h16M24 16v16" stroke="#F87171" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-red-600 text-lg font-semibold">No events are currently available.</p>
        </div>
      )}
    </div>
  );
}
