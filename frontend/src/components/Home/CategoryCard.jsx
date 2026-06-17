import React from 'react';

const CategoryCard = ({ icon, name, count, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-indigo-100 hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center gap-4 group"
    >
      {/* Icon Area */}
      <div className="w-16 h-16 flex items-center justify-center text-3xl text-indigo-600">
        {icon}
      </div>
      
      {/* Text Area */}
      <div>
        <h4 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
          {name}
        </h4>
        <p className="text-[11px] text-gray-400 font-medium mt-1">
          ({count})
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;