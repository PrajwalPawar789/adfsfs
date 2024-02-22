// ReportCard.js
import React from 'react';

const ReportCard = ({ userData }) => {
  return (
    <div className="report-card p-4 border border-gray-300 rounded shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Report Card</h2>
      <div className="mb-4">
        <p className="text-gray-600">Username: <span className="font-semibold">{userData.username}</span></p>
        <p className="text-gray-600">Email: <span className="font-semibold">{userData.email}</span></p>
        <p className="text-gray-600">Typing Test Status: <span className="font-semibold">{userData.typing_test_status}</span></p>
        {/* Add more user data as needed */}
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Download Report
      </button>
    </div>
  );
};

export default ReportCard;
