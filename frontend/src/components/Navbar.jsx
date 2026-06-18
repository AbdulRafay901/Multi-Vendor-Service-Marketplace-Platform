import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Parse user session from localStorage
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : null; // 'customer', 'provider', 'admin', or null

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
          
          {/* Logo */}
          <Link to="/" className="text-xl font-black text-gray-900 tracking-tight">
            Service<span className="text-indigo-600">Hub</span>
          </Link>

          {/* Dynamic Navigation Links based on Roles */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
              Browse Services
            </Link>

            {/* CUSTOMER ONLY LINKS */}
            {userRole === 'customer' && (
              <Link to="/my-orders" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
                My Orders
              </Link>
            )}

            {/* PROVIDER ONLY LINKS */}
            {userRole === 'provider' && (
              <>
                <Link to="/my-gigs" className="text-sm font-semibold text-gray-600 hover:text-indigo-600">
                  Manage Gigs
                </Link>
                <Link to="/add-service" className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all">
                  + Add Service
                </Link>
              </>
            )}

            {/* ADMIN ONLY LINKS */}
            {userRole === 'admin' && (
              <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-red-100">
                Admin Panel
              </span>
            )}
          </div>

          {/* Auth Action Buttons */}
          <div className="flex items-center space-x-3">
            {userSession ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md uppercase">
                  {userRole}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-gray-600 hover:text-red-650"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-sm font-bold text-gray-600 hover:text-indigo-600">
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">
                  Join
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;