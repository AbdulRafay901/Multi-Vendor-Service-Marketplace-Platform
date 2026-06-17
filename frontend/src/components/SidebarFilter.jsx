import React from 'react';

const SidebarFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">Categories</h3>
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;