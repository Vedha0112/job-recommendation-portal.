import React from "react";

const Jobs = () => {
  const jobList = [
    { title: "Frontend Developer", company: "Google", location: "Remote" },
    { title: "Backend Developer", company: "Amazon", location: "New York" },
    { title: "UI/UX Designer", company: "Microsoft", location: "Hybrid" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Jobs</h1>
      {jobList.map((job, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-auto max-w-md mt-4">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company} - {job.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Jobs;