import React, { useState, useEffect } from 'react';

const ProfileManagement = ({ userRole, apiBase, headers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // 1. Backend se User ka fresh data lekar aana
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      // 💡 Note: Agar aapka Laravel endpoint alag hai (e.g., /api/user), toh yahan change kar sakte hain
      const res = await fetch(`${apiBase}/api/profile`, { headers });
      const result = await res.json();

      if (res.ok) {
        setFormData((prev) => ({
          ...prev,
          name: result.user?.name || result.name || '',
          email: result.user?.email || result.email || '',
        }));
      } else {
        // Agar backend par route nahi bana abhi tak, toh localStorage se data pick kar lega fallback ke taur par
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
          setFormData((prev) => ({ ...prev, name: localUser.name, email: localUser.email }));
        }
      }
    } catch (err) {
      console.error('Profile fetch failed:', err);
      // Fallback in case of API error
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser) {
        setFormData((prev) => ({ ...prev, name: localUser.name, email: localUser.email }));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Inputs ki value change handle karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Profile Update Submit karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    // Password validation agar user naya password daal raha hai
    if (formData.new_password && formData.new_password !== formData.new_password_confirmation) {
      setLoading(false);
      return setStatusMessage({ type: 'error', text: 'New passwords do not match!' });
    }

    try {
      const res = await fetch(`${apiBase}/api/profile/update`, {
        method: 'PUT', // Ya POST/PATCH jo aapne Laravel me rakha ho
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
        
        // 🌟 Magic Step: LocalStorage ko update karna taake Sidebar me naam foran badal jaye
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
          localUser.name = formData.name;
          localUser.email = formData.email;
          localStorage.setItem('user', JSON.stringify(localUser));
        }

        // Password fields ko khali karna safe rehne ke liye
        setFormData((prev) => ({
          ...prev,
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        }));
        
        // Window ko reload kiye baghair data reflect karne ke liye page refresh ka alternative trick
        // Aap chahein toh page reload bhi karwa sakte hain: window.location.reload();
      } else {
        setStatusMessage({ 
          type: 'error', 
          text: data.message || JSON.stringify(data.errors) || 'Something went wrong!' 
        });
      }
    } catch (err) {
      console.error('Update failed:', err);
      setStatusMessage({ type: 'error', text: 'Server connection failed.' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm max-w-xl space-y-6 text-left">
      <div>
        <h2 className="text-sm font-black uppercase text-slate-800 tracking-wide">Account Information</h2>
        <p className="text-xs text-gray-400 mt-1">Update your profile details and password.</p>
      </div>

      {/* Status Messages */}
      {statusMessage.text && (
        <div className={`p-4 rounded-xl text-xs font-bold uppercase ${
          statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}>
          {statusMessage.text}
        </div>
      )}

      {loading && <div className="text-xs text-indigo-600 font-bold animate-pulse">Processing...</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="text-[10px] font-bold uppercase text-gray-400 block">Full Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="text-[10px] font-bold uppercase text-gray-400 block">Email Address</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="example@mail.com"
          />
        </div>

        <hr className="border-gray-100 my-6" />

        <div>
          <h2 className="text-xs font-black uppercase text-slate-700 tracking-wide">Change Password</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Leave blank if you don't want to change it.</p>
        </div>

        {/* Current Password */}
        <div>
          <label className="text-[10px] font-bold uppercase text-gray-400 block">Current Password</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>

        {/* New Password Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block">New Password</label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block">Confirm New Password</label>
            <input
              type="password"
              name="new_password_confirmation"
              value={formData.new_password_confirmation}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl tracking-wider transition-all duration-200 shadow-sm"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;