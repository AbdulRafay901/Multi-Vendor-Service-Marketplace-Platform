import React from 'react';

const ServiceCard = ({ service, onClick }) => {
  // UI ko real-world look dene ke liye placeholder images matching categories
  const getPlaceholderImage = (category) => {
    if (category?.toLowerCase().includes('web')) return 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=500&q=80';
    if (category?.toLowerCase().includes('design')) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80';
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group"
    >
      {/* 🖼️ Service Image Slot */}
      <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={getPlaceholderImage(service.category)} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content Wrapper */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-indigo-600 transition-colors">
            {service.title}
          </h4>

          {/* Vendor Row */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <div className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs flex items-center justify-center">
              {service.provider?.name?.charAt(0) || 'V'}
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {service.provider?.name || 'Al Raza'}
            </span>
          </div>
        </div>

        {/* Divider line like UI */}
        <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">From</p>
            <p className="text-sm font-black text-gray-900">${parseInt(service.price)}</p>
          </div>
          {/* Rating & Days matching UI */}
          <div className="text-right flex items-center gap-2">
            <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
              ⭐ 4.9 <span className="text-gray-400 font-normal">(120)</span>
            </span>
            <span className="text-[10px] bg-gray-50 text-gray-550 border border-gray-100 px-1.5 py-0.5 rounded font-medium">
              {service.delivery_time} Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;