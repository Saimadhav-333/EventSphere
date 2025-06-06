import React from 'react';

const StatCard = ({ title, value, icon, bgColor, textColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className={`${bgColor} p-3 rounded-lg`}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-1 flex items-baseline">
              <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;