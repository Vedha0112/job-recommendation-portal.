// src/components/DashboardLayout.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarLinks = user?.role === "recruiter"
    ? [
        { name: "Dashboard", path: "/recruiter-dashboard" },
        { name: "Profile", path: "/recruiter-profile" },
        { name: "Jobs Posted", path: "/jobs-posted" },
        { name: "Applications Received", path: "/applications-received" },
      ]
    : [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Profile", path: "/profile" },
        { name: "Jobs", path: "/jobs" },
        { name: "Applications", path: "/applications" },
        { name: "Recommendations", path: "/recommendations" },
      ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Job Portal</h2>
        <nav className="space-y-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded ${
                isActive(link.path)
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
