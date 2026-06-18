import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  // Simple form states for signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords match nahi ho rahe bahi!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword,role: role })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully!");
        navigate('/login');
      } else {
        
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      alert("Backend connection failed. Server check karo!");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      
      {/* Register Card Wrapper - Fully Responsive */}
      <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
            Create your new account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
          
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

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

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
      Register As
    </label>
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none focus:border-indigo-500 transition-all"
    >
      <option value="customer">Customer</option>
      <option value="provider">Service Provider</option>
    </select>
  </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
            >
              Sign Up 
            </button>
          </div>

          {/* Toggle Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 font-medium">
              Already have an account?{' '}
              <span 
                onClick={() => navigate('/login')}
                className="text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;