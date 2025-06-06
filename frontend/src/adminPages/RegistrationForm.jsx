import React, { useState, useEffect } from 'react';

const RegistrationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    eventId: '',
    eventName: '',
    status: 'Pending'
  });
  
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  // Mock fetch events and users - replace with your actual API calls
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Replace with actual API data
        const mockEvents = [
          { id: 201, name: 'Tech Conference 2023' },
          { id: 202, name: 'Design Workshop' },
          { id: 203, name: 'Annual Meetup' },
          { id: 204, name: 'Hackathon 2023' },
        ];
        
        setEvents(mockEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoadingEvents(false);
      }
    };
    
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Replace with actual API data
        const mockUsers = [
          { id: 101, name: 'John Doe' },
          { id: 102, name: 'Jane Smith' },
          { id: 103, name: 'Robert Johnson' },
          { id: 104, name: 'Emily Davis' },
          { id: 105, name: 'Michael Wilson' },
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    
    fetchEvents();
    fetchUsers();
  }, []);
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUserChange = (e) => {
    const userId = e.target.value;
    const selectedUser = users.find(user => user.id.toString() === userId);
    
    setFormData(prev => ({
      ...prev,
      userId,
      userName: selectedUser ? selectedUser.name : ''
    }));
  };
  
  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const selectedEvent = events.find(event => event.id.toString() === eventId);
    
    setFormData(prev => ({
      ...prev,
      eventId,
      eventName: selectedEvent ? selectedEvent.name : ''
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          User
        </label>
        <select
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleUserChange}
          required
          disabled={isLoadingUsers}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
          Event
        </label>
        <select
          id="eventId"
          name="eventId"
          value={formData.eventId}
          onChange={handleEventChange}
          required
          disabled={isLoadingEvents}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
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
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;