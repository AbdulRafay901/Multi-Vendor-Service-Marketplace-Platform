import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : 'customer';

  const [activeTab, setActiveTab] = useState('Overview');
  const [dataList, setDataList] = useState([]); // Services ya Requests ke liye
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ 
    total_earnings: 0, active_projects: 0, pending_requests: 0, completed_orders: 0, recent_orders: [] 
  });

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${userSession?.token}`, 'Accept': 'application/json' };
      
      if (activeTab === 'Overview') {
        const url = userRole === 'provider' ? 'http://127.0.0.1:8000/api/provider/stats' : 'http://127.0.0.1:8000/api/customer/stats';
        const res = await fetch(url, { headers });
        const result = await res.json();
        if(res.ok) setStats({ ...result.stats, recent_orders: result.recent_orders || [] });
      } 
      else {
        // Tab ke mutabiq dynamic endpoint
        let endpoint = '';
        if (activeTab === 'My Services') endpoint = '/api/provider/services';
        else if (activeTab === 'Requests') endpoint = '/api/provider/requests';
        else if (activeTab === 'My Requests') endpoint = '/api/customer/my-requests';
        
        if (endpoint) {
          const res = await fetch(`http://127.0.0.1:8000${endpoint}`, { headers });
          const result = await res.json();
          if(res.ok) setDataList(result.data || []);
        }
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const sidebarLinks = {
    customer: ["Overview", "My Requests", "Messages", "Completed Projects", "Reviews", "Profile Settings"],
    provider: ["Overview", "My Services", "Requests", "Active Projects", "Earnings", "Reviews", "Profile Settings"],
  };

  const currentMenu = sidebarLinks[userRole] || sidebarLinks.customer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 uppercase font-black text-sm">{userRole} Panel</div>
        <nav className="flex-grow p-4 space-y-1">
          {currentMenu.map((item) => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase ${activeTab === item ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-10">
        <h1 className="text-2xl font-black uppercase mb-8">{activeTab}</h1>

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[ { label: userRole === 'provider' ? 'Earnings' : 'Total Requests', val: userRole === 'provider' ? '$'+stats.total_earnings : stats.total_requests || 0 }, { label: 'Active', val: stats.active_projects }, { label: 'Pending', val: stats.pending_requests }, { label: 'Completed', val: stats.completed_orders } ].map((item, i) => (
                <div key={i} className="bg-white p-6 border rounded-2xl shadow-sm"><p className="text-gray-400 text-[10px] font-bold uppercase">{item.label}</p><p className="text-2xl font-black">{item.val}</p></div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="font-bold text-sm mb-4">Recent Activity</h2>
              <table className="w-full text-left text-xs"><thead className="text-gray-500 uppercase border-b"><tr className="text-left"><th className="pb-4">Service</th><th className="pb-4">Status</th></tr></thead><tbody>{stats.recent_orders.map(o => <tr key={o.id} className="border-b"><td className="py-4 font-bold">{o.service?.title}</td><td className="py-4 uppercase font-bold text-orange-500">{o.status}</td></tr>)}</tbody></table>
            </div>
          </div>
        )}

        {/* MY SERVICES TAB (Provider) */}
        {activeTab === 'My Services' && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-xs"><thead className="text-gray-500 uppercase border-b"><tr className="text-left"><th className="pb-4">Title</th><th className="pb-4">Price</th><th className="pb-4">Action</th></tr></thead><tbody>{dataList.map(s => <tr key={s.id} className="border-b"><td className="py-4 font-bold">{s.title}</td><td className="py-4">${s.price}</td><td className="py-4 text-indigo-600 underline cursor-pointer">Edit Service</td></tr>)}</tbody></table>
          </div>
        )}

        {/* REQUESTS / MY REQUESTS TAB (Dono) */}
        {(activeTab === 'Requests' || activeTab === 'My Requests') && (
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-xs"><thead className="text-gray-500 uppercase border-b"><tr className="text-left"><th className="pb-4">Service</th><th className="pb-4">Budget</th><th className="pb-4">Action</th></tr></thead><tbody>{dataList.map(r => <tr key={r.id} className="border-b"><td className="py-4 font-bold">{r.service?.title}</td><td className="py-4 font-black">${r.budget || r.service?.price}</td><td className="py-4 text-indigo-600 underline cursor-pointer" onClick={() => setSelectedOrder(r)}>View Details</td></tr>)}</tbody></table>
          </div>
        )}
      </main>

      {/* Modal for Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full"><h2 className="font-black text-xl mb-4">Order Details</h2><p><strong>Service:</strong> {selectedOrder.service?.title}</p><p className="mt-2"><strong>Status:</strong> {selectedOrder.status}</p><button onClick={() => setSelectedOrder(null)} className="mt-6 w-full bg-slate-900 text-white py-2 rounded-xl">Close</button></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;