import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import {
  User,
  Mail,
  Phone,
  Droplet,
  Shield,
  Calendar,
  FileText,
  LogOut,
  Save,
  CheckCircle2,
  Building
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const { appointments } = useAppointments();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || 'Priya Sharma',
    email: user?.email || 'priya@example.com',
    phone: user?.phone || '+1 (555) 987-6543',
    bloodGroup: user?.bloodGroup || 'B+',
    emergencyContact: user?.emergencyContact || '+1 (555) 444-2211',
    address: '742 Evergreen Terrace, New York, NY',
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const upcomingCount = appointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'RESCHEDULED').length;

  return (
    <div className="profile-page-container">
      <div className="profile-page-wrapper">
        <div className="profile-hero-card">
          <div className="profile-avatar-giant">
            <span>{form.name ? form.name.charAt(0).toUpperCase() : 'U'}</span>
          </div>

          <div className="profile-hero-info">
            <span className="role-pill">{user?.role || 'patient'}</span>
            <h1>{form.name}</h1>
            <p className="profile-email-text">{form.email}</p>
            <div className="profile-stats-chips">
              <span>{upcomingCount} Active Consultations</span>
              <span>•</span>
              <span>Blood Group: {form.bloodGroup}</span>
            </div>
          </div>

          <div className="profile-hero-actions">
            <button
              className="secondary-btn logout-profile-btn"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Quick Nav Shortcut Cards */}
        <div className="profile-shortcuts-grid">
          <Link to="/appointments" className="shortcut-card">
            <Calendar size={22} className="sc-icon" />
            <div>
              <strong>My Appointments</strong>
              <small>{upcomingCount} scheduled visits</small>
            </div>
          </Link>

          <Link to="/medical-records" className="shortcut-card">
            <FileText size={22} className="sc-icon" />
            <div>
              <strong>Health Records & Vitals</strong>
              <small>Prescriptions & Lab tests</small>
            </div>
          </Link>

          <Link to="/doctors" className="shortcut-card">
            <Building size={22} className="sc-icon" />
            <div>
              <strong>Book a Doctor</strong>
              <small>Explore 50+ specialists</small>
            </div>
          </Link>
        </div>

        {/* Edit Form */}
        <div className="profile-edit-card">
          <div className="card-header">
            <h2>Personal & Emergency Information</h2>
            <p>Keep your health profile updated for accurate clinical consultations.</p>
          </div>

          {savedNotice && (
            <div className="profile-success-banner">
              <CheckCircle2 size={18} /> Profile details saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-two-col">
              <div className="form-group">
                <label>Full Legal Name</label>
                <div className="input-with-icon">
                  <User size={18} className="field-icon" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-three-col">
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Emergency Contact Phone</label>
                <div className="input-with-icon">
                  <Phone size={18} className="field-icon" />
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={form.emergencyContact}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Residential Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="primary-btn save-profile-btn">
              <Save size={16} /> Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
