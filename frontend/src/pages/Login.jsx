import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role matching backend structure

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
      // Simulating backend auth response payload
      const userData = {
        email: email,
        role: role, // 'customer', 'provider', or 'admin'
        token: 'mock-jwt-token-from-backend'
      };

      // Save to localStorage so all components can read the current role
      localStorage.setItem('user', JSON.stringify(userData));
      
      alert(`Login Successful!\nLogged in as: ${role.toUpperCase()}`);
      navigate('/'); 
      window.location.reload(); // Refresh to let Navbar read the new state immediately
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
            Sign in to your ServiceHub account
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleLoginSubmit}>
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Role Selection Dropdown (Aligned with Backend Roles) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Select Your Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="customer">Customer (Browse & Order)</option>
              <option value="provider">Service Provider / Seller</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              Sign In
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;