import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-red-600 border-opacity-60"></div>
    </div>
  );
}
