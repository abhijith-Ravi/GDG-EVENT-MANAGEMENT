import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../api/eventService';
import './ManageEvents.css';

export const UpdateEvent = () => {
  const [formData, setFormData] = useState({
    event_name: '',
    date: '',
    description: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await eventService.updateEvent(formData);
      alert('Event updated successfully!');
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
        <h1>Update an existing event</h1>
        <p className="helper">Refresh the details for your next GDG session.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event_name">Event Name</label>
            <input type="text" id="event_name" name="event_name" value={formData.event_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date & Time</label>
            <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Event'}
          </button>
        </form>
      </div>
    </div>
  );
};
