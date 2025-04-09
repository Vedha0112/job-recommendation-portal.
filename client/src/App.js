import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import JobCategories from "./components/JobCategories";
import Testimonials from "./components/Testimonials";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import JobRecommendations from "./pages/JobRecommendations";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterProfile from "./pages/RecruiterProfile";
import JobsPosted from "./pages/JobsPosted";
import ApplicationsReceived from "./pages/ApplicationsReceived";

import DashboardLayout from "./components/DashboardLayout";


function ProtectedRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isJobSeeker = user?.role === "job_seeker";
  const isRecruiter = user?.role === "recruiter";

  return (
    <DashboardLayout>
      <Routes>
        {/* Job Seeker Routes */}
        {isJobSeeker && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/recommendations" element={<JobRecommendations />} />
          </>
        )}

        {/* Recruiter Routes */}
        {isRecruiter && (
          <>
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter-profile" element={<RecruiterProfile />} />
            <Route path="/jobs-posted" element={<JobsPosted />} />
            <Route path="/applications-received" element={<ApplicationsReceived />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            isJobSeeker
              ? <Navigate to="/dashboard" />
              : isRecruiter
              ? <Navigate to="/recruiter-dashboard" />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </DashboardLayout>
  );
}


function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <JobCategories />
            <Testimonials />
            <Footer />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
