import React, { useState, useEffect } from 'react'; // 1. useState, useEffect import kiye
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import CategoryCard from '../components/Home/CategoryCard';
import Counter from "../components/Counter";

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]); // 2. Services state

  // Services fetch karne ka function
  const fetchServices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/services');
      const result = await response.json();
      setServices(result.data || []);
    } catch (error) { console.error("Error fetching services:", error); }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const categories = [
    { name: 'Web Development', icon: '💻', count: '130' },
    { name: 'Graphic Design', icon: '🎨', count: '85' },
    { name: 'Digital Marketing', icon: '📈', count: '95' },
    { name: 'Content Writing', icon: '📝', count: '70' },
    { name: 'Video Editing', icon: '🎬', count: '60' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-900">Popular Categories</h2>
          <button onClick={() => navigate('/services')} className="text-sm text-indigo-600 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <CategoryCard key={index} icon={cat.icon} name={cat.name} count={cat.count} onClick={() => navigate('/services')} />
          ))}
        </div>
      </div>



{/* Featured Services */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl font-black text-gray-900">
      Featured Services
    </h2>

    <button
      onClick={() => navigate('/services')}
      className="text-indigo-600 font-bold hover:underline"
    >
      View All
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.slice(0, 6).map((service) => (
      <div
        key={service.id}
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Service Image */}
        <div className="overflow-hidden">
          <img
            src={`http://127.0.0.1:8000/storage/${service.image}`}
            alt={service.title}
            className="w-full h-56 object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {service.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {service.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mt-5">
            <div>
              <p className="text-xs text-gray-500">
                Starting At
              </p>
              <p className="text-lg font-bold text-indigo-600">
                ${service.price}
              </p>
            </div>

            <button
              onClick={() => navigate(`/services/${service.id}`)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>





    </div>

    
  );
};

export default Home;