import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Check, X, Calendar, User, MapPin, AlertCircle } from 'lucide-react';

const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [errorMessage, setErrorMessage] = useState(null);
  const [processingIds, setProcessingIds] = useState([]); // Track IDs of registrations being processed
  const [actionFeedback, setActionFeedback] = useState(null);
  
  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  // Configure axios defaults
  const api = axios.create({
    baseURL: 'http://localhost:8086',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // Add authorization header for each request
  api.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Fetch registrations from the API
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/registrations');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setErrorMessage('Failed to load registrations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegistrations();
  }, []);
  
  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get registration status - we'll default to "Pending" if not set
  const getRegistrationStatus = (registration) => {
    return registration.status || 'Pending';
  };
  
  // Show feedback message for a short duration
  const showFeedback = (message, type = 'success') => {
    setActionFeedback({ message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };
  
  // Handle approve registration
  const handleApprove = async (registrationId) => {
    try {
      setProcessingIds(prev => [...prev, registrationId]);
      
      // Call the API
      await api.put(`/register/accept/${registrationId}`);
      
      // Update the registration status in the local state
      setRegistrations(registrations.map(reg => 
        reg.id === registrationId ? { ...reg, status: 'Approved' } : reg
      ));
      
      showFeedback(`Registration ${registrationId} has been approved`);
    } catch (error) {
      console.error('Error approving registration:', error);
      showFeedback('Failed to approve registration. Please try again.', 'error');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== registrationId));
    }
  };
  
  // Handle reject registration
  const handleReject = async (registrationId) => {
    try {
      setProcessingIds(prev => [...prev, registrationId]);
      
      // Call the API
      await api.put(`/register/reject/${registrationId}`);
      
      // Update the registration status in the local state
      setRegistrations(registrations.map(reg => 
        reg.id === registrationId ? { ...reg, status: 'Rejected' } : reg
      ));
      
      showFeedback(`Registration ${registrationId} has been rejected`);
    } catch (error) {
      console.error('Error rejecting registration:', error);
      showFeedback('Failed to reject registration. Please try again.', 'error');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== registrationId));
    }
  };
  
  // Filter registrations based on search query and status filter
  const filteredRegistrations = registrations.filter((registration) => {
    // Extract user and event info safely
    const userName = registration.user ? 
      `${registration.user.firstName || ''} ${registration.user.lastName || ''}`.trim() : 
      'Unknown User';
    
    const eventName = registration.event ? registration.event.eventName || 'Unknown Event' : 'Unknown Event';
    const status = getRegistrationStatus(registration);
    
    const matchesSearch = 
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eventName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Determine if a registration is being processed
  const isProcessing = (registrationId) => {
    return processingIds.includes(registrationId);
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Registrations</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage participant registrations</p>
        </div>
      </div>
      
      {actionFeedback && (
        <div className={`p-4 rounded-md ${actionFeedback.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {actionFeedback.type === 'error' ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <Check className="h-5 w-5 text-green-400" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${actionFeedback.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
                {actionFeedback.message}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user or event..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="mt-3 sm:mt-0 flex items-center">
            <Filter size={16} className="text-gray-400 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        {errorMessage && (
          <div className="bg-red-50 p-4 border-b border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Registration List */}
        {isLoading ? (
          <div className="p-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
            <p className="text-center mt-4 text-gray-500">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No registrations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== 'All' 
                ? 'Try changing your search or filter criteria' 
                : 'No registrations are available at this time'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => {
                  const status = getRegistrationStatus(registration);
                  const user = registration.user;
                  const event = registration.event;
                  const processing = isProcessing(registration.id);
                  
                  return (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User size={16} className="text-indigo-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Unknown User'}
                            </div>
                            {user && <div className="text-xs text-gray-500">{user.email || 'No email'}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {event ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.eventName || 'Unknown Event'}</div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              {event.date && (
                                <span className="flex items-center mr-3">
                                  <Calendar size={12} className="mr-1" />
                                  {formatDate(event.date)}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center">
                                  <MapPin size={12} className="mr-1" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No event data</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {registration.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Always display buttons for all registrations */}
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleApprove(registration.id)}
                            disabled={processing || status === 'Approved'}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white ${
                              processing || status === 'Approved'
                                ? 'bg-green-300 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                            }`}
                            title="Approve"
                          >
                            {processing ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : status === 'Approved' ? (
                              <>
                                <Check size={14} className="mr-1" />
                                Approved
                              </>
                            ) : (
                              <>
                                <Check size={14} className="mr-1" />
                                Approve
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleReject(registration.id)}
                            disabled={processing || status === 'Rejected'}
                            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white ${
                              processing || status === 'Rejected'
                                ? 'bg-red-300 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                            }`}
                            title="Reject"
                          >
                            {processing ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : status === 'Rejected' ? (
                              <>
                                <X size={14} className="mr-1" />
                                Rejected
                              </>
                            ) : (
                              <>
                                <X size={14} className="mr-1" />
                                Reject
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination/Stats Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredRegistrations.length}</span> of{' '}
              <span className="font-medium">{registrations.length}</span> registrations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsList;