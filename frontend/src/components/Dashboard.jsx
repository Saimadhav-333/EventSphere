import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component imports
import DashboardHeader from './DashboardHeader';
import TabNavigation from './TabNavigation';
import AllEventsTab from './tabs/AllEventsTab';
import MyEventsTab from './tabs/MyEventsTab';
import ProfileTab from './tabs/ProfileTab';
import LoadingScreen from './ui/LoadingScreen';
import ErrorAlert from './ui/ErrorAlert';
import { formatDate, formatTime } from './utils/dateUtils';
import API_BASE_URL from '../api/config.js';


export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('allEvents');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({});

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
      await axios.delete(`http://localhost:8086/register/${registrationId}`, {
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
      console.log(editedUser);
      
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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <DashboardHeader userData={userData} onLogout={handleLogout} />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorAlert message={error} onDismiss={() => setError("")} />}
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6 transition-all duration-300 ease-in-out">
          {activeTab === 'allEvents' && (
            <AllEventsTab 
              events={events}
              isRegisteredForEvent={isRegisteredForEvent}
              registerForEvent={registerForEvent}
              getRegistrationId={getRegistrationId}
              cancelRegistration={cancelRegistration}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}
          
          {activeTab === 'myEvents' && (
            <MyEventsTab 
              registeredEvents={registeredEvents}
              cancelRegistration={cancelRegistration}
              setActiveTab={setActiveTab}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}
          
          {activeTab === 'profile' && (
            <ProfileTab 
              userData={userData}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              editedUser={editedUser}
              handleProfileChange={handleProfileChange}
              saveProfileChanges={saveProfileChanges}
            />
          )}
        </div>
      </main>
    </div>
  );
}