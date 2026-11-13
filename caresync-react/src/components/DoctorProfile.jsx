export default function DoctorProfile({ doctor, onClose }) {
  return (
    <div className="doctor-profile">
      <h2>{doctor.name}</h2>

      <p>
        <strong>Specialization:</strong> {doctor.specialization}
      </p>

      <p>⭐ {doctor.rating} Rating</p>

      <p>Experienced healthcare professional dedicated to providing quality patient care.</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
}
