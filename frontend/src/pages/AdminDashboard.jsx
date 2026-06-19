import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, FolderKanban, ListTree,
  Star, FileBarChart, LogOut, Search,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const API_BASE = 'http://127.0.0.1:8000';

const MENU = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Users', icon: Users },
  { label: 'Services', icon: Briefcase },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Categories', icon: ListTree },
  { label: 'Reviews', icon: Star },
  { label: 'Reports', icon: FileBarChart },
];

// Sirf ye 2 tabs abhi functional hain - baaki "Coming soon" dikhayenge
const IMPLEMENTED_TABS = ['Dashboard', 'Users'];

const STATUS_COLORS = {
  pending: '#f59e0b',
  accepted: '#10b981',
  in_progress: '#3b82f6',
  completed: '#22c55e',
  delivered: '#a855f7',
  cancelled: '#ef4444',
};

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide">{label}</p>
    <p className={`text-2xl font-black mt-1 ${accent || 'text-slate-900'}`}>{value}</p>
  </div>
);

const Avatar = ({ name }) => {
  const initials = name
    ? name.trim().split(/\s+/).map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-[11px] shrink-0">
      {initials}
    </div>
  );
};

const EmptyState = ({ title }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center shadow-sm">
    <p className="font-black text-sm uppercase text-slate-700">{title}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem('user'));

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [stats, setStats] = useState({ total_users: 0, total_services: 0, total_projects: 0, total_earnings: 0 });
  const [usersOverview, setUsersOverview] = useState([]);
  const [projectsStatus, setProjectsStatus] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const headers = { Authorization: `Bearer ${userSession?.token}`, Accept: 'application/json' };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/stats`, { headers });
      const result = await res.json();
      if (res.ok) {
        setStats(result.stats);
        setUsersOverview(result.users_overview || []);
        setProjectsStatus(result.projects_status || []);
      }
    } catch (err) { console.error('Admin stats fetch failed:', err); }
    setLoading(false);
  };

  const fetchUsers = async (pageNum = 1, search = '') => {
    setLoading(true);
    try {
      const url = `${API_BASE}/api/admin/users?page=${pageNum}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
      const res = await fetch(url, { headers });
      const result = await res.json();
      if (res.ok) {
        setUsersList(result.data || []);
        setPage(result.meta?.current_page || 1);
        setLastPage(result.meta?.last_page || 1);
      }
    } catch (err) { console.error('Users fetch failed:', err); }
    setLoading(false);
  };

  const toggleUserStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${user.id}/status`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setUsersList((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
      }
    } catch (err) { console.error('Status toggle failed:', err); }
  };

  useEffect(() => {
    if (activeTab === 'Dashboard') fetchStats();
    else if (activeTab === 'Users') fetchUsers(1, searchInput);
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, searchInput);
  };

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800">
          <p className="font-black text-sm uppercase">Admin Panel</p>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {MENU.map(({ label, icon: Icon }) => (
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

        {!IMPLEMENTED_TABS.includes(activeTab) && <EmptyState title="Coming soon" />}

        {/* ===== Dashboard (screen 10) ===== */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={stats.total_users} />
              <StatCard label="Total Services" value={stats.total_services} accent="text-blue-600" />
              <StatCard label="Total Projects" value={stats.total_projects} accent="text-amber-500" />
              <StatCard label="Total Earnings" value={`$${stats.total_earnings}`} accent="text-emerald-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="font-black text-sm mb-4">Users Overview</p>
                {usersOverview.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-10">No data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={usersOverview}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="font-black text-sm mb-4">Projects Status</p>
                {projectsStatus.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-10">No data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={projectsStatus} dataKey="count" nameKey="status" innerRadius={50} outerRadius={80}>
                        {projectsStatus.map((entry, i) => (
                          <Cell key={i} fill={STATUS_COLORS[entry.status] || '#94a3b8'} />
                        ))}
                      </Pie>
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== Users (screen 11) ===== */}
        {activeTab === 'Users' && (
          <div className="space-y-5">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm"
                />
              </div>
              <button type="submit" className="bg-indigo-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl">
                Search
              </button>
            </form>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {loading ? (
                <div className="p-10 text-center text-xs text-gray-400">Loading...</div>
              ) : usersList.length === 0 ? (
                <div className="p-10 text-center text-xs text-gray-400">No users found.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 uppercase text-gray-400 font-bold">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {usersList.map((u) => (
                      <tr key={u.id}>
                        <td className="p-4">
                          <div className="flex items-center gap-2 font-bold">
                            <Avatar name={u.name} />
                            {u.name}
                          </div>
                        </td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4 capitalize">{u.role}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {u.status || 'active'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button onClick={() => toggleUserStatus(u)} className="text-indigo-600 font-bold underline">
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {lastPage > 1 && (
              <div className="flex justify-center items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => fetchUsers(page - 1, searchInput)}
                  className="px-4 py-2 rounded-lg border text-xs font-bold disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-xs font-bold text-gray-500">Page {page} of {lastPage}</span>
                <button
                  disabled={page === lastPage}
                  onClick={() => fetchUsers(page + 1, searchInput)}
                  className="px-4 py-2 rounded-lg border text-xs font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;