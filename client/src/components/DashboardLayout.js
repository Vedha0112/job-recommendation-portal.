// src/components/DashboardLayout.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const jobSeekerLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
    { path: "/jobs", label: "Jobs" },
    { path: "/applications", label: "Applications" },
    { path: "/recommendations", label: "Recommendations" },
  ];

  const recruiterLinks = [
    { path: "/recruiter-dashboard", label: "Dashboard" },
    { path: "/recruiter-profile", label: "Profile" },
    { path: "/jobs-posted", label: "Jobs Posted" },
    { path: "/applications-received", label: "Applications Received" },
  ];

  const navLinks = user?.role === "recruiter" ? recruiterLinks : jobSeekerLinks;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white ${isActive(link.path) ? "font-bold underline" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
