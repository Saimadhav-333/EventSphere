import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, FileText } from 'lucide-react';

const EventForm = ({ initialData, onSubmit, onCancel }) => {
  // Initialize form with fields that match backend structure
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    maxParticipants: 100,
    description: ''
  });
  
  useEffect(() => {
    if (initialData) {
      // Map incoming data to match our form fields
      setFormData({
        id: initialData.id,
        eventName: initialData.eventName || initialData.title || '',
        date: initialData.date ? initialData.date.split('T')[0] : '',
        location: initialData.location || '',
        maxParticipants: initialData.maxParticipants || initialData.capacity || 100,
        description: initialData.description || ''
      });
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a payload that matches what the backend expects
    const eventData = {
      id: formData.id,
      eventName: formData.eventName,
      location: formData.location,
      // Format date as ISO string with the time component
      date: formData.date ? `${formData.date}T18:00:00` : '',
      maxParticipants: parseInt(formData.maxParticipants),
      description: formData.description
    };
    
    onSubmit(eventData);
  };
  
  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="eventName"
            id="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="block w-full pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter event name"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Event Date
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={16} className="text-gray-400" />
          </div>
          <input
            type="date"
            name="date"
            id="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
            required
            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Event time will be set to 6:00 PM by default</p>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter venue location"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
          Maximum Participants
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users size={16} className="text-gray-400" />
          </div>
          <input
            type="number"
            name="maxParticipants"
            id="maxParticipants"
            min="1"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
            <FileText size={16} className="text-gray-400" />
          </div>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Provide event details here..."
          ></textarea>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;