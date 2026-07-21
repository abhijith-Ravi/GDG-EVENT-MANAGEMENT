const API_BASE = 'http://localhost:8080';

export const eventService = {
  // Event endpoints
  getAllUpcomingEvents: async () => {
    const response = await fetch(`${API_BASE}/api/upcomingEvents`);
    if (!response.ok) throw new Error('Failed to fetch upcoming events');
    return response.json();
  },

  getAllPastEvents: async () => {
    const response = await fetch(`${API_BASE}/api/pastEvents`);
    if (!response.ok) throw new Error('Failed to fetch past events');
    return response.json();
  },

  getAllEvents: async () => {
    const response = await fetch(`${API_BASE}/api/Allevents`);
    if (!response.ok) throw new Error('Failed to fetch all events');
    return response.json();
  },

  getEventByName: async (eventName) => {
    const response = await fetch(`${API_BASE}/api/events?eventName=${eventName}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  },

  updateEvent: async (eventData) => {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Failed to update event');
    return response.json();
  },

  deleteEvent: async (eventName) => {
    const response = await fetch(`${API_BASE}/api/events`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_name: eventName }),
    });
    if (!response.ok) throw new Error('Failed to delete event');
    return response.json();
  },

  // Registration endpoints
  registerForEvent: async (registrationData) => {
    const response = await fetch(`${API_BASE}/gdg/EventRegister`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    });
    if (!response.ok) throw new Error('Failed to register for event');
    const message = await response.text();
    alert(message);
    return response.json();
  },

  getRegisteredEvents: async (username) => {
    const response = await fetch(`${API_BASE}/gdg/getRegisteredEvents?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch registered events');
    return response.json();
  },
};
