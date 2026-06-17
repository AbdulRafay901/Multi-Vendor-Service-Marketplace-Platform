import { useState, useEffect } from 'react';
import API from '../api/axios';

const useFetchServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await API.get('/services');
        
        if (response.data && Array.isArray(response.data.data)) {
          setServices(response.data.data);
        } else if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Backend se data load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export default useFetchServices;