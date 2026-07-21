import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, authUtils } from '../api/authService';
import { AuthContext } from '../context/AuthContext';
import './SignUp.css';

export const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', password: '', usertype: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.signup(formData.username, formData.password, formData.usertype);
      // Automatically sign in after signup
      const result = await authService.signin(formData.username, formData.password);
      authUtils.setUser(result.username, result.usertype);
      setUser({ username: result.username, usertype: result.usertype });
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join the GDG NMIT community and start exploring events.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="usertype">Account Type</label>
            <select
              id="usertype"
              name="usertype"
              value={formData.usertype}
              onChange={handleChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
