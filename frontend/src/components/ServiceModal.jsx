import React from 'react';

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
            {service.category || 'General'}
          </span>
          <button 
            onClick={onClose}
            className="bg-white border border-gray-200 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
            {service.title}
          </h2>
          
          {/* Vendor Info */}
          <div className="flex items-center gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
            <div className="w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-inner">
              {service.provider?.name?.charAt(0) || 'V'}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Service Provider</p>
              <p className="text-sm font-bold text-gray-850">{service.provider?.name || 'Anonymous Vendor'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">About This Gig / Service:</h4>
            <p className="text-sm text-gray-650 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100">
              {service.description}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Budget</p>
            <p className="text-2xl font-black text-indigo-600">${service.price}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              ⏱️ {service.delivery_time} Days Delivery
            </span>
            <button 
              onClick={() => alert('Order System coming in next sprint! Mock successfully triggered.')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-100 transition-all transform active:scale-95"
            >
              Order Now 🚀
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceModal;