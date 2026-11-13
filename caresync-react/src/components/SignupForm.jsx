import { useState } from 'react';
import { USER_API } from '../config';

export default function SignupForm({ onRegistered }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(USER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Registration worked - send the user to the login form
      onRegistered(data);
    } catch (error) {
      setMessage(
        error.message === 'Failed to fetch'
          ? 'Unable to connect to the User Service. Check that it is running (port 8082).'
          : error.message
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        autoComplete="name"
        required
      />
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
        placeholder="Password (min 6 characters)"
        value={form.password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Please wait...' : 'Sign Up'}
      </button>

      {message && (
        <p className="form-message error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
