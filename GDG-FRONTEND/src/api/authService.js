const API_BASE = import.meta.env.VITE_API_URL || '';


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

export const authService = {
  signup: async (userData) => {
    const response = await safeFetch(`${API_BASE}/gdg/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Signup failed');
    }
    return result.data; // Boolean true
  },

  signin: async (username, password) => {
    const response = await safeFetch(`${API_BASE}/gdg/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Invalid username or password');
    }
    // result.data = { token, username, role }
    return result.data;
  },
};

export const authUtils = {
  getUser: () => {
    return {
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      studentId: localStorage.getItem('studentId'),
    };
  },

  setUser: (username, role, token, studentId) => {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    if (studentId != null) {
      localStorage.setItem('studentId', String(studentId));
    }
  },

  clearUser: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
  },

  getToken: () => localStorage.getItem('token'),

  getRole: () => localStorage.getItem('role'),

  getStudentId: () => {
    const id = localStorage.getItem('studentId');
    return id ? parseInt(id, 10) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token') && !!localStorage.getItem('username');
  },

  isAdmin: () => {
    return localStorage.getItem('role') === 'ADMIN';
  },
};
