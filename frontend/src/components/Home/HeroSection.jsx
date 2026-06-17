import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/services?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">
        
        {/* 📝 LEFT COLUMN: Text Content + Search Bar */}
        <div className="space-y-6 text-left order-1">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Find the <span className="text-[#5046e5]">Best <br className="hidden md:inline" /> Services</span> for Your <br /> Business
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-medium max-w-md leading-relaxed">
            Connect with talented service providers and get your work done.
          </p>

          {/* 🔍 INLINE SEARCH BAR */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex items-center max-w-xl bg-white border border-gray-200 rounded-xl p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.04)] focus-within:border-indigo-400 transition-all"
          >
            <input 
              type="text" 
              placeholder="Search for services..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent pl-4 pr-2 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-[#5046e5] hover:bg-indigo-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Search
            </button>
          </form>
        </div>

        {/* 🎨 RIGHT COLUMN: Bulletproof Code-Based Premium SVG Illustration */}
        <div className="w-full flex justify-center items-center order-2 lg:order-2">
          <div className="w-full max-w-[460px] md:max-w-[500px]">
            <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Subtle background blob */}
              <path d="M390,280 C440,220 460,130 400,90 C340,50 240,70 180,110 C120,150 90,220 130,280 C170,340 340,340 390,280 Z" fill="#EEF2FF" />
              
              {/* Laptop Base */}
              <path d="M160,310 L340,310 L355,325 L145,325 Z" fill="#64748B" />
              <rect x="220" y="321" width="60" height="4" rx="2" fill="#475569" />
              
              {/* Laptop Screen */}
              <rect x="185" y="200" width="130" height="110" rx="8" fill="#334155" />
              <rect x="192" y="207" width="116" height="92" rx="4" fill="#5046e5" />
              
              {/* Coding Lines on Screen */}
              <rect x="202" y="217" width="40" height="6" rx="2" fill="#818CF8" />
              <rect x="202" y="229" width="70" height="6" rx="2" fill="#A5B4FC" />
              <rect x="202" y="241" width="55" height="6" rx="2" fill="#818CF8" />
              <rect x="202" y="253" width="80" height="6" rx="2" fill="#FFFFFF" />
              <circle cx="285" cy="220" r="8" fill="#FCD34D" opacity="0.8" />
              
              {/* Floating Element 1 (Analytics Card - Left) */}
              <g transform="translate(60, 130)">
                <rect width="70" height="50" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.02))" />
                <path d="M15,35 L30,20 L45,30 L55,15" fill="none" stroke="#5046e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="55" cy="15" r="3" fill="#5046e5" />
              </g>

              {/* Floating Element 2 (Checklist Card - Right) */}
              <g transform="translate(360, 160)">
                <rect width="75" height="55" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.02))" />
                <rect x="12" y="15" width="10" height="10" rx="2" fill="#818CF8" />
                <line x1="28" y1="20" x2="60" y2="20" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
                <rect x="12" y="30" width="10" height="10" rx="2" fill="#818CF8" />
                <line x1="28" y1="35" x2="52" y2="35" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Floating Tech Circles */}
              <circle cx="120" cy="80" r="14" fill="#E0E7FF" />
              <circle cx="120" cy="80" r="6" fill="#5046e5" />
              
              <circle cx="380" cy="75" r="18" fill="#EEF2FF" />
              <path d="M375,75 L385,75 M380,70 L380,80" stroke="#5046e5" strokeWidth="2" strokeLinecap="round" />

              {/* Decorative Plants/Elements */}
              <path d="M410,325 C420,300 440,300 440,325 Z" fill="#94A3B8" opacity="0.5" />
              <path d="M425,325 C430,290 450,290 450,325 Z" fill="#cbd5e1" opacity="0.4" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;