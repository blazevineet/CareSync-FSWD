import { useEffect, useRef, useState } from 'react';
import { USER_API } from '../config';

export default function LoginForm({ notice, onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(notice || '');
  const [messageType, setMessageType] = useState(notice ? 'success' : '');
  const [loading, setLoading] = useState(false);
  const closeTimer = useRef(null);

  // Clear the "close after success" timer if the modal is closed earlier
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const response = await fetch(`${USER_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.');
      }

      setMessage(`Welcome back, ${data.name}! Login successful.`);
      setMessageType('success');
      setForm({ email: '', password: '' });
      closeTimer.current = setTimeout(onSuccess, 1500);
    } catch (error) {
      setMessage(
        error.message === 'Failed to fetch'
          ? 'Unable to connect to the User Service. Check that it is running (port 8082).'
          : error.message
      );
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Please wait...' : 'Login'}
      </button>

      {message && (
        <p className={`form-message ${messageType}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
}
