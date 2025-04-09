import { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function loadJobs() {
            let jobData = await fetchJobs();
            setJobs(jobData);
        }
        loadJobs();
    }, []);

    return (
        <div>
            <h2>Job Listings</h2>
            {jobs.map(job => (
                <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.company} - {job.location}</p>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    );
}

export default JobList;
