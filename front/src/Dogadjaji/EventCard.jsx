import React, { useState, useEffect } from 'react';
import useFetchTicketTypes from '../kuke/useFetchTicketTypes';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const EventCard = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [seat, setSeat] = useState('');
  const [price, setPrice] = useState(0);
  const [ticketTypeId, setTicketTypeId] = useState('');

  const { ticketTypes, loading, error } = useFetchTicketTypes();

  useEffect(() => {
    const generateSeat = () => {
      const row = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
      const number = Math.floor(Math.random() * 101); // 0-100
      return `${row}${number}`;
    };
    setSeat(generateSeat());
  }, []);

  useEffect(() => {
    const selectedType = ticketTypes.find(type => type.id === parseInt(ticketTypeId));
    if (selectedType) {
      setPrice(selectedType.price * quantity);
    } else {
      setPrice(0);
    }
  }, [ticketTypeId, quantity, ticketTypes]);

  const handlePurchase = async () => {
    const token = sessionStorage.getItem('auth_token');
    const userId = sessionStorage.getItem('user_id');
    const tickets = [{
      ticket_id: event.id,
      quantity,
      seat,
      price,
      ticket_type_id: parseInt(ticketTypeId, 10), // Ensure ticket_type_id is an integer
      event_id: event.id
    }];

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
        alert(`Error: ${JSON.stringify(errorData)}`);
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
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Ticket Type:
          <select 
            value={ticketTypeId} 
            onChange={(e) => setTicketTypeId(e.target.value)} 
            style={{ 
              marginLeft: '10px', 
              width: '100%', 
              padding: '5px', 
              borderRadius: '5px', 
              border: `1px solid ${colors.secondary}`,
              backgroundColor: colors.secondary,
              color: 'white'
            }}
          >
            <option value="" disabled>Select Type</option>
            {loading && <option>Loading...</option>}
            {error && <option>Error loading types</option>}
            {ticketTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Quantity:
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            style={{ 
              marginLeft: '10px', 
              width: '100%', 
              padding: '5px', 
              borderRadius: '5px', 
              border: `1px solid ${colors.secondary}`,
              backgroundColor: colors.secondary,
              color: 'white'
            }}
            min="1"
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Price:
          <input 
            type="number" 
            value={price} 
            readOnly 
            style={{ 
              marginLeft: '10px', 
              width: '100%', 
              padding: '5px', 
              borderRadius: '5px', 
              border: `1px solid ${colors.secondary}`,
              backgroundColor: colors.secondary,
              color: 'white'
            }}
          />
        </label>
        <button 
          onClick={handlePurchase} 
          style={{ 
            marginLeft: '10px', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            backgroundColor: colors.highlight, 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
