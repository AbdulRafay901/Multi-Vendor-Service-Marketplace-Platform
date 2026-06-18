import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // API se single service fetch karna
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

  if (loading) return <div className="text-center py-20">Loading Service Details...</div>;

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider mt-2">Listing Record Unavailable</h2>
        <button 
          onClick={() => navigate('/services')}
          className="mt-4 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex gap-2 mb-6 text-left">
        <span className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
        <span>/</span>
        <span className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate('/services')}>Services</span>
        <span>/</span>
        <span className="text-gray-900">{service.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
            {service.title}
          </h1>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 w-fit">
            {/* Provider Name Initial */}
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-black text-xs text-white uppercase">
              {service.provider?.name ? service.provider.name[0] : 'U'}
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-900">{service.provider?.name || 'Unknown Provider'}</h4>
            </div>
          </div>

          <img 
            src={`http://127.0.0.1:8000/storage/${service.image}`} 
            alt={service.title} 
            className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-gray-100 shadow-sm"
          />

          <div className="space-y-3">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-wider">About This Service</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {service.description}
            </p>
          </div>
        </div>

        {/* Purchase Widget */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Price</span>
              <span className="text-2xl font-black text-indigo-600">${service.price}</span>
            </div>

            <ul className="space-y-2.5 text-xs font-bold text-gray-500 mb-6">
              <li className="flex items-center gap-2">⏱️ Delivery Time: <span className="text-gray-900">{service.delivery_time}</span></li>
            </ul>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl shadow-sm transition-all mb-3">
              Continue Checkout (${service.price})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;