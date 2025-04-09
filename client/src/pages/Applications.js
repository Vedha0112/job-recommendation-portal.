cccimport React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications based on user role
    if (user.role === "recruiter") {
      fetch(`/api/recruiter/applications?recruiterId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setApplications(data));
    } else {
      fetch(`/api/candidate/applications?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setApplications(data));
    }
  }, [user]);

  return (
    <div>
      <h1>{user.role === "recruiter" ? "Received Applications" : "My Applications"}</h1>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            {user.role === "recruiter" ? (
              <>
                <strong>{app.candidateName}</strong> applied for <strong>{app.jobTitle}</strong>
                <button>View Profile</button>
                <button>Accept</button>
                <button>Reject</button>
              </>
            ) : (
              <>
                <strong>{app.jobTitle}</strong> - {app.status}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
