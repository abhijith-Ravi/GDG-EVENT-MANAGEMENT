import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../api/eventService';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import './Events.css';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    usn: '',
    branch: '',
    mailid: '',
    phoneno: '',
    semester: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    try {
      await eventService.registerForEvent({
        ...registrationForm,
        event_name: selectedEvent.event_name,
      });
      alert('Registration submitted successfully!');
      setShowRegisterModal(false);
      setRegistrationForm({
        name: '',
        usn: '',
        branch: '',
        mailid: '',
        phoneno: '',
        semester: '',
      });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="events-container">
        <div className="events-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <h1>GDG Events</h1>
          <p>Choose an event to register for and become part of the community.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="events-grid">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} onRegister={handleRegisterClick} />
            ))
          ) : (
            <div className="empty-state">No upcoming events yet. Check back soon for new sessions.</div>
          )}
        </div>
      </div>

      <Modal isOpen={showRegisterModal} title="Event Registration" onClose={() => setShowRegisterModal(false)}>
        <form onSubmit={handleSubmitRegistration}>
          <div className="form-group">
            <label>Event</label>
            <p className="form-value">{selectedEvent?.event_name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={registrationForm.name} onChange={handleRegistrationChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="usn">USN</label>
            <input type="text" id="usn" name="usn" value={registrationForm.usn} onChange={handleRegistrationChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input type="text" id="branch" name="branch" value={registrationForm.branch} onChange={handleRegistrationChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="mailid">Email</label>
            <input type="email" id="mailid" name="mailid" value={registrationForm.mailid} onChange={handleRegistrationChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneno">Phone</label>
            <input type="text" id="phoneno" name="phoneno" value={registrationForm.phoneno} onChange={handleRegistrationChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <input type="number" id="semester" name="semester" value={registrationForm.semester} onChange={handleRegistrationChange} required />
          </div>
          <button type="submit" className="submit-btn">Submit Registration</button>
        </form>
      </Modal>
    </div>
  );
};
