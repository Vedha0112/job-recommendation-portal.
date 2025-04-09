// src/pages/RecruiterDashboard.js
import React from "react";

const RecruiterDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 p-6">
      {/* Main Content */}
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Recruiter!</h2>
        <p className="text-gray-600 mb-6">Manage job postings and applications from here.</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Total Job Posts</h3>
            <p className="text-3xl text-blue-600 font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Total Applications</h3>
            <p className="text-3xl text-blue-600 font-bold">34</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;