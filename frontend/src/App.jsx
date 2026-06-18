import React, { useState, useEffect } from 'react'; // 1. Import add kar diya
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/Home/HeroSection'; // Import kiya
import ServicesListing from './pages/ServicesListing';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddService from './pages/AddService';

function PublicHome() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/services')
      .then(res => res.json())
      .then(data => setServices(data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <HeroSection /> {/* Hero section wapis add kar diya */}
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black mb-6">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="border p-4 rounded-xl">
              <h3 className="font-bold">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const userSession = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!userSession;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PublicHome />} />
            <Route path="/services" element={<ServicesListing />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/add-service" element={isAuthenticated ? <AddService /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;