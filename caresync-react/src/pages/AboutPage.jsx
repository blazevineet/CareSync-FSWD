import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  CheckCircle,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-pill">OUR MISSION</span>
          <h1>Human-Centered Healthcare, Powered by Modern Technology</h1>
          <p>
            CareSync was built to bridge the gap between patients and specialized clinicians.
            By connecting microservices-based clinical scheduling, electronic health records, and telehealth,
            we deliver seamless healthcare for everyone.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="section-header">
          <span className="section-pill">WHAT DRIVES US</span>
          <h2>Our Core Principles</h2>
          <p>The values that guide every consultation and clinical decision.</p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon"><HeartHandshake size={28} /></div>
            <h3>Patient Empathy</h3>
            <p>Every diagnosis starts with listening. We treat every individual with compassion, dignity, and respect.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><Award size={28} /></div>
            <h3>Clinical Excellence</h3>
            <p>Our specialists are board certified and follow rigorous evidence-based medical treatment protocols.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><ShieldCheck size={28} /></div>
            <h3>Data Security & Privacy</h3>
            <p>Full HIPAA compliance and encryption for all patient consultation notes, records, and prescriptions.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><Sparkles size={28} /></div>
            <h3>Accessible Innovation</h3>
            <p>Fast telehealth video visits and unified scheduling remove friction from receiving quality care.</p>
          </div>
        </div>
      </section>

      {/* Accreditations Banner */}
      <section className="accreditations-section">
        <div className="accreditations-card">
          <h2>Certified & Internationally Accredited</h2>
          <p>Meeting the highest standards of hospital clinical safety and patient rights.</p>

          <div className="acc-list">
            <div className="acc-item">
              <CheckCircle size={20} className="acc-check" />
              <div>
                <strong>Joint Commission International (JCI)</strong>
                <p>Gold Seal of Approval for Patient Safety and Quality of Care.</p>
              </div>
            </div>

            <div className="acc-item">
              <CheckCircle size={20} className="acc-check" />
              <div>
                <strong>National Accreditation Board for Hospitals (NABH)</strong>
                <p>Fully accredited multispecialty hospital campus and laboratories.</p>
              </div>
            </div>

            <div className="acc-item">
              <CheckCircle size={20} className="acc-check" />
              <div>
                <strong>HIPAA & HITECH Compliant</strong>
                <p>Industry-grade digital records protection and patient confidentiality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Network */}
      <section className="network-section">
        <div className="section-header">
          <span className="section-pill">CAMPUS NETWORK</span>
          <h2>State-of-the-Art Facilities</h2>
          <p>CareSync operates 3 multispecialty campuses and 12 outpatient clinics.</p>
        </div>

        <div className="campus-grid">
          <div className="campus-card">
            <div className="campus-icon"><Building2 size={24} /></div>
            <h3>CareSync Central Medical Center</h3>
            <p>742 Evergreen Healthcare Blvd, New York, NY</p>
            <small>500 Beds • 24/7 Level 1 Trauma Center • Cardiology Pavilion</small>
          </div>

          <div className="campus-card">
            <div className="campus-icon"><Building2 size={24} /></div>
            <h3>CareSync Westside Outpatient Pavilion</h3>
            <p>128 West Park Ave, Suite 400, New York, NY</p>
            <small>Specialist Consultations • Same-Day Surgery • Dermatology Wing</small>
          </div>

          <div className="campus-card">
            <div className="campus-icon"><Building2 size={24} /></div>
            <h3>CareSync Children's Health Center</h3>
            <p>910 Pediatric Way, New York, NY</p>
            <small>Pediatric Emergency • Neonatal Intensive Care • Child Wellness</small>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="about-cta-box">
          <h2>Experience the CareSync Difference</h2>
          <p>Consult with our top physicians today in-person or via telehealth.</p>
          <Link to="/book-appointment" className="primary-btn">
            <Calendar size={18} /> Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
