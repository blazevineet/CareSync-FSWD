import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchDoctorById } from '../services/doctorApi';
import {
  Star,
  Clock,
  MapPin,
  Calendar,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Video,
  Building,
  HeartHandshake
} from 'lucide-react';

const REVIEWS = [
  {
    author: 'Sunita Verma',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Exceptional physician! Listened thoroughly to my symptoms and explained the diagnostic treatment plan with great clarity and empathy.',
  },
  {
    author: 'Michael Torres',
    rating: 5,
    date: '1 month ago',
    comment: 'Very professional clinic environment. Appointment started right on time and follow-up prescription instructions were clear.',
  },
  {
    author: 'Anita Desai',
    rating: 4.8,
    date: '2 months ago',
    comment: 'Highly knowledgeable doctor. Solved my ongoing health issue after only two consultations. Highly recommend!',
  },
];

export default function DoctorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorById(id).then((doc) => {
      setDoctor(doc);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading-container">
        <div className="spinner"></div>
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-not-found">
        <h2>Doctor Not Found</h2>
        <p>The requested specialist profile could not be found.</p>
        <Link to="/doctors" className="primary-btn">
          Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="doctor-detail-page">
      <div className="detail-container">
        {/* Navigation Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/doctors" className="back-link">
            <ArrowLeft size={16} /> Back to Doctor Directory
          </Link>
        </div>

        {/* Doctor Hero Header Card */}
        <div className="doctor-profile-header-card">
          <div className="profile-main-info">
            <div className="profile-avatar-large">
              <span>🩺</span>
            </div>

            <div className="profile-text-group">
              <div className="spec-badge-row">
                <span className="spec-pill">{doctor.specialization}</span>
                <span className="availability-pill">
                  <span className="pulse-dot"></span> {doctor.status || 'Available Today'}
                </span>
              </div>

              <h1 className="profile-doctor-name">{doctor.name}</h1>
              <p className="profile-credentials">MD, MBBS • Board Certified Specialist</p>

              <div className="profile-meta-chips">
                <div className="meta-chip">
                  <Star size={16} className="star-icon" />
                  <strong>{doctor.rating ? doctor.rating.toFixed(1) : '4.9'}</strong>
                  <span>(120+ Verified Patient Reviews)</span>
                </div>
                <div className="meta-chip">
                  <Award size={16} className="award-icon" />
                  <span>{doctor.experienceYears}+ Years Clinical Experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-quick-cta-box">
            <div className="fee-display">
              <span className="fee-label">Consultation Fee</span>
              <span className="fee-amount">₹{doctor.consultationFee || 500}</span>
              <small>Includes free 7-day digital follow-up</small>
            </div>

            <button
              className="primary-btn full-btn book-now-cta"
              onClick={() => navigate(`/book-appointment/${doctor.id}`)}
            >
              <Calendar size={18} /> Book Appointment
            </button>
          </div>
        </div>

        {/* Profile Content Split */}
        <div className="profile-body-grid">
          {/* Left Column: Biography, Clinic Details, Reviews */}
          <div className="profile-left-col">
            {/* Biography */}
            <div className="profile-card">
              <h3>About {doctor.name}</h3>
              <p className="bio-text">
                {doctor.bio ||
                  `${doctor.name} is a renowned ${doctor.specialization} known for delivering comprehensive, patient-centered clinical care. Dedicated to evidence-based medical treatment and empathetic consultation.`}
              </p>

              <div className="highlights-grid">
                <div className="highlight-item">
                  <CheckCircle size={18} className="highlight-icon" />
                  <div>
                    <strong>Preventive Care</strong>
                    <p>Comprehensive health assessments and proactive care plans.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="highlight-icon" />
                  <div>
                    <strong>Modern Diagnostics</strong>
                    <p>State-of-the-art medical evaluation and laboratory testing.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={18} className="highlight-icon" />
                  <div>
                    <strong>Telehealth Enabled</strong>
                    <p>Available for both in-person and secure HD video consultations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic & Availability Info */}
            <div className="profile-card">
              <h3>Clinic Location & Working Hours</h3>
              <div className="clinic-info-list">
                <div className="clinic-item">
                  <Building size={20} className="clinic-icon" />
                  <div>
                    <strong>Hospital Department & Suite</strong>
                    <p>{doctor.location || 'CareSync Medical Center, Main Pavilion, Room 302'}</p>
                  </div>
                </div>

                <div className="clinic-item">
                  <Clock size={20} className="clinic-icon" />
                  <div>
                    <strong>Available Consultation Days</strong>
                    <p>{doctor.availableDays || 'Monday - Friday (09:00 AM - 05:00 PM)'}</p>
                  </div>
                </div>

                <div className="clinic-item">
                  <Phone size={20} className="clinic-icon" />
                  <div>
                    <strong>Clinic Direct Line</strong>
                    <p>{doctor.phone || '+1 (555) 234-8901'}</p>
                  </div>
                </div>

                <div className="clinic-item">
                  <Mail size={20} className="clinic-icon" />
                  <div>
                    <strong>Doctor Office Email</strong>
                    <p>{doctor.email || 'doctor@caresync.com'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="profile-card">
              <div className="card-header-with-badge">
                <h3>Verified Patient Reviews</h3>
                <span className="review-avg-pill">⭐ 4.9 Average Rating</span>
              </div>

              <div className="reviews-list">
                {REVIEWS.map((rev) => (
                  <div key={rev.author} className="review-card">
                    <div className="review-top">
                      <strong>{rev.author}</strong>
                      <span className="review-stars">{'★'.repeat(Math.floor(rev.rating))}</span>
                      <small className="review-date">{rev.date}</small>
                    </div>
                    <p className="review-text">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Booking Box */}
          <div className="profile-right-col">
            <div className="booking-widget-card sticky-widget">
              <div className="widget-header">
                <h3>Schedule a Visit</h3>
                <p>Reserve an instant slot with {doctor.name}</p>
              </div>

              <div className="widget-choices">
                <div className="widget-choice active">
                  <Building size={16} />
                  <span>In-Person Clinic Visit</span>
                </div>
                <div className="widget-choice">
                  <Video size={16} />
                  <span>Telehealth Video Call</span>
                </div>
              </div>

              <div className="widget-summary">
                <div className="summary-row">
                  <span>Consultation Fee:</span>
                  <strong>₹{doctor.consultationFee || 500}</strong>
                </div>
                <div className="summary-row">
                  <span>Estimated Wait:</span>
                  <strong>&lt; 10 Minutes</strong>
                </div>
                <div className="summary-row">
                  <span>Cancellation:</span>
                  <strong className="text-green">Free up to 2 hours prior</strong>
                </div>
              </div>

              <button
                className="primary-btn full-btn widget-submit-btn"
                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
              >
                Proceed to Select Slot & Details
              </button>

              <div className="widget-note">
                <ShieldCheck size={14} /> Instant confirmation with booking reference pass
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
