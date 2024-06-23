import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navigation({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('auth_token');
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user_id');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#627c85' }}>
      <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Početna</Link>
      <Link to="/historical-events" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Istorijski Događaji</Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Profil</Link>
          <Link to="/events" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Events</Link>
          <Link to="/orders" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Orders</Link>
          <Link to="/timeline" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Timeline</Link>

          <button onClick={handleLogout} style={{ margin: '10px', color: 'white', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>Odjavi se</button>
        </>
      ) : (
        <Link to="/auth" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Prijava/Registracija</Link>
      )}
    </nav>
  );
}

export default Navigation;
