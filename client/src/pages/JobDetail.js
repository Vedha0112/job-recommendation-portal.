import React from "react";
import { useLocation, useParams } from "react-router-dom";

const JobDetail = () => {
  const { state } = useLocation();
  const { jobId } = useParams();

  if (!state || !state.job) {
    return <p className="p-6">Job details not available. Please go back.</p>;
  }

  const { job } = state;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Job Description</h2>
        <p className="mt-2 text-gray-700">{job.description}</p>
      </div>
    </div>
  );
};

export default JobDetail;
