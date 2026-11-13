import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import {
  Activity,
  Calendar,
  FileText,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Stethoscope,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { appointments } = useAppointments();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const upcomingCount = appointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'RESCHEDULED').length;

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar-container">
      <div className="navbar">
        {/* Brand Logo */}
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrap">
            <Activity className="logo-pulse-icon" size={24} />
          </div>
          <span className="logo-text">
            Care<span>Sync</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'active' : '')}>
            Doctors
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
            Services
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/appointments" className={({ isActive }) => (isActive ? 'active' : '')}>
                Appointments
                {upcomingCount > 0 && <span className="nav-counter">{upcomingCount}</span>}
              </NavLink>
              <NavLink to="/medical-records" className={({ isActive }) => (isActive ? 'active' : '')}>
                Health Records
              </NavLink>
              {(user?.role === 'doctor' || user?.role === 'admin') && (
                <NavLink to="/admin" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                  <ShieldCheck size={16} /> Admin Portal
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Auth Buttons & Profile */}
        <div className="nav-buttons">
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <button
                className="profile-trigger-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-expanded={profileDropdownOpen}
              >
                <div className="avatar-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-name-role hide-mobile">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role-badge">{user.role}</span>
                </div>
                <ChevronDown size={16} className={`chevron-icon ${profileDropdownOpen ? 'rotate' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="profile-dropdown-menu" onMouseLeave={() => setProfileDropdownOpen(false)}>
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    to="/appointments"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Calendar size={16} /> My Appointments
                    {upcomingCount > 0 && <span className="dropdown-badge">{upcomingCount}</span>}
                  </Link>
                  <Link
                    to="/medical-records"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FileText size={16} /> Medical Records
                  </Link>
                  {(user?.role === 'doctor' || user?.role === 'admin') && (
                    <Link
                      to="/admin"
                      className="dropdown-item highlight"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Stethoscope size={16} /> Doctor & Admin Panel
                    </Link>
                  )}
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="guest-actions">
              <Link to="/login" className="login-btn">
                Log In
              </Link>
              <Link to="/book-appointment" className="signup-btn cta-nav-btn">
                Book Visit
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/doctors" onClick={() => setMobileMenuOpen(false)}>
            Find Doctors
          </Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
            Medical Services
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
            About CareSync
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            Emergency & Contact
          </Link>

          {isAuthenticated ? (
            <>
              <hr />
              <Link to="/appointments" onClick={() => setMobileMenuOpen(false)}>
                My Appointments ({upcomingCount})
              </Link>
              <Link to="/medical-records" onClick={() => setMobileMenuOpen(false)}>
                Health Records
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                User Profile
              </Link>
              {(user?.role === 'doctor' || user?.role === 'admin') && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  Admin & Doctor Panel
                </Link>
              )}
              <button className="mobile-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth-row">
              <Link to="/login" className="login-btn full-btn" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="signup-btn full-btn" onClick={() => setMobileMenuOpen(false)}>
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
