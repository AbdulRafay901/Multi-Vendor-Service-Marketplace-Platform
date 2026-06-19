import React, { useState, useEffect } from 'react'; // 1. useState, useEffect import kiye
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import CategoryCard from '../components/Home/CategoryCard';

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

      
    </div>
  );
};

export default Home;