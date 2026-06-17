import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-indigo-600 tracking-tight flex items-center gap-1">
              <span className="bg-indigo-600 text-white p-1 rounded-lg text-sm">S</span>ServiceHub
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Home</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          {/* User Section / Buttons */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-bold text-gray-700 hover:text-indigo-600 px-3 py-2">Login</button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-sm transition-all">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;