import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 1. Navigation ke liye import kiya
import useFetchServices from '../hooks/useFetchServices';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SidebarFilter from '../components/SidebarFilter';
import ServiceCard from '../components/ServiceCard';

const ServicesListing = () => {
  const { services, loading, error } = useFetchServices();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // 💡 Live Search ki state
  const navigate = useNavigate(); // 💡 2. Navigation ka instance banaya

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Dynamic Categories Extract logic
  const categories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))];

  // 💡 3. Category + Search Logic dono ko combine kiya (As per Screen #2 UI)
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 🔍 TOP CONTROLS (Figma Screen #2 ke mutabiq Search + Sort layout) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Live Search Input */}
          <div className="w-full md:w-1/2 relative flex items-center">
            <span className="absolute left-3 text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-semibold text-gray-500">Sort by:</span>
            <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 focus:outline-none">
              <option>Latest</option>
              <option>Popularity</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter Component */}
          <SidebarFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

          {/* Services Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    // 💡 4. Card par click karte hi yeh user ko details page par le jayega
                    onClick={() => navigate(`/services/${service.id}`)} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium text-sm">Service Not Found</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServicesListing;