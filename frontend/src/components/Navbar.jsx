import { useState } from 'react'; // State handle karne ke liye (Menu open/close)
import { Link } from 'react-router-dom';

function Navbar() {
  // Mobile menu ko open aur close karne ke liye state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Left Side: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              Service<span className="text-gray-900">Hub</span>
            </Link>
          </div>

          {/* 2. Center: Desktop Links (md:flex ka matlab hai desktop par dikhega, mobile par hidden) */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
            <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
          </div>

          {/* 3. Right Side: Desktop Buttons (Mobile par hidden) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <button className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
              Register
            </button>
          </div>

          {/* 4. Mobile Menu Button (md:hidden ka matlab hai desktop par chup jayega, mobile par dikhega) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  // Cross (X) Icon jab menu khula ho
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger Icon (3 lines) jab menu band ho
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Menu Drawer (Conditional Rendering: Sirf tabhi dikhega jab isOpen true hoga) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full left-0 z-40">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Services</Link>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Categories</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">How It Works</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">About</a>
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-gray-700 font-medium hover:text-indigo-600">
              Login
            </Link>
            <button className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;