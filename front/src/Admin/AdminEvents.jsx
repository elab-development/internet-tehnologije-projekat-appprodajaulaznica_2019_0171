import React, { useState } from 'react';
import axios from 'axios';
import './AdminEvents.css';
import useFetchEvents from '../kuke/useFetchEvents';

const AdminEvents = () => {
  const { events, setEvents, loading, error } = useFetchEvents();
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: 'Test Event',
    description: 'This is a description for the test event.',
    location: 'Test Location',
    images: '["image1.jpg", "image2.jpg"]',
    event_date: '2023-12-31',
    start_time: '18:00',
    end_time: '20:00'
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toTimeString().split(':').slice(0, 2).join(':');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleAddOrUpdateEvent = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');
    try {
      if (editingEvent) {
        const response = await axios.put(`http://127.0.0.1:8000/api/events/${editingEvent.id}`, newEvent, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === editingEvent.id ? response.data.data : event))
        );
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/events', newEvent, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents((prevEvents) => [...prevEvents, response.data.data]);
      }
      setEditingEvent(null);
      setNewEvent({
        name: '',
        description: '',
        location: '',
        images: '',
        event_date: '',
        start_time: '',
        end_time: ''
      });
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      ...event,
      event_date: formatDate(event.event_date),
      start_time: formatTime(event.start_time),
      end_time: formatTime(event.end_time)
    });
  };

  const handleDeleteEvent = async (id) => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error loading events: {error.message}</div>;

  return (
    <div className="admin-events-container">
      <h2 className="admin-events-title">Events Management</h2>
      <form onSubmit={handleAddOrUpdateEvent} className="admin-events-form">
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleInputChange}
          placeholder="Event Name"
          required
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          required
        ></textarea>
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="images"
          value={newEvent.images}
          onChange={handleInputChange}
          placeholder="Images (JSON)"
          required
        />
        <input
          type="date"
          name="event_date"
          value={newEvent.event_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="start_time"
          value={newEvent.start_time}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="end_time"
          value={newEvent.end_time}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="button button-primary">
          {editingEvent ? 'Update Event' : 'Add Event'}
        </button>
      </form>
      <table className="admin-events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Event Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td>{event.event_date}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
              <td>
                <button onClick={() => handleEditEvent(event)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvents;
