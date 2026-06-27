import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const ServicesListing = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Categories',
    'Web Development',
    'Graphic Design',
    'Digital Marketing',
    'Content Writing',
    'Video Editing'
  ];


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services');
        const result = await response.json();
        if (response.ok) {
          setServices(result.data); // Backend se aane wala data
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        
        setLoading(false);
      }
    };
    fetchServices();
  }, []);


  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-md bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Showing <span className="text-gray-900">{filteredServices.length}</span> results
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 text-left">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b pb-3 mb-4">Categories</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Services Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white border rounded-2xl">No Records Found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const avgRating = service.reviews_avg_rating ? Number(service.reviews_avg_rating).toFixed(1) : '0.0';
                const totalReviews = service.reviews_count || 0;

                return (
                  <div 
                    key={service.id}
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <img 
                        src={`http://127.0.0.1:8000/storage/${service.image}`} 
                        alt={service.title} 
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                          {service.category} • {service.delivery_time} Days Delivery
                        </div>
                        <h3 className="font-bold text-sm leading-snug line-clamp-2 text-slate-800">
                          {service.title}
                        </h3>

                        {/* ⭐ Rating UI Section */}
                        <div className="flex items-center gap-1 text-amber-500 font-black text-xs pt-0.5">
                          <Star size={13} fill="currentColor" className="text-amber-500" />
                          <span>{avgRating}</span>
                          <span className="text-gray-400 font-bold text-[11px]">
                            ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
                      <span className="text-xs font-semibold text-gray-500">By Provider</span>
                      <span className="text-sm font-black text-indigo-600">${service.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesListing;