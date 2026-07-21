import React from 'react';
import './EventCard.css';

export const EventCard = ({ event, onRegister, showRegisterButton = true }) => {
  const formatDate = (dateValue) => {
    if (!dateValue) return 'TBD';
    const date = new Date(dateValue);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <article className="event-card">
      <span className="event-pill">{event.location || 'Community Event'}</span>
      <h3 className="event-card-title">{event.event_name || 'Untitled Event'}</h3>
      <p className="event-card-meta">{formatDate(event.date)}</p>
      <p className="event-card-description">{event.description || 'A fresh opportunity to learn, connect, and build with the GDG community.'}</p>
      {showRegisterButton && (
        <button className="event-card-btn" onClick={() => onRegister(event)}>
          Reserve spot
        </button>
      )}
    </article>
  );
};
