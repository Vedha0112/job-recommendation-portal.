// src/pages/JobsPosted.js
import React from "react";

const JobsPosted = () => {
  const jobs = [
    { title: "Frontend Developer", status: "Open" },
    { title: "Backend Developer", status: "Closed" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Jobs Posted</h2>
      <ul className="bg-white p-6 rounded-lg shadow-lg">
        {jobs.map((job, index) => (
          <li key={index} className="border-b p-2">
            {job.title} - <span className="text-blue-600">{job.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsPosted;