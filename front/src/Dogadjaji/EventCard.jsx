import React from 'react';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const EventCard = ({ event }) => {
  return (
    <div style={{ 
      backgroundColor: colors.primary, 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px', 
      width: '300px', 
      margin: '10px',
      textAlign: 'center'
    }}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.event_date}</p>
      <p>Time: {event.start_time} - {event.end_time}</p>
      {event.images && <img src={event.images} alt={`${event.name}`} style={{ maxWidth: '100%', borderRadius: '10px' }} />}
    </div>
  );
};

export default EventCard;
