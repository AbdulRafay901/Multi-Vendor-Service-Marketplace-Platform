import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States for form inputs
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`);
        const result = await response.json();
        if (response.ok) {
          setService(result.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleOrder = async () => {
    const storedData = localStorage.getItem('user');
    const userSession = storedData ? JSON.parse(storedData) : null;
    const token = userSession ? userSession.token : null;

    if (!token) {
      alert("Please login to place an order!");
      navigate('/login');
      return;
    }

    if (!requirements.trim() || !deadline) {
      alert("Please fill in both requirements and a deadline date.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          service_id: service.id,
          requirements: requirements,
          budget: service.price,
          deadline: deadline
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Service requested successfully!");
        navigate('/my-orders');
      } else {
        alert(result.message || "Failed to place order. Check your input.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong with the server.");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Content */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-gray-900">{service.title}</h1>
          <img 
            src={`http://127.0.0.1:8000/storage/${service.image}`} 
            alt={service.title} 
            className="w-full h-80 object-cover rounded-2xl"
          />
          <h3 className="font-bold text-lg">About This Service</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>

        {/* Right Side: Order Form */}
        <div className="bg-white border p-6 rounded-2xl shadow-sm h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-gray-500">Price</span>
            <span className="text-2xl font-black text-indigo-600">${service.price}</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-gray-700">Your Requirements</label>
              <textarea 
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl text-sm"
                placeholder="Describe what you need..."
                rows="4"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-700">Deadline</label>
              <input 
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full mt-2 p-3 border rounded-xl text-sm"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <button 
              onClick={handleOrder}
              className="w-full bg-indigo-600 text-white font-black py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;