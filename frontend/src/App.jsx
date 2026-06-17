import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServicesListing from './pages/ServicesListing';


const Home = () => <div className="p-8 text-center text-2xl font-bold">1. Landing Page (Home) Coming Soon...</div>;

const ServiceDetails = () => <div className="p-8 text-center text-2xl font-bold">3. Service Details Page Coming Soon...</div>;
const Login = () => <div className="p-8 text-center text-2xl font-bold">4. Login Page Coming Soon...</div>;

function App() {  
  return (
    <Router>
      {/* Navbar*/}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesListing />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;