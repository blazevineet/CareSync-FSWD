export default function AppointmentCard({ onBookNow }) {
  return (
    <div className="hero-card">
      <div className="doctor-icon">⚕</div>

      <h3>Book an Appointment</h3>

      <p>Connect with qualified healthcare professionals.</p>

      <div className="appointment-info">
        <div>
          <small>Specialty</small>
          <strong>General Physician</strong>
        </div>
        <div>
          <small>Availability</small>
          <strong>Available Today</strong>
        </div>
      </div>

      <button className="primary-btn full-btn book-btn" onClick={onBookNow}>
        Book Now
      </button>
    </div>
  );
}
