import { DOCTOR_API } from '../config';

// Fallback seed doctors in case doctor-service (port 8081) is not running
export const DEFAULT_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Rahul Sharma',
    specialization: 'Cardiologist',
    rating: 4.9,
    experienceYears: 12,
    status: 'Available Today',
    consultationFee: 800,
    bio: 'Senior Consultant Cardiologist specializing in preventive cardiology, heart rhythm disorders, and interventional cardiac care with over 1,200 successful patient consultations.',
    availableDays: 'Mon, Wed, Fri',
    location: 'Cardiology Wing, Floor 3, Room 302',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@caresync.com',
  },
  {
    id: 2,
    name: 'Dr. Priya Mehta',
    specialization: 'Dermatologist',
    rating: 4.8,
    experienceYears: 9,
    status: 'Available Today',
    consultationFee: 700,
    bio: 'Clinical and aesthetic dermatologist known for expertise in acne management, chronic eczema, laser skin therapy, and holistic dermatological health.',
    availableDays: 'Tue, Thu, Sat',
    location: 'Dermatology Clinic, Floor 2, Room 210',
    phone: '+91 98765 43211',
    email: 'priya.mehta@caresync.com',
  },
  {
    id: 3,
    name: 'Dr. Arjun Patel',
    specialization: 'Neurologist',
    rating: 4.9,
    experienceYears: 15,
    status: 'Available Today',
    consultationFee: 1200,
    bio: 'Distinguished neuro specialist focusing on migraine treatment, epilepsy management, stroke rehabilitation, and peripheral nerve disorders. Fellow of AAN.',
    availableDays: 'Mon, Tue, Thu',
    location: 'Neuroscience Center, Floor 4, Suite 405',
    phone: '+91 98765 43212',
    email: 'arjun.patel@caresync.com',
  },
  {
    id: 4,
    name: 'Dr. Sarah Jenkins',
    specialization: 'Pediatrician',
    rating: 4.9,
    experienceYears: 11,
    status: 'Available Today',
    consultationFee: 600,
    bio: 'Compassionate child specialist providing complete pediatric wellness checks, developmental screenings, childhood vaccination schedules, and adolescent health management.',
    availableDays: 'Mon - Fri',
    location: 'Pediatric Wing, Floor 1, Suite 104',
    phone: '+91 98765 43213',
    email: 'sarah.jenkins@caresync.com',
  },
  {
    id: 5,
    name: 'Dr. Marcus Chen',
    specialization: 'Orthopedic Surgeon',
    rating: 4.7,
    experienceYears: 14,
    status: 'Available Today',
    consultationFee: 1000,
    bio: 'Orthopedic expert specializing in joint replacements, sports injuries, arthroscopic surgeries, and spine care with personalized physical rehabilitation plans.',
    availableDays: 'Mon, Wed, Sat',
    location: 'Orthopedic Pavilion, Floor 2, Suite 220',
    phone: '+91 98765 43214',
    email: 'marcus.chen@caresync.com',
  },
  {
    id: 6,
    name: 'Dr. Ananya Rao',
    specialization: 'General Physician',
    rating: 4.8,
    experienceYears: 8,
    status: 'Available Today',
    consultationFee: 500,
    bio: 'Primary care physician dedicated to comprehensive preventive medicine, chronic disease management (diabetes & hypertension), and full family healthcare.',
    availableDays: 'Mon - Sat',
    location: 'Outpatient Department, Floor 1, Room 101',
    phone: '+91 98765 43215',
    email: 'ananya.rao@caresync.com',
  },
  {
    id: 7,
    name: 'Dr. David Kim',
    specialization: 'Psychiatrist',
    rating: 4.9,
    experienceYears: 13,
    status: 'Available Today',
    consultationFee: 900,
    bio: 'Board-certified mental health specialist offering empathetic psychiatric assessment, stress management, anxiety and mood disorder therapy, and cognitive counseling.',
    availableDays: 'Tue, Wed, Fri',
    location: 'Behavioral Health Wing, Floor 3, Suite 315',
    phone: '+91 98765 43216',
    email: 'david.kim@caresync.com',
  },
  {
    id: 8,
    name: 'Dr. Elena Rostova',
    specialization: 'Ophthalmologist',
    rating: 4.8,
    experienceYears: 10,
    status: 'Available Tomorrow',
    consultationFee: 750,
    bio: 'Eye care specialist proficient in comprehensive vision evaluations, diabetic retinopathy screening, cataract consultation, and corrective refractive procedures.',
    availableDays: 'Wed, Thu, Fri',
    location: 'Eye Care Clinic, Floor 2, Room 205',
    phone: '+91 98765 43217',
    email: 'elena.rostova@caresync.com',
  },
];

export async function fetchDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (!response.ok) throw new Error('API returned ' + response.status);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return { doctors: data, isLive: true };
    }
    return { doctors: DEFAULT_DOCTORS, isLive: false };
  } catch {
    // Graceful fallback to default doctors
    return { doctors: DEFAULT_DOCTORS, isLive: false };
  }
}

export async function fetchDoctorById(id) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch {
    // ignore
  }
  return DEFAULT_DOCTORS.find((d) => String(d.id) === String(id)) || null;
}

export async function addDoctor(doctor) {
  try {
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // fallback
  }
  return { ...doctor, id: Date.now() };
}

export async function updateDoctor(id, doctor) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // fallback
  }
  return { ...doctor, id };
}

export async function removeDoctor(id) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch {
    return true;
  }
}
