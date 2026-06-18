import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Read authenticated session role from localStorage
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : 'customer'; // fallback to customer for presentation

  // State to track active sidebar tab selection
  const [activeTab, setActiveTab] = useState('Overview');

  // Handle systemic session clearing
  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out from dashboard secure session.');
    navigate('/login');
    window.location.reload();
  };

  // ==========================================
  // MOCK DATA STRUCTS (Directly matching UI Sheet)
  // ==========================================
  const customerStats = [
    { label: "Total Requests", value: "12", color: "border-indigo-500" },
    { label: "Pending", value: "4", color: "border-amber-500" },
    { label: "In Progress", value: "3", color: "border-blue-500" },
    { label: "Completed", value: "5", color: "border-green-500" }
  ];

  const providerStats = [
    { label: "Total Earnings", value: "$1,250", color: "border-emerald-500" },
    { label: "Active Projects", value: "4", color: "border-blue-500" },
    { label: "Pending Requests", value: "3", color: "border-amber-500" },
    { label: "Completed Projects", value: "7", color: "border-indigo-500" }
  ];

  const adminStats = [
    { label: "Total Users", value: "1,250", color: "border-purple-500" },
    { label: "Total Services", value: "850", color: "border-pink-500" },
    { label: "Total Projects", value: "1,520", color: "border-sky-500" },
    { label: "Total Earnings", value: "$25,680", color: "border-emerald-500" }
  ];

  const recentRequestsData = [
    { service: "Build Laravel Website", party: "Ali Raza", budget: "$300", status: "In Progress" },
    { service: "Logo Design", party: "Sara Design", budget: "$50", status: "Pending" },
    { service: "SEO Optimization", party: "SEO Expert", budget: "$120", status: "Accepted" },
    { service: "Content Writing", party: "Michael", budget: "$80", status: "Completed" }
  ];

  // ==========================================
  // SIDEBAR CONFIGS BY ROLE
  // ==========================================
  const sidebarLinks = {
    customer: ["Overview", "My Requests", "Messages", "Completed Projects", "Reviews", "Profile Settings"],
    provider: ["Overview", "My Services", "Requests", "Active Projects", "Earnings", "Reviews", "Profile Settings"],
    admin: ["Dashboard", "Users", "Services", "Projects", "Categories", "Reviews", "Reports"]
  };

  const currentMenu = sidebarLinks[userRole] || sidebarLinks.customer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left">
      
      {/* 📊 LEFT SIDEBAR LAYOUT (Matches dark theme layout from screens 5, 7, 10) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-black text-sm">
              {userRole[0].toUpperCase()}
            </div>
            <div>
              <h4 className="text-sm font-black tracking-tight capitalize">{userSession?.email ? userSession.email.split('@')[0] : 'User Profile'}</h4>
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900">
                {userRole}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Sidebar Links */}
        <nav className="flex-grow p-4 space-y-1">
          {currentMenu.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
                activeTab === item 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{item}</span>
              {activeTab === item && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-slate-800/60 hover:bg-red-950/40 hover:text-red-400 border border-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all"
          >
            Log Out Statement
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN CONTENT FRAME AREA */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full">
        
        {/* UPPER HEAD BLOCK */}
        <div className="mb-8 border-b border-gray-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              {activeTab} Window
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
              Live configuration status management desk for checked system variables.
            </p>
          </div>

          {userRole === 'provider' && (
            <button 
              onClick={() => navigate('/add-service')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shadow-indigo-100"
            >
              + Create Service Listing
            </button>
          )}
        </div>

        {/* 🔹 CORE WIDGETS RENDERING BLOCK BASED ON ACTIVE VIEW */}
        {activeTab === 'Overview' || activeTab === 'Dashboard' ? (
          <div className="space-y-8">
            
            {/* Grid Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(userRole === 'customer' ? customerStats : userRole === 'provider' ? providerStats : adminStats).map((stat, i) => (
                <div key={i} className={`bg-white p-5 rounded-2xl border-l-4 border font-medium shadow-sm ${stat.color} border-gray-200/80`}>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight block mt-1">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Admin Extra Graphics Simulation Block (Matches Screen 10 Charts layout elements) */}
            {userRole === 'admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 lg:col-span-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Users Activity Log Overview</h3>
                  <div className="h-48 bg-slate-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-xs font-medium text-gray-400">
                    Analytical Timeline Graphic Node Mapping Connected
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Projects Ratio Spread</h3>
                  <div className="h-48 bg-slate-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-xs font-medium text-gray-400">
                    Pipeline Data Chart Matrix Representation
                  </div>
                </div>
              </div>
            )}

            {/* Data Grid Logs Table (Matches screen structures for recent pipelines) */}
            {userRole !== 'admin' && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Recent Action Pipeline Logs
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                        <th className="p-4">Service Track</th>
                        <th className="p-4">{userRole === 'customer' ? 'Provider Contact' : 'Customer Account'}</th>
                        <th className="p-4">Stipulated Budget</th>
                        <th className="p-4">Pipeline Status</th>
                        <th className="p-4 text-center">Operation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold text-slate-700">
                      {recentRequestsData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50/40 transition-colors">
                          <td className="p-4 font-bold text-slate-900">{row.service}</td>
                          <td className="p-4 text-gray-500">{row.party}</td>
                          <td className="p-4 font-black text-slate-900">{row.budget}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              row.status === 'Completed' || row.status === 'Accepted'
                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => alert(`Reviewing core metadata logs for contract segment.`)}
                              className="text-indigo-600 font-bold hover:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Placeholder representation for separate deep list tabs */
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <span className="text-3xl block mb-2">📁</span>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">System View Partition Loaded</h3>
            <p className="text-xs text-gray-400 font-medium mt-1 max-w-sm mx-auto">
              Data pipelines for contextual data grid variables of "{activeTab}" partition endpoint are operational.
            </p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;