import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDoctors } from '../services/doctorApi';
import DoctorCard from '../components/DoctorCard';
import {
  Search,
  Calendar,
  ShieldCheck,
  Video,
  Award,
  Users,
  Clock,
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const SPECIALTIES = [
  { name: 'Cardiology', icon: '❤️', desc: 'Heart health & rhythm specialists' },
  { name: 'Dermatology', icon: '✨', desc: 'Skin, hair & aesthetic treatments' },
  { name: 'Neurology', icon: '🧠', desc: 'Brain, nerves & headache clinic' },
  { name: 'Pediatrics', icon: '🧸', desc: 'Newborn to adolescent care' },
  { name: 'Orthopedic', icon: '🦴', desc: 'Joint replacement & sports rehab' },
  { name: 'General Medicine', icon: '🩺', desc: 'Preventive & primary care' },
  { name: 'Psychiatry', icon: '🧘', desc: 'Mental wellness & therapy' },
  { name: 'Ophthalmology', icon: '👁️', desc: 'Advanced eye care & vision' },
];

const FAQS = [
  {
    q: 'How quickly can I consult with a specialist on CareSync?',
    a: 'You can book same-day appointments with doctors marked "Available Today". Telehealth video consultations can often be scheduled within 30 minutes of booking.',
  },
  {
    q: 'Can I attend my consultation online via video call?',
    a: 'Yes! When booking an appointment, simply select "Video Consultation". You can join the secure telehealth video room directly from your CareSync Appointments dashboard on any device.',
  },
  {
    q: 'Does CareSync work with my health insurance?',
    a: 'CareSync partners with major health insurance carriers including BlueCross, Aetna, Cigna, UnitedHealthcare, and Medicare. You can enter your insurance details during checkout or pay directly.',
  },
  {
    q: 'How are my electronic medical records and prescriptions stored?',
    a: 'All records are securely encrypted and comply with HIPAA standards. After each consultation, your digital prescription and doctor notes are instantly available under "Health Records".',
  },
];

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors().then((res) => {
      setDoctors(res.doctors);
      setLoading(false);
    });
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-container">
          <div className="hero-text-side">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Modern Healthcare Powered by Microservices</span>
            </div>

            <h1 className="hero-title">
              Your Health, Coordinated. <span>Meet Trusted Specialists Today.</span>
            </h1>

            <p className="hero-subtitle">
              Book in-person clinic visits or secure HD video consultations in seconds.
              Access verified doctors, track health vitals, and view digital prescriptions in one unified platform.
            </p>

            {/* Quick Search Bar */}
            <form className="hero-search-box" onSubmit={handleHeroSearch}>
              <div className="search-input-wrap">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search doctor name, specialty (e.g. Cardiologist), or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="search-submit-btn">
                Find Doctor
              </button>
            </form>

            {/* Hero Quick Highlights */}
            <div className="hero-features-list">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Verified Specialists</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Instant Slot Confirmation</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Telehealth Video Calls</span>
              </div>
            </div>
          </div>

          {/* Hero Quick Appointment Widget */}
          <div className="hero-card-side">
            <div className="quick-booking-card">
              <div className="card-badge-row">
                <span className="live-pill">
                  <span className="pulse-dot"></span> Next Slot in 15 Min
                </span>
                <span className="price-tag">From ₹500</span>
              </div>

              <h3>Fast-Track Appointment</h3>
              <p>Skip the clinic queue. Reserve your priority consultation now.</p>

              <div className="quick-spec-selector">
                <div className="spec-opt-card" onClick={() => navigate('/book-appointment')}>
                  <div className="opt-icon">🩺</div>
                  <div className="opt-text">
                    <strong>Clinic Visit</strong>
                    <small>In-person doctor consultation</small>
                  </div>
                  <ChevronRight size={18} />
                </div>

                <div className="spec-opt-card video-card" onClick={() => navigate('/book-appointment')}>
                  <div className="opt-icon">💻</div>
                  <div className="opt-text">
                    <strong>Telehealth Call</strong>
                    <small>Join video from phone or laptop</small>
                  </div>
                  <ChevronRight size={18} />
                </div>
              </div>

              <Link to="/book-appointment" className="primary-btn full-btn hero-book-btn">
                <Calendar size={18} /> Book Appointment Now
              </Link>

              <div className="card-guarantee">
                <ShieldCheck size={16} /> 100% HIPAA Compliant & Secure Care
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Clinical Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap"><Users size={28} /></div>
            <h3>50+</h3>
            <p>Board Certified Specialists</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap"><HeartPulse size={28} /></div>
            <h3>25,000+</h3>
            <p>Patients Treated Safely</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap"><Award size={28} /></div>
            <h3>99.2%</h3>
            <p>Positive Clinical Rating</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrap"><Clock size={28} /></div>
            <h3>24 / 7</h3>
            <p>Emergency & Telehealth Support</p>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="specialties-section">
        <div className="section-header">
          <span className="section-pill">CLINICAL EXCELLENCE</span>
          <h2>Explore Medical Specialties</h2>
          <p>Find top physicians across comprehensive clinical disciplines.</p>
        </div>

        <div className="specialties-grid">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.name}
              className="specialty-card"
              onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(spec.name)}`)}
            >
              <div className="spec-icon">{spec.icon}</div>
              <h4>{spec.name}</h4>
              <p>{spec.desc}</p>
              <span className="spec-action">
                Find Doctors <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Doctors Showcase */}
      <section className="top-doctors-section">
        <div className="section-header with-action">
          <div>
            <span className="section-pill">FEATURED CLINICIANS</span>
            <h2>Meet Our Leading Specialists</h2>
            <p>Experienced doctors available for immediate consultation.</p>
          </div>
          <Link to="/doctors" className="view-all-link">
            View All Doctors <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading doctors from microservice...</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {doctors.slice(0, 4).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        )}
      </section>

      {/* How It Works Stepper */}
      <section className="how-it-works-section">
        <div className="section-header">
          <span className="section-pill">EFFORTLESS HEALTHCARE</span>
          <h2>How CareSync Works</h2>
          <p>Three simple steps to coordinate your health consultations.</p>
        </div>

        <div className="stepper-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon"><Search size={24} /></div>
            <h3>Choose Your Doctor</h3>
            <p>Search doctors by medical specialty, patient ratings, clinic location, or consultation fees.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon"><Calendar size={24} /></div>
            <h3>Select Date & Slot</h3>
            <p>Pick a convenient time slot and choose between an in-person hospital visit or HD video call.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon"><Video size={24} /></div>
            <h3>Receive Care & Records</h3>
            <p>Attend your appointment, receive digital prescriptions, and monitor your vitals in your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Telehealth Promo Banner */}
      <section className="telehealth-banner-section">
        <div className="telehealth-box">
          <div className="telehealth-content">
            <span className="banner-tag">SECURE TELEMEDICINE</span>
            <h2>Can't visit in person? Connect via HD Video Consultation.</h2>
            <p>
              Consult with board-certified physicians from the comfort of your home.
              Prescriptions, lab recommendations, and doctor notes delivered straight to your portal.
            </p>
            <div className="telehealth-actions">
              <Link to="/book-appointment" className="primary-btn">
                <Video size={18} /> Book Video Visit
              </Link>
              <Link to="/services" className="secondary-btn light">
                Learn About Telehealth
              </Link>
            </div>
          </div>
          <div className="telehealth-illustration">
            <div className="floating-video-card">
              <div className="video-avatar">🧑‍⚕️</div>
              <div className="video-details">
                <strong>Dr. Rahul Sharma</strong>
                <span className="live-badge">Online • Ready to Consult</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-pill">GOT QUESTIONS?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about CareSync healthcare appointments.</p>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, index) => {
            const isOpen = selectedFaq === index;
            return (
              <div
                key={faq.q}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => setSelectedFaq(isOpen ? null : index)}
              >
                <div className="faq-question">
                  <span className="faq-title">{faq.q}</span>
                  <HelpCircle className="faq-toggle-icon" size={20} />
                </div>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
