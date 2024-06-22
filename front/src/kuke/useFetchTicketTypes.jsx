import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTicketTypes = () => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/ticket-types', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicketTypes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTicketTypes();
  }, []);

  return { ticketTypes, loading, error };
};

export default useFetchTicketTypes;
