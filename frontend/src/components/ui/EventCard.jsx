import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function EventCard({
  event,
  isRegistered,
  onRegister,
  onCancel,
  formatDate,
  formatTime
}) {
  // Generate a placeholder image if none provided
  const eventImage = event.image || `https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
 
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 flex flex-col">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          className="w-full h-48 object-cover"
          src={eventImage}
          alt={event.name || event.eventName}
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          {event.category || 'Event'}
        </div>
      </div>
     
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name || event.eventName}</h3>
       
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2 text-red-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-red-500" />
            <span>{formatTime(event.time || event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            <span>{event.location || 'Online'}</span>
          </div>
          {event.maxParticipants && (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2 text-red-500" />
              <span>Max: {event.maxParticipants}</span>
            </div>
          )}
        </div>
       
        <div className="border-t border-gray-200 pt-4 mt-auto">
          {isRegistered ? (
            <button
              onClick={onCancel}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Cancel Registration
            </button>
          ) : (
            <button
              onClick={onRegister}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}