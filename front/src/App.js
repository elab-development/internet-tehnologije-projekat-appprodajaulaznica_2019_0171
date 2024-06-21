import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePage from './Pocetna/HomePage';
import AuthPage from './Auth/AuthPage';
import HistoricalEvents from './ninjasApi/HistoricalEvents';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/historical-events" element={<HistoricalEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
