import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-red-800 mb-2">Loading</h2>
        <p className="text-gray-600">Please wait while we load your data...</p>
        
        <div className="w-full mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-red-600 h-full animate-pulse origin-left transform scale-x-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}