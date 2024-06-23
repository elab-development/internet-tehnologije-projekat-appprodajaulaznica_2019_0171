import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const InputField = ({ label, type, name, value, onChange }) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', color: colors.primary }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: '10px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }}
    />
  </div>
);

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'john.doe@example.com',
    password: 'password',
    password_confirmation: '',
    phone: ''
  });
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      const fetchSuggestedPassword = async () => {
        try {
          const response = await axios.get('https://api.api-ninjas.com/v1/passwordgenerator', {
            params: { length: 16 },
            headers: { 'X-Api-Key': 'cdBp5C7hVS7gbjOonMGK5KRnvweJwu3ie2B5TQAt' }
          });
          setSuggestedPassword(response.data.random_password);
        } catch (error) {
          console.error('Error fetching suggested password:', error);
        }
      };

      fetchSuggestedPassword();
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Predložena lozinka je kopirana u privremenu memoriju');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://127.0.0.1:8000/api/login' : 'http://127.0.0.1:8000/api/register';
      const response = await axios.post(url, formData);
      sessionStorage.setItem('auth_token', response.data.access_token);
      sessionStorage.setItem('user_id', response.data.user.id);

      setIsAuthenticated(true);
      if (response.data.user.role === "admin") {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
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
            <InputField label="Ime i Prezime" type="text" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Telefon" type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </>
        )}
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Lozinka" type="password" name="password" value={formData.password} onChange={handleChange} />
        {!isLogin && (
          <>
            <InputField label="Potvrdi Lozinku" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
            <div style={{ marginBottom: '15px', color: colors.secondary }}>
              <strong>Predložena Lozinka: </strong>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleCopyToClipboard(suggestedPassword)}>
                {suggestedPassword}
              </span>
            </div>
          </>
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
