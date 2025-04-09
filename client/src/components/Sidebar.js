import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";  // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <Link to="/applications">Applications</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
