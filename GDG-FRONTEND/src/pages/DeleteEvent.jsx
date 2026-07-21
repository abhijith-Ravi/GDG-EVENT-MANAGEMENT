import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../api/eventService';
import './ManageEvents.css';

export const DeleteEvent = () => {
  const [eventName, setEventName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to delete "${eventName}"?`);
    if (!confirmed) return;

    setLoading(true);
    setError('');

    try {
      await eventService.deleteEvent(eventName);
      alert('Event deleted successfully!');
      setEventName('');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-page">
      <div className="manage-card">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>Remove an event</h1>
        <p className="helper">Delete a past or canceled session from the event list.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="event_name">Event Name</label>
            <input
              type="text"
              id="event_name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="delete-btn" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Event'}
          </button>
        </form>
      </div>
    </div>
  );
};
