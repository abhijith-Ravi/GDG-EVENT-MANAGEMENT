import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';
import { AuthContext } from '../context/AuthContext';
import './SignUp.css';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usertype: 'STUDENT',
    // Student-only fields
    usn: '',
    name: '',
    email: '',
    phone: '',
    branch: '',
    semester: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isStudent = formData.usertype === 'STUDENT';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Build payload — only include student fields when usertype is STUDENT
      const payload = {
        username: formData.username,
        password: formData.password,
        usertype: formData.usertype,
        ...(isStudent && {
          usn: formData.usn,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          branch: formData.branch,
          semester: parseInt(formData.semester, 10),
        }),
      };

      await authService.signup(payload);

      // Auto-signin after signup
      const result = await authService.signin(formData.username, formData.password);
      // result = { token, username, role }
      login(result.username, result.role, result.token, null);
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
              <option value="ADMIN">Admin</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          {/* Student-only fields */}
          {isStudent && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="usn">USN</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  value={formData.usn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (10 digits)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  min="1"
                  max="8"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

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
