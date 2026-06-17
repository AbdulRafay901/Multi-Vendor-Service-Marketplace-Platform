import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
          {service.category || 'General Service'}
        </span>
        <h4 className="font-bold text-gray-900 text-base mt-3 line-clamp-2">{service.title}</h4>
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{service.description}</p>
      </div>

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting At</p>
          <p className="text-xl font-extrabold text-indigo-600">${service.price}</p>
        </div>
        <div className="text-right">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium inline-block">
            ⏱️ {service.delivery_time} Days Delivery
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;