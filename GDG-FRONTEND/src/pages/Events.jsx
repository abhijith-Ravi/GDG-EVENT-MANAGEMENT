import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { eventService } from '../api/eventService';
import { paymentService } from '../api/paymentService';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import './Events.css';

export const Events = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Registration / payment modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [regStatus, setRegStatus] = useState('idle'); // 'idle' | 'paying' | 'registering' | 'success' | 'error'
  const [regMessage, setRegMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllUpcomingEvents();
        setEvents(Array.isArray(data) ? data : []);
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
    setStudentId('');
    setRegStatus('idle');
    setRegMessage('');
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
    setSelectedEvent(null);
    setRegStatus('idle');
    setRegMessage('');
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    const sid = parseInt(studentId, 10);
    if (isNaN(sid)) {
      setRegMessage('Please enter a valid Student ID.');
      setRegStatus('error');
      return;
    }

    const isPaid = selectedEvent?.registrationFee && selectedEvent.registrationFee > 0;

    try {
      if (isPaid) {
        setRegStatus('paying');
        setRegMessage('Opening payment gateway…');
        await paymentService.initiatePayment(
          selectedEvent.id,
          selectedEvent.event_name,
          user
        );
        setRegStatus('registering');
        setRegMessage('Payment verified. Completing registration…');
      } else {
        setRegStatus('registering');
        setRegMessage('Submitting registration…');
      }

      await eventService.registerForEvent(sid, selectedEvent.id);
      setRegStatus('success');
      setRegMessage('Registration successful! 🎉');
    } catch (err) {
      setRegStatus('error');
      setRegMessage(err.message || 'Registration failed. Please try again.');
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

      <Modal isOpen={showRegisterModal} title="Event Registration" onClose={closeModal}>
        {regStatus === 'success' ? (
          <div>
            <p className="success-message">{regMessage}</p>
            <button className="submit-btn" onClick={closeModal} style={{ marginTop: '1rem' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmitRegistration}>
            <div className="form-group">
              <label>Event</label>
              <p className="form-value">{selectedEvent?.event_name}</p>
            </div>
            {selectedEvent?.registrationFee > 0 && (
              <div className="form-group">
                <label>Registration Fee</label>
                <p className="form-value">₹{selectedEvent.registrationFee}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="studentId">Your Student ID</label>
              <input
                type="number"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
                required
                disabled={regStatus === 'paying' || regStatus === 'registering'}
              />
            </div>
            {regMessage && (
              <p className={regStatus === 'error' ? 'error-message' : 'info-message'}>{regMessage}</p>
            )}
            <button
              type="submit"
              className="submit-btn"
              disabled={regStatus === 'paying' || regStatus === 'registering'}
            >
              {regStatus === 'paying'
                ? 'Processing Payment…'
                : regStatus === 'registering'
                ? 'Registering…'
                : selectedEvent?.registrationFee > 0
                ? `Pay ₹${selectedEvent.registrationFee} & Register`
                : 'Register (Free)'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
