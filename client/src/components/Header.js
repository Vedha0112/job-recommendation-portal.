import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800">
        <span className="text-blue-500">Job Recommendation Portal</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
               <Link to="/explore" className="hover:text-green-500">Explore</Link>
        <Link to="/language" className="hover:text-green-500"> English</Link>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm w-96">
        <input
          type="text"
          placeholder="Search for any service..."
          className="flex-grow outline-none"
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-green-500">Sign in</Link>
       
      </div>
    </header>
  );
};

export default Header;
