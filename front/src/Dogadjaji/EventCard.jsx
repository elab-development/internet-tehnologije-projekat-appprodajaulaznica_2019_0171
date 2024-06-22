import React, { useState } from 'react';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const EventCard = ({ event }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    const token = sessionStorage.getItem('auth_token');
    const userId = sessionStorage.getItem('user_id');  
    const tickets = [{ ticket_id: event.id, quantity }];

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: userId, tickets })
      });

      if (response.ok) {
        alert('Order created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

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
      <div style={{ marginTop: '10px' }}>
        <label>
          Quantity:
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            style={{ marginLeft: '10px', width: '50px' }}
            min="1"
          />
        </label>
        <button onClick={handlePurchase} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: colors.highlight, color: 'white', border: 'none' }}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
