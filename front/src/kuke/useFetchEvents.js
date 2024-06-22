import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, setEvents, loading, error };
};

export default useFetchEvents;
