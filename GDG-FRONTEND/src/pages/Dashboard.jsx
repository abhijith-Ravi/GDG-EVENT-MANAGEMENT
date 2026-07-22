import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { eventService } from '../api/eventService';
import { paymentService } from '../api/paymentService';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Registration / payment modal state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [regStatus, setRegStatus] = useState(''); // 'idle' | 'paying' | 'registering' | 'success' | 'error'
  const [regMessage, setRegMessage] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const upcoming = await eventService.getAllUpcomingEvents();
        const past = await eventService.getAllPastEvents();
        setUpcomingEvents(Array.isArray(upcoming) ? upcoming : []);
        setPastEvents(Array.isArray(past) ? past : []);
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
        // Step 1: Payment flow
        setRegStatus('paying');
        setRegMessage('Opening payment gateway…');
        await paymentService.initiatePayment(
          selectedEvent.id,
          selectedEvent.event_name,
          user
        );
        // Step 2: Only register after verified payment
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
    <div className="dashboard">
      <div className="page-shell">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Student community • Innovation • Tech</p>
            <h1>Welcome to GDG NMIT</h1>
            <p>Discover workshops, community meetups, and hands-on sessions designed to sharpen your technical skills and connect you with a vibrant developer network.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => navigate('/events')}>
                Register for events
              </button>
              <button className="secondary-btn" onClick={() => navigate('/profile')}>
                Manage account
              </button>
            </div>
          </div>
          <div className="hero-panel">
            <div className="welcome-card">
              <h2>Hello, {user?.username}</h2>
              <p>{isAdmin ? 'Admin access is enabled for event management.' : 'Student access is ready for registrations and discovery.'}</p>
            </div>
            {isAdmin && (
              <div className="quick-actions">
                <button className="action-card" onClick={() => navigate('/events/create')}>
                  Add event
                </button>
                <button className="action-card" onClick={() => navigate('/events/manage')}>
                  Manage events
                </button>
              </div>
            )}
          </div>
        </section>

        {error && <div className="error-banner">{error}</div>}

        <section className="section-card">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <button className="secondary-btn" onClick={() => navigate('/events')}>
              View all
            </button>
          </div>
          <div className="events-grid">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onRegister={handleRegisterClick} />
              ))
            ) : (
              <div className="empty-state">No upcoming events yet. Check back soon for new sessions.</div>
            )}
          </div>
        </section>

        <section className="section-card">
          <div className="section-header">
            <h2>Past Highlights</h2>
          </div>
          <div className="events-grid">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard key={event.id} event={event} onRegister={handleRegisterClick} showRegisterButton={false} />
              ))
            ) : (
              <div className="empty-state">Past highlights will appear here after events are completed.</div>
            )}
          </div>
        </section>
      </div>

      <Modal isOpen={showRegisterModal} title="Event Registration" onClose={closeModal}>
        {regStatus === 'success' ? (
          <div>
            <p className="success-message">{regMessage}</p>
            <button className="primary-btn" onClick={closeModal} style={{ marginTop: '1rem' }}>Close</button>
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
              className="primary-btn"
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
