import React from 'react';
import { Calendar, Clock, MapPin, X } from 'lucide-react';

export default function RegisteredEventCard({ registration, onCancel, formatDate, formatTime }) {
  const event = registration.event;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-4 py-2 font-semibold tracking-wide">
        Registered
      </div>
      
      <img 
        src="/api/placeholder/300/200"
        alt={event.eventName} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-red-800">{event.eventName}</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-red-700">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-red-700">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>{formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center text-red-700">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3">{event.description || "No description available."}</p>
        
        <button 
          onClick={onCancel}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-2 rounded-lg shadow hover:from-red-700 hover:to-red-800 transition flex items-center justify-center"
        >
          <X size={16} className="mr-2" />
          Cancel Registration
        </button>
      </div>
    </div>
  );
}
