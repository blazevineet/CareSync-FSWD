import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Calendar, Award } from 'lucide-react';

const SPECIALTY_ICONS = {
  Cardiologist: '❤️',
  Dermatologist: '✨',
  Neurologist: '🧠',
  Pediatrician: '🧸',
  'Orthopedic Surgeon': '🦴',
  'General Physician': '🩺',
  Psychiatrist: '🧘',
  Ophthalmologist: '👁️',
};

export default function DoctorCard({ doctor, onQuickBook }) {
  const icon = SPECIALTY_ICONS[doctor.specialization] || '🧑‍⚕️';
  const isAvailable = doctor.status?.toLowerCase().includes('today') || doctor.status?.toLowerCase().includes('available');

  return (
    <div className="doctor-card-modern">
      <div className="card-top-header">
        <span className={`status-badge ${isAvailable ? 'available' : 'busy'}`}>
          <span className="pulse-dot"></span>
          {doctor.status || 'Available'}
        </span>
        <span className="fee-badge">
          ₹{doctor.consultationFee || 500} <span>/ visit</span>
        </span>
      </div>

      <div className="doctor-avatar-section">
        <div className="avatar-ring">
          <div className="doctor-emoji-badge">{icon}</div>
        </div>
      </div>

      <div className="doctor-info-content">
        <h3 className="doctor-title">{doctor.name}</h3>
        <p className="doctor-spec-tag">{doctor.specialization}</p>

        <div className="doctor-metrics-row">
          <div className="metric-pill">
            <Star size={14} className="star-icon" />
            <strong>{doctor.rating ? doctor.rating.toFixed(1) : '4.9'}</strong>
            <span className="rating-count">(120+)</span>
          </div>
          <div className="metric-pill">
            <Award size={14} className="award-icon" />
            <span>{doctor.experienceYears}+ Yrs Exp</span>
          </div>
        </div>

        {doctor.location && (
          <p className="doctor-sub-info">
            <MapPin size={13} /> {doctor.location}
          </p>
        )}

        {doctor.availableDays && (
          <p className="doctor-sub-info">
            <Clock size={13} /> {doctor.availableDays}
          </p>
        )}
      </div>

      <div className="card-actions-group">
        <Link to={`/doctors/${doctor.id}`} className="view-profile-btn">
          View Profile
        </Link>
        <Link
          to={`/book-appointment/${doctor.id}`}
          className="book-slot-btn"
          onClick={() => onQuickBook && onQuickBook(doctor)}
        >
          <Calendar size={14} /> Book Visit
        </Link>
      </div>
    </div>
  );
}
