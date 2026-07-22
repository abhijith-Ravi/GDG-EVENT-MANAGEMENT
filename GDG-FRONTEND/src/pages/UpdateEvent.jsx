import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../api/eventService';
import './ManageEvents.css';

const STATUS_OPTIONS = ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'];

export const UpdateEvent = () => {
  const [formData, setFormData] = useState({
    id: '',
    event_name: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    registrationDeadline: '',
    status: 'UPCOMING',
    registrationFee: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    try {
      const payload = {
        id: parseInt(formData.id, 10),
        event_name: formData.event_name,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        capacity: parseInt(formData.capacity, 10),
        registrationDeadline: formData.registrationDeadline,
        status: formData.status,
        registrationFee: formData.registrationFee ? parseFloat(formData.registrationFee) : 0,
      };
      await eventService.updateEvent(payload);
      setSuccess('Event updated successfully!');
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
        <h1>Update an existing event</h1>
        <p className="helper">Refresh the details for your next GDG session.</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Event ID</label>
            <input type="number" id="id" name="id" value={formData.id} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="event_name">Event Name</label>
            <input type="text" id="event_name" name="event_name" value={formData.event_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Event Date &amp; Time</label>
            <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input type="number" id="capacity" name="capacity" min="1" value={formData.capacity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="registrationDeadline">Registration Deadline</label>
            <input type="datetime-local" id="registrationDeadline" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} required>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="registrationFee">Registration Fee (₹)</label>
            <input type="number" id="registrationFee" name="registrationFee" min="0" step="0.01" value={formData.registrationFee} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Event'}
          </button>
        </form>
      </div>
    </div>
  );
};
