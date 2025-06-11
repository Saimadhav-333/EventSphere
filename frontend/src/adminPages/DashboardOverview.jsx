import React, { useState, useEffect } from 'react';
import { Users, CalendarDays, ClipboardList, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import StatCard from '../adminPages/StatCard';
import RecentActivityList from './RecentActivityList';
import Chart from '../adminPages/Chart';
import API_BASE_URL from '../api/config.js';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch users, events, and registrations in parallel
        const [usersResponse, eventsResponse, registrationsResponse, pendingResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/users`, { headers }),
          axios.get(`${API_BASE_URL}/admin/events`, { headers }),
          axios.get(`${API_BASE_URL}/admin/registrations`, { headers }),
          axios.get(`${API_BASE_URL}/admin/registrations/pending`, { headers })
        ]);
        
        setStats({
          totalUsers: usersResponse.data.length,
          totalEvents: eventsResponse.data.length,
          totalRegistrations: registrationsResponse.data.length,
          pendingRegistrations: pendingResponse.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Fetch recent activities
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentActivities = async () => {
      setActivitiesLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/admin/activities/recent`, { headers });
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
        // Fallback to sample data if API fails
        setActivities([
          { id: 1, type: 'user_registered', user: 'John Doe', timestamp: new Date().toISOString() },
          { id: 2, type: 'event_created', title: 'Summer Conference', timestamp: new Date(Date.now() - 86400000).toISOString() },
          { id: 3, type: 'registration_approved', user: 'Jane Smith', event: 'Technical Workshop', timestamp: new Date(Date.now() - 172800000).toISOString() }
        ]);
      } finally {
        setActivitiesLoading(false);
      }
    };
    
    fetchRecentActivities();
  }, []);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setActivitiesLoading(true);
    setError(null);
    
    Promise.all([
      axios.get(`${API_BASE_URL}/admin/users`, { headers }),
      axios.get(`${API_BASE_URL}/admin/events`, { headers }),
      axios.get(`${API_BASE_URL}/admin/registrations`, { headers }),
      axios.get(`${API_BASE_URL}/admin/registrations/pending`, { headers }),
      axios.get(`${API_BASE_URL}/admin/activities/recent`, { headers })
    ]).then(([usersResponse, eventsResponse, registrationsResponse, pendingResponse, activitiesResponse]) => {
      setStats({
        totalUsers: usersResponse.data.length,
        totalEvents: eventsResponse.data.length,
        totalRegistrations: registrationsResponse.data.length,
        pendingRegistrations: pendingResponse.data.length
      });
      setActivities(activitiesResponse.data);
    }).catch(error => {
      console.error('Error refreshing dashboard data:', error);
      setError('Failed to refresh dashboard data. Please try again later.');
    }).finally(() => {
      setIsLoading(false);
      setActivitiesLoading(false);
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Refresh'
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white h-32 rounded-lg shadow-sm animate-pulse">
              <div className="p-6 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<Users size={24} className="text-blue-600" />}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard 
            title="Events" 
            value={stats.totalEvents} 
            icon={<CalendarDays size={24} className="text-emerald-600" />}
            bgColor="bg-emerald-50"
            textColor="text-emerald-600"
          />
          <StatCard 
            title="Registrations" 
            value={stats.totalRegistrations} 
            icon={<ClipboardList size={24} className="text-amber-600" />}
            bgColor="bg-amber-50"
            textColor="text-amber-600"
          />
          <StatCard 
            title="Pending Approvals" 
            value={stats.pendingRegistrations} 
            icon={<AlertTriangle size={24} className="text-red-600" />}
            bgColor="bg-red-50"
            textColor="text-red-600"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Registration Trends</h2>
            </div>
            <div className="p-6 h-64">
              <Chart />
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              {activitiesLoading && (
                <div className="h-4 w-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
              )}
            </div>
            <RecentActivityList activities={activities} isLoading={activitiesLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;



// import React, { useState, useEffect } from 'react';
// import { Users, CalendarDays, ClipboardList, AlertTriangle } from 'lucide-react';
// import StatCard from '../adminPages/StatCard';
// import RecentActivityList from './RecentActivityList';
// import Chart from '../adminPages/Chart';

// const DashboardOverview = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalEvents: 0,
//     totalRegistrations: 0,
//     pendingRegistrations: 0
//   });
  
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Mock fetch dashboard data - replace with your actual API call
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 800));
        
//         // Replace with actual API data
//         setStats({
//           totalUsers: 1245,
//           totalEvents: 24,
//           totalRegistrations: 856,
//           pendingRegistrations: 15
//         });
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//   }, []);
  
//   // Mock activities - replace with actual data from your API
//   const recentActivities = [
//     { id: 1, type: 'user_registered', user: 'John Doe', timestamp: '2023-05-15T14:22:31Z' },
//     { id: 2, type: 'event_created', title: 'Summer Conference', timestamp: '2023-05-14T10:15:42Z' },
//     { id: 3, type: 'registration_approved', user: 'Jane Smith', event: 'Technical Workshop', timestamp: '2023-05-14T09:05:12Z' },
//     { id: 4, type: 'registration_rejected', user: 'Mike Johnson', event: 'Annual Gala', timestamp: '2023-05-13T16:48:22Z' },
//     { id: 5, type: 'user_updated', user: 'Sarah Williams', timestamp: '2023-05-13T11:32:40Z' },
//   ];
  
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening.</p>
//       </div>
      
//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-white h-32 rounded-lg shadow-sm animate-pulse"></div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard 
//             title="Total Users" 
//             value={stats.totalUsers} 
//             icon={<Users size={24} className="text-blue-600" />}
//             bgColor="bg-blue-50"
//             textColor="text-blue-600"
//           />
//           <StatCard 
//             title="Events" 
//             value={stats.totalEvents} 
//             icon={<CalendarDays size={24} className="text-emerald-600" />}
//             bgColor="bg-emerald-50"
//             textColor="text-emerald-600"
//           />
//           <StatCard 
//             title="Registrations" 
//             value={stats.totalRegistrations} 
//             icon={<ClipboardList size={24} className="text-amber-600" />}
//             bgColor="bg-amber-50"
//             textColor="text-amber-600"
//           />
//           <StatCard 
//             title="Pending Approvals" 
//             value={stats.pendingRegistrations} 
//             icon={<AlertTriangle size={24} className="text-red-600" />}
//             bgColor="bg-red-50"
//             textColor="text-red-600"
//           />
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">Registration Trends</h2>
//             </div>
//             <div className="p-6 h-64">
//               <Chart />
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
//             </div>
//             <RecentActivityList activities={recentActivities} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;