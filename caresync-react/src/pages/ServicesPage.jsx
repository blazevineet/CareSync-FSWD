import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  Shield,
  Video,
  Truck,
  CheckCircle2,
  Calendar,
  Building,
  Microscope,
  Stethoscope,
  Smile,
  Eye,
  Brain
} from 'lucide-react';

const DEPARTMENTS = [
  {
    title: 'Cardiovascular Care',
    icon: <Heart size={28} className="dept-icon heart" />,
    desc: 'Advanced cardiac screenings, ECG, echocardiography, hypertension therapy, and catheterization management.',
    specialists: '6 Specialists',
  },
  {
    title: 'Clinical Dermatology',
    icon: <Smile size={28} className="dept-icon skin" />,
    desc: 'Acne therapy, skin cancer screening, chronic dermatitis, laser skin treatments, and cosmetic dermatology.',
    specialists: '4 Specialists',
  },
  {
    title: 'Neuroscience Center',
    icon: <Brain size={28} className="dept-icon brain" />,
    desc: 'Headache & migraine clinic, epilepsy care, stroke prevention, and neuromuscular disorder evaluation.',
    specialists: '5 Specialists',
  },
  {
    title: 'Pediatric Care',
    icon: <Stethoscope size={28} className="dept-icon ped" />,
    desc: 'Newborn checks, childhood vaccination, growth milestones, and pediatric emergency services.',
    specialists: '7 Specialists',
  },
  {
    title: 'Diagnostic Imaging & Lab',
    icon: <Microscope size={28} className="dept-icon lab" />,
    desc: 'High-speed 128-slice CT, 3T MRI, full pathology blood panel, and rapid culture diagnostics.',
    specialists: '24/7 Facility',
  },
  {
    title: 'Emergency & Trauma (24/7)',
    icon: <Truck size={28} className="dept-icon emerg" />,
    desc: 'Immediate trauma resuscitation, ICU critical care, cardiac stroke emergency, and mobile ambulance dispatch.',
    specialists: 'Always Open',
  },
];

const INSURANCES = [
  'Blue Cross Blue Shield',
  'Aetna Healthcare',
  'Cigna Global',
  'UnitedHealthcare',
  'Medicare & Medicaid',
  'Humana Health',
  'Kaiser Permanente',
  'MetLife Health',
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      {/* Banner */}
      <section className="services-hero">
        <div className="services-hero-content">
          <span className="section-pill">COMPREHENSIVE CARE</span>
          <h1>Clinical Specialties & Hospital Services</h1>
          <p>
            World-class medical departments equipped with state-of-the-art diagnostic technology
            and compassionate clinical physicians.
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="departments-section">
        <div className="dept-grid">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.title} className="department-card">
              <div className="dept-icon-wrapper">{dept.icon}</div>
              <h3>{dept.title}</h3>
              <p>{dept.desc}</p>
              <div className="dept-footer">
                <span className="spec-count">{dept.specialists}</span>
                <Link to="/doctors" className="dept-action-link">
                  View Doctors →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="insurance-section">
        <div className="insurance-box">
          <div className="insurance-header">
            <Shield size={32} className="shield-icon" />
            <h2>Accepted Insurance Providers</h2>
            <p>We work directly with major health insurance carriers for seamless cashless claims.</p>
          </div>

          <div className="insurance-badges-grid">
            {INSURANCES.map((ins) => (
              <div key={ins} className="insurance-chip">
                <CheckCircle2 size={16} className="chip-check" />
                <span>{ins}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Strip */}
      <section className="services-cta-strip">
        <div className="cta-container">
          <h2>Ready to schedule your appointment?</h2>
          <p>Choose an available doctor and pick an in-person or video consultation slot.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="primary-btn">
              <Calendar size={18} /> Book Your Visit Now
            </Link>
            <Link to="/doctors" className="secondary-btn light">
              Browse Doctors Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
