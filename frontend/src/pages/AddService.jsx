import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const navigate = useNavigate();
  
  // Real form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    price: '',
    deliveryTime: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    'Web Development',
    'Graphic Design',
    'Digital Marketing',
    'Content Writing',
    'Video Editing'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    const userSession = JSON.parse(localStorage.getItem('user'));
    const token = userSession ? userSession.token : null;

    if (!token) {
      setMessage({ type: 'error', text: 'Auth session expired. Please login again.' });
      setIsSubmitting(false);
      return;
    }

    // Preparing Data for Backend (FormData is used because of the image file)
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('category', formData.category);
    submitData.append('price', formData.price);
    submitData.append('delivery_time', formData.deliveryTime);
    submitData.append('description', formData.description);
    if (image) {
      submitData.append('image', image);
    }


    try {
      // ⚠️ UPDATE THIS URL TO YOUR ACTUAL BACKEND ENDPOINT
      const response = await fetch('http://127.0.0.1:8000/api/services', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Service successfully created and live!' });
        // Redirect to provider dashboard after 2 seconds
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Error saving service to database.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Backend API connection fail' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
          Create New Service
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Provide complete details to list your new gig on the marketplace.
        </p>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-xl text-sm font-bold border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Service Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="e.g. I will build responsive website using React"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Delivery Time Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Delivery Time</label>
            <input 
              type="text" 
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              required
              placeholder="e.g. 3 Days"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
            />
          </div>
        </div>

        {/* Price & Image Upload Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Price (USD)</label>
            <input 
              type="number" 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="5"
              placeholder="e.g. 150"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Service Thumbnail</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all text-slate-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Service Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="5"
            placeholder="Describe what you will provide in this service..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-xl text-xs font-bold text-white uppercase tracking-wider transition-all shadow-sm ${
              isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Service'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddService;