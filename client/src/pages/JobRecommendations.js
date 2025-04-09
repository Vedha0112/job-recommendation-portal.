import React, { useEffect, useState } from 'react';
import fetchJobsFromSerpApi from '../api/serpApi';

const JobRecommendations = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobsFromSerpApi("frontend developer", "Hyderabad").then(jobs => {
      setRecommendedJobs(jobs || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Jobs</h1>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommendedJobs.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        <ul className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <li key={index} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company_name} — {job.location}
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {job.description?.slice(0, 150)}...
              </p>
              {job.related_links?.[0]?.link && (
                <a
                  href={job.related_links[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Job
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobRecommendations;
