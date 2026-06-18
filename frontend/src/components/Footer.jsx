import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-400">
        <p>© 2026 ServiceHub. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-indigo-600 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;