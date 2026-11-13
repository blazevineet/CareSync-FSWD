import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (form.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await signup(form.name, form.email, form.password);
    setLoading(false);

    if (res.success) {
      navigate('/appointments');
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Activity size={28} />
          </div>
          <h2>Create Your CareSync Account</h2>
          <p>Join thousands of patients managing their health and consultations easily.</p>
        </div>

        {errorMsg && (
          <div className="auth-error-box" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-fields">
          <div className="form-group">
            <label>Full Legal Name *</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                type="text"
                name="name"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password (Min. 6 characters) *</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-type password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary-btn full-btn auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account on User Service...' : 'Create Account'}{' '}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">
              Sign In
            </Link>
          </p>

          <small className="auth-microservice-note">
            <ShieldCheck size={13} /> Saved directly to User Microservice database (Port 8082, BCrypt hashed).
          </small>
        </div>
      </div>
    </div>
  );
}
