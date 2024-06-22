import React from 'react'; 
import EventCard from './EventCard';
import useFetchEvents from '../kuke/useFetchEvents';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const Events = () => {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <p style={{ color: colors.secondary }}>Loading events...</p>;
  if (error) return <p style={{ color: colors.secondary }}>Error loading events: {error.message}</p>;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', backgroundColor: colors.accent, padding: '20px' }}>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
