import React from "react";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white p-8"
      style={{
        backgroundImage: "url('/assets/hero-bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Box with Glassmorphism Effect */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-lg max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
          Find Your <span className="text-blue-300">Dream Job</span> Today
        </h1>
        <p className="text-lg mb-6 opacity-90">Explore thousands of job opportunities from top companies.</p>

        <a
          href="/jobs"
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          Explore Jobs
        </a>
      </div>
    </section>
  );
};

export default Hero;
