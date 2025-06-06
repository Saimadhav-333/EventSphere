import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, Plus, Calendar, Users, MapPin, AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import EventForm from './EventForm';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [registrationsCount, setRegistrationsCount] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);
        const token = localStorage.getItem('token');
        const eventsResponse = await axios.get('http://localhost:8086/admin/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch registrations data
        const registrationsResponse = await axios.get('http://localhost:8086/admin/registrations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Count registrations per event
        const registrationsByEvent = {};
        registrationsResponse.data.forEach(registration => {
          if (registration.event && registration.event.id) {
            const eventId = registration.event.id;
            registrationsByEvent[eventId] = (registrationsByEvent[eventId] || 0) + 1;
          }
        });

        setRegistrationsCount(registrationsByEvent);

        // Format events for display with actual registration counts
        const fetchedEvents = eventsResponse.data.map((event) => ({
          ...event,
          registrations: registrationsByEvent[event.id] || 0
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    (event.eventName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8086/admin/events/${eventToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event. Please try again later.');
    }
  };

  const handleSubmitEvent = async (eventData) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (currentEvent) {
        // PUT (Update)
        const response = await axios.put(
          `http://localhost:8086/admin/events/${currentEvent.id}`,
          eventData,
          config
        );

        const updatedEvent = {
          ...response.data,
          registrations: registrationsCount[currentEvent.id] || 0,
        };

        setEvents(events.map(event => event.id === currentEvent.id ? updatedEvent : event));
      } else {
        // POST (Create)
        const response = await axios.post(
          'http://localhost:8086/admin/events',
          eventData,
          config
        );

        const newEvent = {
          ...response.data,
          registrations: 0,
        };

        setEvents([...events, newEvent]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Failed to save event. Please try again later.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="mt-1 text-sm text-gray-500">Manage upcoming and past events</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          Add Event
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                <th className="px-6 py-3 relative text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchQuery ? 'No events matching your search' : 'No events found'}
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => {
                  const isUpcoming = new Date(event.date) > new Date();
                  const registrationStatus = event.maxParticipants 
                    ? (event.registrations / event.maxParticipants) * 100
                    : 0;
                  let statusColor = 'bg-green-500';

                  if (registrationStatus >= 90) statusColor = 'bg-red-500';
                  else if (registrationStatus >= 70) statusColor = 'bg-yellow-500';

                  return (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.eventName}</div>
                        <div className="text-xs text-gray-500">ID: {event.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {isUpcoming ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Upcoming
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Past
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{event.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.maxParticipants ?? 'Unlimited'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users size={16} className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {event.registrations} / {event.maxParticipants ?? '∞'}
                          </div>
                        </div>
                        {event.maxParticipants && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className={`${statusColor} h-2 rounded-full`}
                              style={{ width: `${Math.min(100, registrationStatus)}%` }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredEvents.length}</span> of{' '}
              <span className="font-medium">{events.length}</span> events
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentEvent ? 'Edit Event' : 'Add Event'}
      >
        <EventForm
          initialData={currentEvent}
          onSubmit={handleSubmitEvent}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="p-6">
          <div className="mb-4 flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Delete Event</h3>
              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to delete "{eventToDelete?.eventName}"? This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteEvent}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventsList;