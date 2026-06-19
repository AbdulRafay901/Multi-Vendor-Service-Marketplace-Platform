import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, MessageSquare, CheckCircle2,
  Star, Settings, LogOut, Briefcase, Activity, Wallet, Plus,
} from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000';

// ---------- Sidebar menu (icons match the look of screens 5 & 7) ----------
const MENU = {
  customer: [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My Requests', icon: ClipboardList },
    { label: 'Messages', icon: MessageSquare },
    { label: 'Completed Projects', icon: CheckCircle2 },
    { label: 'Reviews', icon: Star },
    { label: 'Profile Settings', icon: Settings },
  ],
  provider: [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My Services', icon: Briefcase },
    { label: 'Requests', icon: ClipboardList },
    { label: 'Active Projects', icon: Activity },
    { label: 'Earnings', icon: Wallet },
    { label: 'Reviews', icon: Star },
    { label: 'Profile Settings', icon: Settings },
  ],
};

// Status filter chips - matches the tab bar on screen 6 (My Requests page)
const STATUS_FILTERS = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];

// Tabs that pull from the requests list (role-aware endpoint, filtered client-side)
const REQUEST_DRIVEN_TABS = ['My Requests', 'Requests', 'Active Projects', 'Completed Projects', 'Earnings'];

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-600',
  accepted: 'bg-emerald-50 text-emerald-600',
  in_progress: 'bg-blue-50 text-blue-600',
  completed: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-600',
};

