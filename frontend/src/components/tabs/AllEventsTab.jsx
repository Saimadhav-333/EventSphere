import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, Users } from 'lucide-react';
import EventCard from '../ui/EventCard';

export default function AllEventsTab({ 
  events = [], // Add default empty array
  isRegisteredForEvent, 
  registerForEvent, 
  getRegistrationId, 
  cancelRegistration,
  formatDate,
  formatTime
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'arts', name: 'Arts & Culture' },
    { id: 'sports', name: 'Sports' }
  ];
  
  const filteredEvents = events.filter(event => {
    if (!event) return false; // Skip if event is undefined
    const matchesSearch = (event.eventName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                         (event.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Discover Events</h1>
        <p className="text-gray-600">Find and register for upcoming events in your area</p>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          <div className="inline-flex rounded-md shadow-sm">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0 transition-colors duration-200`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" /> More Filters
          </button>
        </div>
      </div>
      
      {/* Featured Event */}
      {filteredEvents.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Event</h2>
          <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3">
                <img 
                  className="h-48 w-full object-cover md:h-full" 
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt={filteredEvents[0].eventName}
                />
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <div className="uppercase tracking-wide text-sm text-red-100 font-semibold">
                  {filteredEvents[0].category || 'Featured'}
                </div>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {filteredEvents[0].eventName}
                </h3>
                <p className="mt-3 text-red-100">
                  {filteredEvents[0].description || 'Join us for this exciting event!'}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-red-100">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(filteredEvents[0].date)}</span>
                  </div>
                  <div className="flex items-center text-red-100">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTime(filteredEvents[0].time || filteredEvents[0].date)}</span>
                  </div>
                  <div className="flex items-center text-red-100">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{filteredEvents[0].location || 'Online'}</span>
                  </div>
                  {filteredEvents[0].maxParticipants && (
                    <div className="flex items-center text-red-100">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Max: {filteredEvents[0].maxParticipants}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  {isRegisteredForEvent(filteredEvents[0].id) ? (
                    <button
                      onClick={() => cancelRegistration(getRegistrationId(filteredEvents[0].id))}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                    >
                      Cancel Registration
                    </button>
                  ) : (
                    <button
                      onClick={() => registerForEvent(filteredEvents[0].id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-100 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Events Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Events</h2>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.slice(1).map((event) => (
              <EventCard
                key={event.id}
                event={{
                  ...event,
                  name: event.eventName,
                  time: event.time || event.date
                }}
                isRegistered={isRegisteredForEvent(event.id)}
                onRegister={() => registerForEvent(event.id)}
                onCancel={() => cancelRegistration(getRegistrationId(event.id))}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}