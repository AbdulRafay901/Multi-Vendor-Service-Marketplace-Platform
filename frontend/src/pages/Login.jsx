import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  // Simple form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation alert internship demo ke liye
    if (email && password) {
      alert(`Login Successful!\nEmail: ${email}`);
      navigate('/'); // Login ke baad home page par redirect
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      
      {/* Login Card Wrapper - Fully Responsive */}
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
            ServiceHub account mein login karein
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleLoginSubmit}>
          
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-500 font-medium select-none">
                Remember me
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
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