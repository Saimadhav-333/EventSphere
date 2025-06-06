import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('weekly'); // 'weekly', 'monthly', 'yearly'
  
  const SERVER_URL = 'http://localhost:8086';
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
  
  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Make API request to get registration trends data
        const response = await axios.get(
          `${SERVER_URL}/admin/analytics/registrations?timeframe=${timeframe}`, 
          { headers }
        );
        
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data');
        
        // Fallback to sample data if API fails
        generateFallbackData();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChartData();
  }, [timeframe]);
  
  const generateFallbackData = () => {
    let fallbackData = [];
    
    if (timeframe === 'weekly') {
      fallbackData = [
        { name: 'Mon', registrations: 12 },
        { name: 'Tue', registrations: 19 },
        { name: 'Wed', registrations: 15 },
        { name: 'Thu', registrations: 25 },
        { name: 'Fri', registrations: 22 },
        { name: 'Sat', registrations: 14 },
        { name: 'Sun', registrations: 10 }
      ];
    } else if (timeframe === 'monthly') {
      fallbackData = [
        { name: 'Week 1', registrations: 65 },
        { name: 'Week 2', registrations: 85 },
        { name: 'Week 3', registrations: 72 },
        { name: 'Week 4', registrations: 90 }
      ];
    } else {
      fallbackData = [
        { name: 'Jan', registrations: 120 },
        { name: 'Feb', registrations: 140 },
        { name: 'Mar', registrations: 170 },
        { name: 'Apr', registrations: 190 },
        { name: 'May', registrations: 220 },
        { name: 'Jun', registrations: 250 }
      ];
    }
    
    setChartData(fallbackData);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {isLoading ? 'Loading chart data...' : `Total: ${chartData.reduce((sum, item) => sum + item.registrations, 0)} registrations`}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === 'weekly' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === 'monthly' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeframe('yearly')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === 'yearly' 
                ? 'bg-indigo-100 text-indigo-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      
      {error ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }}
                contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar 
                dataKey="registrations" 
                name="Registrations"
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart;

// import React from 'react';

// // This is a placeholder component for a chart
// // In a real application, you would use a charting library like Chart.js, Recharts, etc.
// const Chart = () => {
//   return (
//     <div className="flex flex-col h-full justify-center items-center">
//       <div className="text-center text-gray-500">
//         <p className="mb-2">Chart Placeholder</p>
//         <p className="text-sm">Use a charting library like Chart.js or Recharts to display real data here</p>
//       </div>
      
//       {/* This is a simple placeholder chart visualization */}
//       <div className="w-full mt-4 flex items-end justify-between h-32 px-4">
//         {[35, 55, 42, 78, 32, 45, 60].map((value, index) => (
//           <div key={index} className="w-8 bg-indigo-500 rounded-t-sm" style={{ height: `${value}%` }}></div>
//         ))}
//       </div>
      
//       <div className="w-full flex justify-between px-4 mt-2">
//         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//           <div key={index} className="text-xs text-gray-500">{day}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chart;

