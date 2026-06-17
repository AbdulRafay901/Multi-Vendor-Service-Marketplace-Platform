import React, { useState } from 'react';
import useFetchServices from '../hooks/useFetchServices';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SidebarFilter from '../components/SidebarFilter';
import ServiceCard from '../components/ServiceCard';

const ServicesListing = () => {
  const { services, loading, error } = useFetchServices(); // Custom hook se data liya
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Dynamic Categories Extract logic
  const categories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))];

  // Filtering Logic
  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        
        {/* Sidebar Filter Component */}
        <SidebarFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* Services Grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">Service Not Found</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesListing;