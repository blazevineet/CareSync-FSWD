import { APPOINTMENT_API } from '../config';

const STORAGE_KEY = 'caresync_appointments_cache';

const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    bookingReference: 'CS-2041',
    patientName: 'Priya Sharma',
    patientEmail: 'priya@example.com',
    patientPhone: '+1 (555) 987-6543',
    patientAge: 29,
    patientGender: 'Female',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialization: 'Cardiologist',
    date: '2026-11-15',
    time: '10:00 AM',
    consultationType: 'In-Person',
    reason: 'Routine cardiovascular checkup and ECG consultation',
    status: 'CONFIRMED',
    fee: 800.0,
    createdAt: '2026-11-01 10:30',
  },
  {
    id: 2,
    bookingReference: 'CS-2042',
    patientName: 'Alex Morgan',
    patientEmail: 'alex@example.com',
    patientPhone: '+91 98765 43220',
    patientAge: 34,
    patientGender: 'Non-binary',
    doctorName: 'Dr. Priya Mehta',
    doctorSpecialization: 'Dermatologist',
    date: '2026-11-18',
    time: '02:00 PM',
    consultationType: 'Video Consultation',
    reason: 'Follow-up consultation for skin rash treatment',
    status: 'CONFIRMED',
    fee: 700.0,
    createdAt: '2026-11-03 14:15',
  },
  {
    id: 3,
    bookingReference: 'CS-1980',
    patientName: 'Priya Sharma',
    patientEmail: 'priya@example.com',
    patientPhone: '+91 98765 43221',
    patientAge: 29,
    patientGender: 'Female',
    doctorName: 'Dr. Ananya Rao',
    doctorSpecialization: 'General Physician',
    date: '2026-10-20',
    time: '11:00 AM',
    consultationType: 'In-Person',
    reason: 'Annual comprehensive wellness screening',
    status: 'COMPLETED',
    fee: 500.0,
    createdAt: '2026-10-15 09:00',
  },
];

function getCachedAppointments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
  return INITIAL_APPOINTMENTS;
}

function saveCachedAppointments(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function fetchAppointments(email = null) {
  try {
    const url = email ? `${APPOINTMENT_API}?email=${encodeURIComponent(email)}` : APPOINTMENT_API;
    const response = await fetch(url);
    if (!response.ok) throw new Error('API returned ' + response.status);
    const data = await response.json();
    if (Array.isArray(data)) {
      saveCachedAppointments(data);
      return { appointments: data, isLive: true };
    }
  } catch {
    // fallback to cache
  }

  const cached = getCachedAppointments();
  if (email) {
    const filtered = cached.filter(
      (a) => a.patientEmail && a.patientEmail.toLowerCase() === email.toLowerCase()
    );
    return { appointments: filtered, isLive: false };
  }
  return { appointments: cached, isLive: false };
}

export async function createAppointment(appointment) {
  const newRef = 'CS-' + (1000 + Math.floor(Math.random() * 9000));
  const newAppointment = {
    ...appointment,
    bookingReference: appointment.bookingReference || newRef,
    status: appointment.status || 'CONFIRMED',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
  };

  try {
    const response = await fetch(APPOINTMENT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment),
    });
    if (response.ok) {
      const saved = await response.json();
      const current = getCachedAppointments();
      saveCachedAppointments([saved, ...current.filter((a) => a.id !== saved.id)]);
      return { appointment: saved, isLive: true };
    }
  } catch {
    // offline fallback
  }

  const localSaved = { ...newAppointment, id: Date.now() };
  const current = getCachedAppointments();
  saveCachedAppointments([localSaved, ...current]);
  return { appointment: localSaved, isLive: false };
}

export async function updateAppointmentStatus(id, status) {
  try {
    const response = await fetch(`${APPOINTMENT_API}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      const updated = await response.json();
      return { appointment: updated, isLive: true };
    }
  } catch {
    // fallback
  }

  const current = getCachedAppointments();
  const updatedList = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveCachedAppointments(updatedList);
  const updatedItem = updatedList.find((a) => a.id === id);
  return { appointment: updatedItem, isLive: false };
}

export async function rescheduleAppointment(id, date, time) {
  try {
    const response = await fetch(`${APPOINTMENT_API}/${id}/reschedule`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, time }),
    });
    if (response.ok) {
      const updated = await response.json();
      return { appointment: updated, isLive: true };
    }
  } catch {
    // fallback
  }

  const current = getCachedAppointments();
  const updatedList = current.map((a) =>
    a.id === id ? { ...a, date, time, status: 'RESCHEDULED' } : a
  );
  saveCachedAppointments(updatedList);
  const updatedItem = updatedList.find((a) => a.id === id);
  return { appointment: updatedItem, isLive: false };
}

export async function deleteAppointment(id) {
  try {
    await fetch(`${APPOINTMENT_API}/${id}`, { method: 'DELETE' });
  } catch {
    // fallback
  }
  const current = getCachedAppointments();
  const filtered = current.filter((a) => a.id !== id);
  saveCachedAppointments(filtered);
  return true;
}
