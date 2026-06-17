import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import CategoryCard from '../components/Home/CategoryCard';

const Home = () => {
  const navigate = useNavigate();

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

      {/* Popular Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-900">Popular Categories</h2>
          <button onClick={() => navigate('/services')} className="text-sm text-indigo-600 font-bold hover:underline">
            View All
          </button>
        </div>

        {/* Responsive Grid - 5 items row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <CategoryCard 
              key={index}
              icon={cat.icon}
              name={cat.name}
              count={cat.count}
              onClick={() => navigate('/services')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;