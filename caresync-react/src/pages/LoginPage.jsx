import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Stethoscope
} from 'lucide-react';

export default function LoginPage() {
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMsg(res.error || 'Invalid credentials.');
    }
  };

  const handleDemoLogin = (role) => {
    loginDemo(role);
    if (role === 'doctor') {
      navigate('/admin', { replace: true });
    } else {
      navigate(redirectPath, { replace: true });
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
          <h2>Welcome Back to CareSync</h2>
          <p>Sign in to access your consultations, prescriptions, and health records.</p>
        </div>

        {/* Demo Fast-Login Strip */}
        <div className="demo-login-strip">
          <span className="demo-label">Instant 1-Click Demo Access:</span>
          <div className="demo-btn-row">
            <button
              type="button"
              className="demo-chip-btn patient"
              onClick={() => handleDemoLogin('patient')}
            >
              <UserCheck size={14} /> Demo Patient
            </button>
            <button
              type="button"
              className="demo-chip-btn doctor"
              onClick={() => handleDemoLogin('doctor')}
            >
              <Stethoscope size={14} /> Demo Doctor / Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="auth-error-box" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-fields">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary-btn full-btn auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating with User Service...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Don't have an account yet?{' '}
            <Link to="/signup" className="auth-switch-link">
              Create an account
            </Link>
          </p>

          <small className="auth-microservice-note">
            <ShieldCheck size={13} /> Authenticated securely against CareSync User Microservice (Port 8082, BCrypt encrypted).
          </small>
        </div>
      </div>
    </div>
  );
}
