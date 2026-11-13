import { useState } from 'react';
import { timeSlots } from '../data/doctors';

// Today's date as YYYY-MM-DD (local time) – used to block past dates
function getToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export default function AppointmentForm({ doctorName, onSave, onSuccess }) {
  const [form, setForm] = useState({ date: '', time: '', reason: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      doctor: doctorName,
      date: form.date,
      time: form.time,
      reason: form.reason,
    };

    onSave(appointment);

    alert(
      `Appointment confirmed!\n\n` +
        `Doctor: ${doctorName}\n` +
        `Date: ${form.date}\n` +
        `Time: ${form.time}`
    );

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Appointment Date</label>
      <input type="date" name="date" min={getToday()} value={form.date} onChange={handleChange} required />

      <label>Preferred Time</label>
      <select name="time" value={form.time} onChange={handleChange} required>
        <option value="">Select Time</option>
        {timeSlots.map((slot) => (
          <option key={slot}>{slot}</option>
        ))}
      </select>

      <textarea
        name="reason"
        placeholder="Reason for appointment"
        rows="4"
        value={form.reason}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Confirm Appointment</button>
    </form>
  );
}
