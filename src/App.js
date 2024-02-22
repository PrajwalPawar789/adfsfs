import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ userRole }) => {
  const [userData, setUserData] = useState([]);
  const [necessaryData, setNecessaryData] = useState({});
  const [failedVoiceTestCount, setFailedVoiceTestCount] = useState(0);
  const [passedVoiceTestCount, setPassedVoiceTestCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getUserData");
        setUserData(response.data.userData);
        console.log("Response from the server:", response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNecessaryData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getNecessaryData");
        setNecessaryData(response.data.necessaryData);
        console.log("Response for necessary data:", response);
      } catch (error) {
        console.error("Error fetching necessary data:", error);
      }
    };

    fetchNecessaryData();
  }, []);

  useEffect(() => {
    const fetchFailedVoiceTestCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getVoiceTestStatusData");
        setFailedVoiceTestCount(response.data.voiceTestStatusData['Fail'] || 0);
        setPassedVoiceTestCount(response.data.voiceTestStatusData['Pass'] || 0);
        console.log("Failed voice test count:", response.data.voiceTestStatusData['Fail'] || 0);
      } catch (error) {
        console.error("Error fetching failed voice test count:", error);
      }
    };

    fetchFailedVoiceTestCount();
  }, []);

  // Function to handle report generation
  const handleGenerateReport = (userId) => {
    // Logic to generate report for the user with userId
    console.log("Generating report for user with ID:", userId);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Assessment Portal Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: '#f8f9fa' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#007bff' }}>Total Users</h3>
          <p className="text-3xl font-bold" style={{ color: '#343a40' }}>{userData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: '#f8f9fa' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#28a745' }}>Users Passed Typing Test</h3>
          <p className="text-3xl font-bold" style={{ color: '#343a40' }}>{userData.filter(user => user.typing_test_status === 'Pass').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: '#f8f9fa' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#ffc107' }}>Users Failed Typing Test</h3>
          <p className="text-3xl font-bold" style={{ color: '#343a40' }}>{userData.filter(user => user.typing_test_status === 'Fail').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: '#f8f9fa' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#6610f2' }}>Users Passed Voice Test</h3>
          <p className="text-3xl font-bold" style={{ color: '#343a40' }}>{passedVoiceTestCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ backgroundColor: '#f8f9fa' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#6610f2' }}>Users Failed Voice Test</h3>
          <p className="text-3xl font-bold" style={{ color: '#343a40' }}>{failedVoiceTestCount}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Typing Test Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userData.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.typing_test_status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleGenerateReport(user.id)} className="text-indigo-600 hover:text-indigo-900">
                    Generate Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
