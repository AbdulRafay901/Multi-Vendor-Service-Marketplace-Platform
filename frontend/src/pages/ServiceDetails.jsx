import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary simple data link karne ke liye
  const serviceSample = {
    title: "High-Converting Multi-Vendor Laravel Marketplace Website",
    category: "Web Development",
    price: "150",
    delivery_time: "5",
    description: "Main aapke liye ek mukammal responsive multi-vendor marketplace website banaon ga Laravel aur MySQL ka istemal karte hue. Isme admin panel, vendor dashboard aur product listing ke saare basic features shamil honge.",
    provider: "Al-Raza Tech"
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/services')}
        className="text-sm font-bold text-indigo-600 hover:underline mb-6 block"
      >
        ← Back to Services
      </button>

      {/* Main Grid: Left side text, Right side price card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Info */}
        <div className="md:col-span-2 space-y-4">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-bold uppercase">
            {serviceSample.category}
          </span>
          
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            {serviceSample.title}
          </h1>

          <p className="text-sm text-gray-500 font-medium">
            Service Provider: <span className="text-gray-800 font-bold">{serviceSample.provider}</span>
          </p>

          {/* Simple Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" 
              alt="Service"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="pt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-650 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-150">
              {serviceSample.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing Box */}
        <div className="h-fit bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 font-bold">Price</span>
            <span className="text-2xl font-black text-indigo-600">${serviceSample.price}</span>
          </div>

          <div className="text-xs text-gray-600 space-y-2 mb-6 bg-gray-50 p-3 rounded-xl">
            <div>⏱️ Delivery Time: <span className="font-bold">{serviceSample.delivery_time} Days</span></div>
            <div>✔️ Full Source Code Included</div>
            <div>✔️ Responsive Layout Setup</div>
          </div>

          <button 
            onClick={() => alert('Order generated! (Internship Mockup)')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl transition-all"
          >
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;