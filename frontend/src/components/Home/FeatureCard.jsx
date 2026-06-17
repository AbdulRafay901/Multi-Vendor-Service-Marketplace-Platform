import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="space-y-3 p-4 bg-white/40 md:bg-transparent rounded-2xl border border-transparent md:border-none hover:border-gray-100 transition-colors text-center md:text-left">
      <div className="text-3xl filter drop-shadow-sm inline-block">
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-lg">
        {title}
      </h3>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;