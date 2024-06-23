import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1;  // JavaScript months are 0-based, so add 1
};

const HistoricalEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(getCurrentMonth());
  const cache = useRef({});  // Use useRef to create a cache object that persists across renders

  const fetchEvents = async (month) => {
    if (cache.current[month]) {  // Check if the data for the selected month is already in the cache
      setEvents(cache.current[month]);  // If it is, use the cached data
      setLoading(false);  // Set loading to false because we have the data
    } else {
      try {
        setLoading(true);  // Set loading to true while fetching data
        const response = await axios.get(`https://api.api-ninjas.com/v1/historicalevents?month=${month}`, {
          headers: { 'X-Api-Key': 'cdBp5C7hVS7gbjOonMGK5KRnvweJwu3ie2B5TQAt' }
        });
        cache.current[month] = response.data;  // Store the fetched data in the cache
        setEvents(response.data);  // Update the state with the fetched data
        setLoading(false);  // Set loading to false because the fetch is complete
      } catch (error) {
        setError(error);  // If there's an error, store it in the state
        setLoading(false);  // Set loading to false because the fetch is complete (even though it failed)
      }
    }
  };

  useEffect(() => {
    fetchEvents(month);  // Fetch events when the component mounts or when the selected month changes
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);  // Update the selected month when the user changes the selection
  };

  if (loading) return <p style={{ color: colors.primary }}>Učitavanje...</p>;
  if (error) return <p style={{ color: colors.primary }}>Došlo je do greške: {error.message}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: colors.accent, minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: colors.primary }}>Istorijski Događaji</h1>
        <p style={{ color: colors.secondary }}>Poznati događaji u istoriji.</p>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ color: colors.primary, marginRight: '10px' }}>Odaberi mesec:</label>
        <select value={month} onChange={handleMonthChange} style={{ padding: '5px', borderRadius: '5px', border: `1px solid ${colors.secondary}` }}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        {events.map((event, index) => (
          <div key={index} style={{ backgroundColor: 'white', margin: '10px', padding: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: colors.primary }}>{`${event.year}-${event.month}-${event.day}`}</h2>
            <p style={{ color: colors.secondary }}>{event.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalEvents;
