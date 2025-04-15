import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

// mock data or fetch from API/Firestore
const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    description: "Build beautiful UI with React and Tailwind.",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Microsoft",
    location: "Hyderabad",
    description: "Work with Node.js and Express.",
  },
];

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(mockJobs); // Replace with fetch if using API
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Recommendations</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
