// src/pages/LandingPage.js
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import JobCategories from "../components/JobCategories";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <JobCategories />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
