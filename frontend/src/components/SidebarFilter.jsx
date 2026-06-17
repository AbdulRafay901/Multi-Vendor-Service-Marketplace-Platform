import React from 'react';

const SidebarFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6">
      
      {/* 📁 Categories Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Categories</h3>
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category === 'All' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* 💰 Price Range Card (Exact UI Match) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Price Range</h3>
        <div className="flex items-center gap-2 mb-4">
          <input 
            type="number" 
            placeholder="Min" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium text-gray-700" 
          />
          <span className="text-gray-400 text-xs">to</span>
          <input 
            type="number" 
            placeholder="Max" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-medium text-gray-700" 
          />
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-all">
          Filter
        </button>
      </div>

    </div>
  );
};

export default SidebarFilter;