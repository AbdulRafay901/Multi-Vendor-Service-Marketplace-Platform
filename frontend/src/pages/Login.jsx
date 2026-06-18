import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({
          token: data.access_token,
          role: data.role,
          user: data.user
        }));
        
        // Role-based navigation
        if (data.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (data.role === 'provider') {
            navigate('/provider/dashboard');
        } else {
            navigate('/');
        }
        window.location.reload(); 
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('Server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
            Welcome back to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-indigo-100 transition-all active:scale-[0.99]"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} className="text-indigo-600 font-bold hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;