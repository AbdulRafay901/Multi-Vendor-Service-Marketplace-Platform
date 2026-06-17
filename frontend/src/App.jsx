import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServicesListing from './pages/ServicesListing';
import ServiceDetails from './pages/ServiceDetails'; // 💡 Yeh real page import rahega
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Dummy components tab tak ke liye jab tak inka real page nahi banta



function App() {  
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar /> 
      
      <Routes>
        {/* Screen #1: Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Screen #2: Services Listing Page */}
        <Route path="/services" element={<ServicesListing />} />
        
        {/* 💡 Screen #3: Service Details Page (Path ko /services/:id kar diya taake link perfectly match kare) */}
        <Route path="/services/:id" element={<ServiceDetails />} />
        
        {/* Screen #4: Login */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;