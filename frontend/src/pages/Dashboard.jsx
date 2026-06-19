import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem('user'));
  const userRole = userSession ? userSession.role : 'customer';

  const [activeTab, setActiveTab] = useState('Overview');
  const [requests, setRequests] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Modal ke liye state

  const fetchMyRequests = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/provider/requests', {
        headers: { 
          'Authorization': `Bearer ${userSession?.token}`,
          'Accept': 'application/json' 
        }
      });
      const result = await response.json();
      if (response.ok) {
        setRequests(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/provider/requests/${id}/status`, {
        method: 'PATCH', // Route file ke mutabiq PATCH
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userSession?.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        alert("Status Updated!");
        fetchMyRequests(); 
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  useEffect(() => {
    if (activeTab === 'Requests' || activeTab === 'My Requests') {
      fetchMyRequests();
    }
  }, [activeTab]);

  const sidebarLinks = {
    customer: ["Overview", "My Requests", "Messages", "Completed Projects", "Reviews", "Profile Settings"],
    provider: ["Overview", "My Services", "Requests", "Active Projects", "Earnings", "Reviews", "Profile Settings"],
    admin: ["Dashboard", "Users", "Services", "Projects", "Categories", "Reviews", "Reports"]
  };

  const currentMenu = sidebarLinks[userRole] || sidebarLinks.customer;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-left">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-800">
           <h4 className="text-sm font-black tracking-tight uppercase">{userRole}</h4>
        </div>
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

        {(activeTab === 'Requests' || activeTab === 'My Requests') ? (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b">
                <tr className="uppercase text-gray-400 font-bold">
                  <th className="p-4">Service</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.length > 0 ? requests.map((req) => (
                  <tr key={req.id}>
                    <td className="p-4 font-bold text-slate-900">{req.service?.title}</td>
                    <td className="p-4 text-gray-500">{req.customer?.name}</td>
                    <td className="p-4 font-black">${req.service?.price}</td>
                    <td className="p-4">
                      <select 
                        defaultValue={req.status} 
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className="border rounded p-1 font-bold uppercase cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button onClick={() => setSelectedOrder(req)} className="text-indigo-600 font-bold underline">View</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" className="p-4 text-center">No requests found.</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border p-12 text-center rounded-2xl">
            <p className="text-gray-400">Select "Requests" to view your data.</p>
          </div>
        )}
      </main>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-lg w-full text-left">
            <h2 className="font-black text-xl mb-4">Order Details</h2>
            <p><strong>Service:</strong> {selectedOrder.service?.title}</p>
            <p><strong>Requirements:</strong> {selectedOrder.requirements}</p>
            <p><strong>Budget:</strong> ${selectedOrder.service?.price}</p>
            <p><strong>Deadline:</strong> {selectedOrder.deadline}</p>
            <button onClick={() => setSelectedOrder(null)} className="mt-6 w-full bg-slate-900 text-white py-2 rounded-xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;