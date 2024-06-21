import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets,setTickets ,loading, error };
};

export default useFetchTickets;
