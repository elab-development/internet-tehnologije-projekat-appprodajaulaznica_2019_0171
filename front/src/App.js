import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pocetna/HomePage';
import AuthPage from './Auth/AuthPage';
import HistoricalEvents from './ninjasApi/HistoricalEvents';
import Navigation from './Nav/Navigation'; 
import ProfilePage from './Profil/ProfilePage';
import Events from './Dogadjaji/Events';
import Orders from './Orders/Orders';
import AdminEvents from './Admin/AdminEvents';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('auth_token'));

  return (
    <Router>
      <div className="App">
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/historical-events" element={<HistoricalEvents />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/orders" element={<Orders />} />


          <Route path="/admin" element={<AdminEvents />} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
