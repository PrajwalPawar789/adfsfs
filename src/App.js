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
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Assessment Portal Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Total Users</h3>
            <p className="text-4xl font-bold">{userData.length}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Users Passed Typing Test</h3>
            <p className="text-4xl font-bold">{userData.filter(user => user.typing_test_status === 'Pass').length}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Users Failed Typing Test</h3>
            <p className="text-4xl font-bold">{userData.filter(user => user.typing_test_status === 'Fail').length}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Users Passed Voice Test</h3>
            <p className="text-4xl font-bold">{passedVoiceTestCount}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Users Failed Voice Test</h3>
            <p className="text-4xl font-bold">{failedVoiceTestCount}</p>
          </div>
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Typing Test Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {userData.map((user) => (
                <tr key={user.id} className="bg-gray-900">
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.typing_test_status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleGenerateReport(user.id)} className="text-blue-400 hover:text-blue-200 font-semibold focus:outline-none">Generate Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
