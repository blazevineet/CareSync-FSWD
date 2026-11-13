import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldAlert,
  CheckCircle2,
  Building
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    addToast('Your inquiry has been received! Our patient care team will respond within 2 hours.', 'success');
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="section-pill">SUPPORT & LOCATIONS</span>
          <h1>We Are Here For You 24/7</h1>
          <p>
            Whether you need urgent emergency guidance, appointment support, or general hospital information,
            our patient care coordination team is ready to assist.
          </p>
        </div>
      </section>

      {/* Emergency Notice Bar */}
      <section className="emergency-notice-section">
        <div className="emergency-card-large">
          <div className="emergency-icon-wrap">
            <ShieldAlert size={32} />
          </div>
          <div className="emergency-text">
            <h3>Experiencing a Medical Emergency?</h3>
            <p>
              Please call our 24/7 Emergency Hotline immediately at <strong>+1 (800) 227-3796</strong> or
              visit the Emergency Department at CareSync Central Medical Center.
            </p>
          </div>
          <a href="tel:18002273796" className="emergency-call-btn">
            <Phone size={18} /> Call Ambulance
          </a>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <div className="contact-main-grid">
        {/* Contact Form */}
        <div className="contact-form-card">
          <h2>Send Us an Inquiry</h2>
          <p>Have questions about insurance, specialists, or medical records? Send us a message.</p>

          {submitted ? (
            <div className="contact-success-state">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Thank You, {form.name}!</h3>
              <p>
                We have received your message regarding <strong>"{form.subject}"</strong>.
                A patient support representative will get back to you at <strong>{form.email}</strong> shortly.
              </p>
              <button
                className="secondary-btn"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form-fields">
              <div className="form-two-col">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Department / Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="General Question">General Question</option>
                    <option value="Appointment Booking Support">Appointment Booking Support</option>
                    <option value="Billing & Health Insurance">Billing & Health Insurance</option>
                    <option value="Medical Records Request">Medical Records Request</option>
                    <option value="Doctor Partnership">Doctor Partnership</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  rows="5"
                  placeholder="How can we assist you today?..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="primary-btn submit-btn">
                <Send size={16} /> Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info-sidebar">
          <div className="info-card">
            <h3>Hospital Contact Information</h3>

            <div className="info-row">
              <Phone className="row-icon" size={20} />
              <div>
                <strong>Main Hospital Line</strong>
                <p>+1 (555) 234-8900</p>
                <small>Mon - Sat (08:00 AM - 08:00 PM)</small>
              </div>
            </div>

            <div className="info-row">
              <Mail className="row-icon" size={20} />
              <div>
                <strong>General Support Email</strong>
                <p>support@caresync.com</p>
                <small>Typical response within 2 hours</small>
              </div>
            </div>

            <div className="info-row">
              <MapPin className="row-icon" size={20} />
              <div>
                <strong>Main Medical Campus</strong>
                <p>742 Evergreen Healthcare Blvd, New York, NY</p>
                <small>Visitor parking available in Garage B</small>
              </div>
            </div>

            <div className="info-row">
              <Clock className="row-icon" size={20} />
              <div>
                <strong>Operating Hours</strong>
                <p>Outpatient Clinics: 08:00 AM - 07:00 PM</p>
                <p>Emergency Department: 24/7 Continuous</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
