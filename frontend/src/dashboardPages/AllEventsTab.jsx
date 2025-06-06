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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="col-span-3 text-center py-16">
          <p className="text-gray-500">No events are currently available.</p>
        </div>
      )}
    </div>
  );
}