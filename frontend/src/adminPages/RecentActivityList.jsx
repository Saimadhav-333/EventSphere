import React from 'react';
import { Clock, User, Calendar, CheckCircle, XCircle, Settings } from 'lucide-react';

const RecentActivityList = ({ activities, isLoading = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registered':
      case 'user_updated':
        return <User size={16} className="text-blue-500" />;
      case 'event_created':
      case 'event_updated':
        return <Calendar size={16} className="text-emerald-500" />;
      case 'registration_approved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'registration_rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Settings size={16} className="text-gray-500" />;
    }
  };
  
  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'user_registered':
        return (
          <>
            <span className="font-medium text-gray-900">{activity.user}</span>
            <span className="text-gray-500"> registered a new account</span>
          </>
        );
      case 'user_updated':
        return (
          <>
            <span className="font-medium text-gray-900">{activity.user}</span>
            <span className="text-gray-500"> updated their profile</span>
          </>
        );
      case 'event_created':
        return (
          <>
            <span className="text-gray-500">New event created: </span>
            <span className="font-medium text-gray-900">{activity.title}</span>
          </>
        );
      case 'event_updated':
        return (
          <>
            <span className="text-gray-500">Event updated: </span>
            <span className="font-medium text-gray-900">{activity.title}</span>
          </>
        );
      case 'registration_approved':
        return (
          <>
            <span className="font-medium text-gray-900">{activity.user}</span>
            <span className="text-gray-500">'s registration for </span>
            <span className="font-medium text-gray-900">{activity.event}</span>
            <span className="text-gray-500"> was approved</span>
          </>
        );
      case 'registration_rejected':
        return (
          <>
            <span className="font-medium text-gray-900">{activity.user}</span>
            <span className="text-gray-500">'s registration for </span>
            <span className="font-medium text-gray-900">{activity.event}</span>
            <span className="text-gray-500"> was rejected</span>
          </>
        );
      default:
        return <span className="text-gray-500">Unknown activity</span>;
    }
  };
  
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffSecs < 60) {
        return 'just now';
      } else if (diffMins < 60) {
        return `${diffMins}m ago`;
      } else if (diffHours < 24) {
        return `${diffHours}h ago`;
      } else if (diffDays < 7) {
        return `${diffDays}d ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'unknown time';
    }
  };
  
  if (isLoading) {
    return (
      <div className="px-6 py-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="py-3 flex animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-gray-200">
      {activities.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          <p>No recent activities</p>
        </div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {getActivityIcon(activity.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-800 line-clamp-2">
                  {getActivityText(activity)}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {activities.length > 0 && (
        <div className="px-6 py-3 bg-gray-50">
          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            View all activity
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentActivityList;


// import React from 'react';
// import { UserPlus, Calendar, CheckCircle, XCircle, UserCog } from 'lucide-react';

// const RecentActivityList = ({ activities }) => {
//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'user_registered':
//         return <UserPlus size={16} className="text-blue-500" />;
//       case 'event_created':
//         return <Calendar size={16} className="text-emerald-500" />;
//       case 'registration_approved':
//         return <CheckCircle size={16} className="text-green-500" />;
//       case 'registration_rejected':
//         return <XCircle size={16} className="text-red-500" />;
//       case 'user_updated':
//         return <UserCog size={16} className="text-amber-500" />;
//       default:
//         return null;
//     }
//   };

//   const getActivityDescription = (activity) => {
//     switch (activity.type) {
//       case 'user_registered':
//         return (
//           <p className="text-sm text-gray-700">
//             <span className="font-medium">{activity.user}</span> registered an account
//           </p>
//         );
//       case 'event_created':
//         return (
//           <p className="text-sm text-gray-700">
//             New event created: <span className="font-medium">{activity.title}</span>
//           </p>
//         );
//       case 'registration_approved':
//         return (
//           <p className="text-sm text-gray-700">
//             Approved <span className="font-medium">{activity.user}</span>'s registration for{' '}
//             <span className="font-medium">{activity.event}</span>
//           </p>
//         );
//       case 'registration_rejected':
//         return (
//           <p className="text-sm text-gray-700">
//             Rejected <span className="font-medium">{activity.user}</span>'s registration for{' '}
//             <span className="font-medium">{activity.event}</span>
//           </p>
//         );
//       case 'user_updated':
//         return (
//           <p className="text-sm text-gray-700">
//             <span className="font-medium">{activity.user}</span>'s profile was updated
//           </p>
//         );
//       default:
//         return <p className="text-sm text-gray-700">Unknown activity</p>;
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
//       {activities.length === 0 ? (
//         <div className="p-6 text-center text-gray-500 text-sm">No recent activities</div>
//       ) : (
//         activities.map((activity) => (
//           <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//             <div className="flex items-start">
//               <div className="flex-shrink-0 mt-0.5">
//                 {getActivityIcon(activity.type)}
//               </div>
//               <div className="ml-3 flex-1">
//                 {getActivityDescription(activity)}
//                 <p className="text-xs text-gray-500 mt-1">
//                   {formatTimestamp(activity.timestamp)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default RecentActivityList;