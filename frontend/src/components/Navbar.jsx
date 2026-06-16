import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          Service<span className="text-gray-900">Hub</span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <Link to="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
        <a href="#" className="hover:text-indigo-600 transition-colors">Categories</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">How It Works</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition-colors">
          Login
        </Link>
        <button className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;