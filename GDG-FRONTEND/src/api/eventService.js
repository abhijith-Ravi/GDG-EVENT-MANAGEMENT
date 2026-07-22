import { authUtils } from './authService';

const API_BASE = import.meta.env.VITE_API_URL || '';

function getAuthHeaders() {
  const token = authUtils.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Failed to connect to backend server. Please make sure the Spring Boot application is running on port 8080.');
    }
    throw err;
  }
}

async function handleResponse(response) {
  if (response.status === 401) {
    authUtils.clearUser();
    window.location.href = '/';
    throw new Error('Session expired. Please sign in again.');
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json();
}

export const eventService = {
  getAllUpcomingEvents: async () => {
    const response = await safeFetch(`${API_BASE}/api/upcomingEvents`, {
      headers: getAuthHeaders(),
    });
    const result = await handleResponse(response);
    // ApiResponse<List<EventTable>> → result.data
    return result.data ?? result;
  },

  getAllPastEvents: async () => {
    const response = await safeFetch(`${API_BASE}/api/pastEvents`, {
      headers: getAuthHeaders(),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  getAllEvents: async () => {
    const response = await safeFetch(`${API_BASE}/api/Allevents`, {
      headers: getAuthHeaders(),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  getEventByName: async (eventName) => {
    const response = await safeFetch(
      `${API_BASE}/api/events?eventName=${encodeURIComponent(eventName)}`,
      { headers: getAuthHeaders() }
    );
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  createEvent: async (eventData) => {
    const response = await safeFetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  updateEvent: async (eventData) => {
    const response = await safeFetch(`${API_BASE}/api/events`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  // Backend: DELETE /api/events/{id}  (id is Integer)
  deleteEvent: async (eventId) => {
    const response = await safeFetch(`${API_BASE}/api/events/${eventId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  // Backend: POST /gdg/EventRegister  { studentId, eventId }
  registerForEvent: async (studentId, eventId) => {
    const response = await safeFetch(`${API_BASE}/gdg/EventRegister`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ studentId, eventId }),
    });
    const result = await handleResponse(response);
    return result.data ?? result;
  },

  // Backend: GET /gdg/getRegisteredEvents?studentId={Integer}
  getRegisteredEvents: async (studentId) => {
    const response = await safeFetch(
      `${API_BASE}/gdg/getRegisteredEvents?studentId=${studentId}`,
      { headers: getAuthHeaders() }
    );
    const result = await handleResponse(response);
    return result.data ?? result;
  },
};