const StatusBadge = ({ status }) => {
  const key = (status || '').toLowerCase().replace(/\s+/g, '_');
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${STATUS_STYLES[key] || 'bg-gray-100 text-gray-500'}`}>
      {key ? key.replace('_', ' ') : 'unknown'}
    </span>
  );
};

const Avatar = ({ name, size = 'w-9 h-9' }) => {
  const initials = name
    ? name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <div className={`${size} rounded-full bg-indigo-500/20 text-indigo-200 flex items-center justify-center font-black text-xs shrink-0`}>
      {initials}
    </div>
  );
};

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{label}</p>
    <p className={`text-2xl font-black mt-1 ${accent || 'text-slate-900'}`}>{value}</p>
  </div>
);

const EmptyState = ({ title, subtitle }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
    <p className="font-black text-sm uppercase text-slate-700">{title}</p>
    {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : 'customer';
  const menu = MENU[userRole] || MENU.customer;

  const [activeTab, setActiveTab] = useState('Overview');
  const [statusFilter, setStatusFilter] = useState('All');
  const [requestsList, setRequestsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total_earnings: 0, total_requests: 0, active_projects: 0, pending_requests: 0, completed_orders: 0, recent_orders: [],
  });

  // Add New Service form (screen 8)
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newService, setNewService] = useState({ title: '', category: '', description: '', price: '', delivery_time: '' });

  const headers = { Authorization: `Bearer ${userSession?.token}`, Accept: 'application/json' };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const url = userRole === 'provider' ? `${API_BASE}/api/provider/stats` : `${API_BASE}/api/customer/stats`;
      const res = await fetch(url, { headers });
      const result = await res.json();
      if (res.ok) setStats({ ...result.stats, recent_orders: result.recent_orders || [] });
    } catch (err) { console.error('Stats fetch failed:', err); }
    setLoading(false);
  };

  // Single source of truth for My Requests / Requests / Active Projects /
  // Completed Projects / Earnings - filtered client-side, no extra routes needed
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const url = userRole === 'provider' ? `${API_BASE}/api/provider/requests` : `${API_BASE}/api/customer/my-requests`;
      const res = await fetch(url, { headers });
      const result = await res.json();
      if (res.ok) setRequestsList(result.data || []);
    } catch (err) { console.error('Requests fetch failed:', err); }
    setLoading(false);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/provider/services`, { headers });
      const result = await res.json();
      if (res.ok) setServicesList(result.data || []);
    } catch (err) { console.error('Services fetch failed:', err); }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/provider/requests/${id}/status`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) setRequestsList((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) { console.error('Status update failed:', err); }
  };

  const submitService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/services`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });
      if (res.ok) {
        setShowServiceForm(false);
        setNewService({ title: '', category: '', description: '', price: '', delivery_time: '' });
        fetchServices();
      }
    } catch (err) { console.error('Create service failed:', err); }
  };

  useEffect(() => {
    setStatusFilter('All');
    if (activeTab === 'Overview') fetchStats();
    else if (activeTab === 'My Services') fetchServices();
    else if (REQUEST_DRIVEN_TABS.includes(activeTab)) fetchRequests();
  }, [activeTab]);

  const listForTab = () => {
    let list = requestsList;
    if (activeTab === 'Active Projects') list = list.filter((r) => r.status === 'in_progress');
    else if (activeTab === 'Completed Projects' || activeTab === 'Earnings') list = list.filter((r) => r.status === 'completed');
    else if (statusFilter !== 'All') list = list.filter((r) => r.status === statusFilter.toLowerCase().replace(/\s+/g, '_'));
    return list;
  };

  const earningsTotal = requestsList
    .filter((r) => r.status === 'completed')
    .reduce((sum, r) => sum + Number(r.budget || 0), 0);

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <Avatar name={userSession?.name} />
          <div>
            <p className="font-black text-sm leading-tight">{userSession?.name || 'Guest'}</p>
            <p className="text-[10px] uppercase text-slate-400 font-bold">{userRole} Panel</p>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {menu.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition ${
                activeTab === label ? 'bg-indigo-600' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-slate-400 hover:bg-slate-800"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- Main Content ---------------- */}
      <main className="flex-grow p-6 md:p-10">
        <h1 className="text-2xl font-black uppercase mb-8">{activeTab}</h1>

        {/* ===== Overview (screens 5 & 7) ===== */}
        {activeTab === 'Overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label={userRole === 'provider' ? 'Earnings' : 'Total Requests'}
                value={userRole === 'provider' ? `$${stats.total_earnings}` : stats.total_requests}
                accent={userRole === 'provider' ? 'text-emerald-600' : undefined}
              />
              <StatCard label="Pending" value={stats.pending_requests} accent="text-amber-500" />
              <StatCard label="Active" value={stats.active_projects} accent="text-blue-600" />
              <StatCard label="Completed" value={stats.completed_orders} />
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-5 border-b flex items-center justify-between">
                <span className="font-black text-sm">Recent {userRole === 'provider' ? 'Requests' : 'Activity'}</span>
                <button
                  onClick={() => setActiveTab(userRole === 'provider' ? 'Requests' : 'My Requests')}
                  className="text-[11px] font-bold text-indigo-600 uppercase"
                >
                  View All
                </button>
              </div>
              {loading ? (
                <div className="p-10 text-center text-xs text-gray-400">Loading...</div>
              ) : stats.recent_orders.length === 0 ? (
                <div className="p-10 text-center text-xs text-gray-400">No activity yet.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 uppercase text-gray-400 font-bold">
                    <tr>
                      <th className="p-4">Service</th>
                      <th className="p-4">{userRole === 'provider' ? 'Customer' : 'Provider'}</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.recent_orders.map((o) => (
                      <tr key={o.id}>
                        <td className="p-4 font-bold">{o.service?.title}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Avatar name={userRole === 'provider' ? o.customer?.name : o.provider?.name} size="w-6 h-6" />
                            {userRole === 'provider' ? o.customer?.name : o.provider?.name}
                          </div>
                        </td>
                        <td className="p-4">${o.budget}</td>
                        <td className="p-4"><StatusBadge status={o.status} /></td>
                        <td className="p-4">
                          <button onClick={() => setSelectedOrder(o)} className="text-indigo-600 font-bold underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ===== My Services (screen 8) ===== */}
        {activeTab === 'My Services' && (
          <div className="space-y-5">
            <div className="flex justify-end">
              <button
                onClick={() => setShowServiceForm((s) => !s)}
                className="bg-indigo-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl flex items-center gap-2"
              >
                <Plus size={14} />
                {showServiceForm ? 'Cancel' : 'Add New Service'}
              </button>
            </div>

            {showServiceForm && (
              <form onSubmit={submitService} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                  <input
                    required
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm"
                    placeholder="Enter service title"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">Category</label>
                  <input
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm"
                    placeholder="e.g. Web Development"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm"
                    rows={3}
                    placeholder="Describe your service..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400">Price ($)</label>
                    <input
                      required
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-400">Delivery Time (Days)</label>
                    <input
                      required
                      type="number"
                      value={newService.delivery_time}
                      onChange={(e) => setNewService({ ...newService, delivery_time: e.target.value })}
                      className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm"
                      placeholder="Enter days"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">Service Image</label>
                  <input type="file" className="w-full mt-1 text-xs" />
                  {/* Image upload needs FormData/multipart instead of JSON - wire this
                      up once the /api/services endpoint accepts file uploads */}
                </div>
                <button type="submit" className="bg-indigo-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl">
                  Create Service
                </button>
              </form>
            )}

            {loading ? (
              <div className="p-10 text-center text-xs text-gray-400">Loading...</div>
            ) : servicesList.length === 0 ? (
              <EmptyState title="No services yet" subtitle="Add a service so customers can find and order from you." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicesList.map((s) => (
                  <div key={s.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <p className="font-black text-sm">{s.title}</p>
                    <p className="text-xs text-gray-400 mt-1">From ${s.price} • {s.delivery_time} Days</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== My Requests / Requests / Active Projects / Completed Projects / Earnings (screen 6 style) ===== */}
        {REQUEST_DRIVEN_TABS.includes(activeTab) && (
          <div className="space-y-5">
            {activeTab === 'Earnings' && (
              <StatCard label="Total Earnings (Completed Orders)" value={`$${earningsTotal}`} accent="text-emerald-600" />
            )}

            {(activeTab === 'My Requests' || activeTab === 'Requests') && (
              <div className="flex gap-2 flex-wrap">
                {STATUS_FILTERS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setStatusFilter(t)}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase ${
                      statusFilter === t ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <div className="p-10 text-center text-xs text-gray-400">Loading...</div>
            ) : listForTab().length === 0 ? (
              <EmptyState title="Nothing here yet" />
            ) : (
              <div className="space-y-3">
                {listForTab().map((item) => (
                  <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Avatar name={userRole === 'provider' ? item.customer?.name : item.provider?.name} />
                      <div>
                        <p className="font-black text-sm">{item.service?.title || item.title}</p>
                        <p className="text-xs text-gray-400">
                          {userRole === 'provider' ? item.customer?.name : item.provider?.name}
                          {item.deadline ? ` • Deadline: ${item.deadline}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm">${item.budget || item.price}</span>
                      <StatusBadge status={item.status} />
                      {userRole === 'provider' && activeTab === 'Requests' && (
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className="border rounded-lg px-2 py-1 text-[10px] font-bold uppercase"
                        >
                          {['pending', 'accepted', 'in_progress', 'completed', 'cancelled'].map((s) => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      )}
                      <button onClick={() => setSelectedOrder(item)} className="text-indigo-600 font-bold text-xs underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== Messages / Reviews ===== */}
        {activeTab === 'Messages' && (
          <EmptyState title="No messages yet" subtitle="Conversations with providers will appear here." />
        )}
        {activeTab === 'Reviews' && (
          <EmptyState title="No reviews yet" subtitle="Reviews will appear here once submitted." />
        )}

        {/* ===== Profile Settings ===== */}
        {activeTab === 'Profile Settings' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm max-w-xl space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
              <input defaultValue={userSession?.name} className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
              <input defaultValue={userSession?.email} className="w-full mt-1 border rounded-xl px-4 py-2.5 text-sm" />
            </div>
            <button className="bg-indigo-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-xl">
              Save Changes
            </button>
          </div>
        )}
      </main>

      {/* ---------------- Details Modal ---------------- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-black mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Service</span>
                {selectedOrder.service?.title || selectedOrder.title}
              </p>
              <p>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">
                  {userRole === 'provider' ? 'Customer' : 'Provider'}
                </span>
                {userRole === 'provider' ? selectedOrder.customer?.name : selectedOrder.provider?.name}
              </p>
              <p>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Budget</span>
                ${selectedOrder.budget || selectedOrder.price}
              </p>
              {selectedOrder.deadline && (
                <p>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block">Deadline</span>
                  {selectedOrder.deadline}
                </p>
              )}
              <p>
                <span className="text-gray-400 font-bold uppercase text-[10px] block">Status</span>
                <StatusBadge status={selectedOrder.status} />
              </p>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl font-bold">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;