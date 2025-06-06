import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Search, Filter, ChevronRight, User } from 'lucide-react';

export default function MyEventsTab({ 
  registeredEvents, 
  cancelRegistration, 
  setActiveTab,
  formatDate,
  formatTime
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('upcoming');
  
  const filters = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'past', name: 'Past' },
    { id: 'all', name: 'All Events' }
  ];
  
  // Filter events based on search term and selected filter
  const filteredEvents = registeredEvents.filter(registration => {
    const event = registration.event;
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter based on date
    const eventDate = new Date(event.date);
    const today = new Date();
    const matchesFilter = 
      selectedFilter === 'all' || 
      (selectedFilter === 'upcoming' && eventDate >= today) ||
      (selectedFilter === 'past' && eventDate < today);

    return matchesSearch && matchesFilter;
  });

  // Helper function to format date from ISO string
  const displayDate = (dateString) => {
    if (!dateString) return "Date not specified";
    try {
      if (formatDate) return formatDate(dateString);
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString+e;
    }
  };

  // Helper function to extract time from ISO string
  const displayTime = (dateString) => {
    if (!dateString) return "Time not specified";
    try {
      if (formatTime) return formatTime(dateString);
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "Time not available"+e;
    }
  };

  // Get status badge styling based on status
  const getStatusBadge = (status) => {
    const statusStyles = {
      "PENDING": "bg-yellow-100 text-yellow-800",
      "CONFIRMED": "bg-green-100 text-green-800",
      "CANCELLED": "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Events</h1>
        <p className="text-gray-600">Manage your registered events</p>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your events..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="inline-flex rounded-md shadow-sm">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedFilter === filter.id
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0 transition-colors duration-200`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Calendar className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? "No events match your search criteria." 
              : "You haven't registered for any events yet."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => setActiveTab('allEvents')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Discover Events
            </button>
          </div>
        </div>
      )}
      
      {/* Events List */}
      {filteredEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredEvents.map((registration) => {
              const event = registration.event;
              return (
                <li key={registration.id} className="group hover:bg-red-50 transition-colors duration-150">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-red-700 truncate mr-3">{event.eventName}</h3>
                          {getStatusBadge(registration.status)}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5" />
                            <span>{displayDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5" />
                            <span>{displayTime(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5" />
                            <span>{event.location || "Online"}</span>
                          </div>
                          {event.maxParticipants && (
                            <div className="flex items-center">
                              <Users className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5" />
                              <span>Max: {event.maxParticipants}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-5 flex items-center space-x-2">
                        <button
                          onClick={() => cancelRegistration(registration.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          disabled={registration.status === "CANCELLED"}
                        >
                          Cancel
                        </button>
                        <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                          <span className="hidden sm:inline">Details</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* User information section */}
                    {registration.user && (
                      <div className="mt-2 border-t border-gray-100 pt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1.5" />
                          <span className="font-medium">{registration.user.firstName} {registration.user.lastName}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-500">{registration.user.email}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Event ID for reference */}
                    <div className="mt-2 text-xs text-gray-400">
                      Event ID: {event.id.substring(0, 8)}... • Registration ID: {registration.id.substring(0, 8)}...
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}