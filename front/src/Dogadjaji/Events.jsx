import React, { useState } from 'react'; 
import EventCard from './EventCard';
import useFetchEvents from '../kuke/useFetchEvents';
import Timeline from './Timeline';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const Events = () => {
  const { events, loading, error } = useFetchEvents();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{ color: colors.secondary }}>Loading events...</p>;
  if (error) return <p style={{ color: colors.secondary }}>Error loading events: {error.message}</p>;

  return (
    <div style={{ backgroundColor: colors.accent, padding: '20px' }}>
      <input
        type="text"
        placeholder="Search events"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          borderRadius: '5px',
          border: `1px solid ${colors.primary}`
        }}
      />
       
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
