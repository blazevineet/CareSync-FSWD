import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, Heart, Shield, Award, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Activity className="footer-pulse" size={24} />
            <span>Care<span>Sync</span> Healthcare</span>
          </div>
          <p className="footer-desc">
            Empowering patients and clinicians with next-generation healthcare technology.
            Instant specialist consultations, secure electronic medical records, and integrated clinic care.
          </p>

          <div className="microservices-pill-cluster">
            <div className="microservice-indicator">
              <span className="service-dot live"></span>
              <span>Doctor Svc (8081)</span>
            </div>
            <div className="microservice-indicator">
              <span className="service-dot live"></span>
              <span>User Svc (8082)</span>
            </div>
            <div className="microservice-indicator">
              <span className="service-dot live"></span>
              <span>Appointment Svc (8083)</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Platform</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/doctors">Find Specialists</Link></li>
            <li><Link to="/book-appointment">Book Appointment</Link></li>
            <li><Link to="/appointments">My Appointments</Link></li>
            <li><Link to="/medical-records">Health Records & Vitals</Link></li>
            <li><Link to="/admin">Doctor & Staff Portal</Link></li>
          </ul>
        </div>

        {/* Medical Specialties */}
        <div className="footer-col">
          <h4>Specialties</h4>
          <ul className="footer-links-list">
            <li><Link to="/doctors">Cardiology & Heart</Link></li>
            <li><Link to="/doctors">Dermatology & Skin</Link></li>
            <li><Link to="/doctors">Neurology & Brain</Link></li>
            <li><Link to="/doctors">Pediatrics & Child</Link></li>
            <li><Link to="/doctors">Orthopedics & Spine</Link></li>
            <li><Link to="/doctors">Behavioral Health</Link></li>
          </ul>
        </div>

        {/* Emergency & Accreditations */}
        <div className="footer-col">
          <h4>Emergency & Support</h4>
          <div className="footer-contact-item">
            <Phone size={16} className="contact-icon highlight" />
            <div>
              <strong>Emergency 24/7</strong>
              <p>+1 (800) 227-3796</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <Mail size={16} className="contact-icon" />
            <div>
              <strong>Email Inquiries</strong>
              <p>support@caresync.com</p>
            </div>
          </div>

          <div className="footer-contact-item">
            <MapPin size={16} className="contact-icon" />
            <div>
              <strong>Medical Campus</strong>
              <p>742 Evergreen Healthcare Blvd, NY</p>
            </div>
          </div>

          <div className="accreditation-badges">
            <span className="acc-tag"><Shield size={12} /> HIPAA Secure</span>
            <span className="acc-tag"><Award size={12} /> JCI Accredited</span>
            <span className="acc-tag"><CheckCircle size={12} /> NABH Certified</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} CareSync Microservices Healthcare System. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link to="/about">Privacy Policy</Link>
          <Link to="/about">Terms of Service</Link>
          <Link to="/about">Patient Rights</Link>
          <Link to="/contact">Help & FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
