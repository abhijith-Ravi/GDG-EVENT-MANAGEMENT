const API_BASE = 'http://localhost:8080';

export const authService = {
  signup: async (username, password, usertype) => {
    const response = await fetch(`${API_BASE}/gdg/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, usertype }),
    });
    if (!response.ok) throw new Error('Signup failed');
    const result = await response.json();
    if (result === true) {
      return true;
    }
    throw new Error('Signup failed');
  },

  signin: async (username, password) => {
    const response = await fetch(`${API_BASE}/gdg/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Signin failed');
    return response.json();
  },

  updatePassword: async (username, oldPassword, newPassword) => {
    const response = await fetch(`${API_BASE}/gdg/updateLogin`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, oldPassword, newPassword }),
    });
    if (!response.ok) throw new Error('Update failed');
    return response.json();
  },

  deleteAccount: async (username, password) => {
    const response = await fetch(`${API_BASE}/gdg/deletelogin`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Delete failed');
    return response.json();
  },
};

export const authUtils = {
  getUser: () => {
    return {
      username: localStorage.getItem('username'),
      usertype: localStorage.getItem('usertype'),
    };
  },

  setUser: (username, usertype) => {
    localStorage.setItem('username', username);
    localStorage.setItem('usertype', usertype);
  },

  clearUser: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('usertype');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('username') && !!localStorage.getItem('usertype');
  },

  isAdmin: () => {
    return localStorage.getItem('usertype') === 'admin';
  },
};
