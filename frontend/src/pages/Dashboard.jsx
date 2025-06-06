import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Component imports
import Header from '../dashboardPages/Header';
import LoadingState from '../dashboardPages/LoadingState';
import ErrorState from '../dashboardPages/ErrorState';
import TabNavigation from '../dashboardPages/TabNavigation';
import AllEventsTab from '../dashboardPages/AllEventsTab';
import MyEventsTab from '../dashboardPages/MyEventsTab';
import ProfileTab from '../dashboardPages/ProfileTab';
import { formatDate, formatTime } from '../dashboardPages/utils';
import API_BASE_URL from '../api/config.js';


export default function UserDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('allEvents');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allEventsResponse = await axios.get(`${API_BASE_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const registeredEventsResponse = await axios.get(`${API_BASE_URL}/register/my-registrations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(userResponse.data);
        setEditedUser(userResponse.data);
        setEvents(allEventsResponse.data);
        setRegisteredEvents(registeredEventsResponse.data);
      } catch (error) {
        setError(`Failed to load data. Please try again. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const registerForEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/register/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const registeredEventsResponse = await axios.get(`${API_BASE_URL}/register/my-registrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegisteredEvents(registeredEventsResponse.data);
    } catch (error) {
      setError(`Failed to register for event. ${error}`);
    }
  };

  const cancelRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/register/${registrationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegisteredEvents(registeredEvents.filter(reg => reg.id !== registrationId));
    } catch (error) {
      setError(`Failed to cancel registration. ${error}`);
    }
  };

  const saveProfileChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/user/update`,
        editedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(editedUser);
      setIsEditingProfile(false);
    } catch (error) {
      setError(`Failed to update profile. ${error}`);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({...editedUser, [name]: value});
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isRegisteredForEvent = (eventId) => {
    return registeredEvents.some(reg => reg.event.id === eventId);
  };

  const getRegistrationId = (eventId) => {
    const registration = registeredEvents.find(reg => reg.event.id === eventId);
    return registration ? registration.id : null;
  };

  const renderTabContent = () => {
    if (loading) {
      return <LoadingState />;
    }

    switch (activeTab) {
      case 'allEvents':
        return (
          <AllEventsTab 
            events={events}
            isRegisteredForEvent={isRegisteredForEvent}
            registerForEvent={registerForEvent}
            getRegistrationId={getRegistrationId}
            cancelRegistration={cancelRegistration}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      case 'myEvents':
        return (
          <MyEventsTab 
            registeredEvents={registeredEvents}
            cancelRegistration={cancelRegistration}
            setActiveTab={setActiveTab}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        );
      case 'profile':
        return (
          <ProfileTab 
            userData={userData}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            editedUser={editedUser}
            handleProfileChange={handleProfileChange}
            saveProfileChanges={saveProfileChanges}
          />
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-red-100 flex flex-col">
      {/* Red-themed header bar */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
        <Header 
          userData={userData} 
          handleLogout={handleLogout}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
        />
        {/* Decorative background pattern (optional) */}
        <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none" />
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        {/* Error State */}
        {error && (
          <div className="mb-6">
            <ErrorState message={error} />
          </div>
        )}

        {/* Tab Navigation with red theme */}
        <div className="mb-8">
          <TabNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            tabClassName="text-red-700 border-b-2 border-transparent hover:border-red-600 hover:text-red-800 font-semibold transition-colors"
            activeTabClassName="border-red-700 text-red-800"
            containerClassName="bg-white rounded-xl shadow-md px-4 py-2"
          />
        </div>

        {/* Main content card with red accent shadow */}
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          {renderTabContent()}
        </div>
      </main>

      {/* Custom CSS for background pattern and animation */}
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
