import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesListing from './pages/ServicesListing';
import ServiceDetails from './pages/ServiceDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddService from './pages/AddService';

function App() {
  const userSession = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!userSession;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Ab yahan PublicHome ki jagah direct Home component use hoga */}
            <Route path="/" element={<Home />} />
            
            <Route path="/services" element={<ServicesListing />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/my-orders" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/my-gigs" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
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