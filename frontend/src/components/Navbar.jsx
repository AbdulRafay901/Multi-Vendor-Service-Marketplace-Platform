import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : null;
  const isAuthenticated = !!userSession;

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully.');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Platform Identity Branding */}
          <Link to="/" className="text-xl font-black text-gray-900 tracking-tight">
            Service<span className="text-indigo-600">Hub</span>
          </Link>

          {/* 🌟 Exact UI Menu links from the UX Screen Layout Blueprint */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-xs font-bold text-gray-600 hover:text-indigo-600 tracking-wide">
              Home
            </Link>
            <Link to="/services" className="text-xs font-bold text-gray-600 hover:text-indigo-600 tracking-wide">
              Services
            </Link>
            <span className="text-xs font-bold text-gray-400 hover:text-indigo-600 tracking-wide cursor-pointer">
              Categories
            </span>
            <span className="text-xs font-bold text-gray-400 hover:text-indigo-600 tracking-wide cursor-pointer">
              How It Works
            </span>
            <span className="text-xs font-bold text-gray-400 hover:text-indigo-600 tracking-wide cursor-pointer">
              About
            </span>
            <span className="text-xs font-bold text-gray-400 hover:text-indigo-600 tracking-wide cursor-pointer">
              Contact
            </span>

            {/* Conditional Role-Based Action Quicklinks if signed in */}
            {isAuthenticated && (
              <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
            )}
            
            {isAuthenticated && userRole === 'customer' && (
              <Link to="/my-orders" className="text-xs font-bold text-indigo-600 hover:underline tracking-wide">
                My Orders Panel
              </Link>
            )}

            {isAuthenticated && userRole === 'provider' && (
              <Link to="/my-gigs" className="text-xs font-bold text-indigo-600 hover:underline tracking-wide">
                Provider Dashboard
              </Link>
            )}
          </div>

          {/* Right Align: User Access Sessions Profiles */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded uppercase tracking-wider">
                  {userRole}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-gray-600 hover:text-red-650 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-xs font-bold text-gray-600 hover:text-indigo-600 px-3 py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;