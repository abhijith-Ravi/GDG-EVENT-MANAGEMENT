import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { eventService } from '../api/eventService';
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const upcoming = await eventService.getAllUpcomingEvents();
        const past = await eventService.getAllPastEvents();
        setUpcomingEvents(upcoming);
        setPastEvents(past);
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
              <p>{user?.usertype === 'admin' ? 'Admin access is enabled for event management.' : 'Student access is ready for registrations and discovery.'}</p>
            </div>
            {user?.usertype === 'admin' && (
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
          <button type="submit" className="primary-btn">Submit Registration</button>
        </form>
      </Modal>
    </div>
  );
};
