import React from 'react';

export default function ErrorState({ error }) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          {/* Red gradient error icon */}
          <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-full p-3 mb-4 shadow">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" fill="#fff" fillOpacity="0.15"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-800">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-700 hover:to-red-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
