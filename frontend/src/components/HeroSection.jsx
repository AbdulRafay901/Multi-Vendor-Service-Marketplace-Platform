import React from 'react';

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r border-b border-gray-100 from-indigo-900 via-indigo-850 to-slate-900 text-white py-16 px-4 rounded-3xl my-4 max-w-7xl mx-auto shadow-xl relative overflow-hidden">
      {/* Background Subtle Design Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl -mr-20 -mt-20"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          🚀 Emergency MVP Marketplace
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 text-white">
          Find the Perfect <span className="text-indigo-400">Freelance Services</span> Instantly
        </h1>
        <p className="mt-3 text-base md:text-lg text-indigo-200 font-medium max-w-xl mx-auto">
          Explore top-rated services built with Laravel & React. Filter, search, and view details in real-time.
        </p>

        {/* 🔍 LIVE SEARCH BAR */}
        <div className="mt-8 max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-lg flex items-center border border-gray-200">
          <span className="pl-3 text-xl text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="What service are you looking for today? (e.g., Laravel, Figma, SEO)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-4 py-2 text-gray-800 placeholder-gray-400 font-medium bg-transparent focus:outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;