import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, setOrders, loading, error };
};

export default useFetchOrders;
