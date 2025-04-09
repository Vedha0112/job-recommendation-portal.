// src/pages/ApplicationsReceived.js
import React from "react";

const ApplicationsReceived = () => {
  const applications = [
    { name: "Alice Smith", job: "Frontend Developer", status: "Pending" },
    { name: "Bob Johnson", job: "Backend Developer", status: "Accepted" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applications Received</h2>
      <ul className="bg-white p-6 rounded-lg shadow-lg">
        {applications.map((app, index) => (
          <li key={index} className="border-b p-2">
            {app.name} applied for {app.job} - 
            <span className="text-blue-600"> {app.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsReceived;
