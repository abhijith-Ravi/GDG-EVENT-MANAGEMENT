import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../api/eventService';
import './ManageEvents.css';

export const DeleteEvent = () => {
  const [eventId, setEventId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = parseInt(eventId, 10);
    if (isNaN(id)) {
      setError('Please enter a valid event ID.');
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to delete event with ID "${id}"?`);
    if (!confirmed) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Backend: DELETE /api/events/{id}
      await eventService.deleteEvent(id);
      setSuccess('Event deleted successfully!');
      setEventId('');
      setTimeout(() => navigate('/dashboard'), 1500);
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
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="event_id">Event ID</label>
            <input
              type="number"
              id="event_id"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Enter the numeric event ID"
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
