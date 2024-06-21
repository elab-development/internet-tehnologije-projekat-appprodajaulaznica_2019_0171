import React, { useState } from 'react';
import axios from 'axios';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'john.doe@example.com',
    password: 'password',
    password_confirmation: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://127.0.0.1:8000/api/login' : 'http://127.0.0.1:8000/api/register';
      const response = await axios.post(url, formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: colors.accent, minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: colors.primary }}>{isLogin ? 'Prijavite se' : 'Registrujte se'}</h1>
        <p style={{ color: colors.secondary }}>Dobrodošli nazad! {isLogin ? 'Prijavite se da nastavite.' : 'Kreirajte novi nalog.'}</p>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setIsLogin(true)}
          style={{
            backgroundColor: isLogin ? colors.primary : colors.tertiary,
            color: 'white',
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Prijava
        </button>
        <button
          onClick={() => setIsLogin(false)}
          style={{
            backgroundColor: !isLogin ? colors.primary : colors.tertiary,
            color: 'white',
            padding: '10px 20px',
            marginLeft: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Registracija
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        {!isLogin && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: colors.primary }}>Ime i Prezime</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: colors.primary }}>Telefon</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }} />
            </div>
          </>
        )}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: colors.primary }}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: colors.primary }}>Lozinka</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }} />
        </div>
        {!isLogin && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: colors.primary }}>Potvrdi Lozinku</label>
            <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }} />
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ backgroundColor: colors.highlight, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {isLogin ? 'Prijavi se' : 'Registruj se'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
