import { useEffect, useMemo, useState } from 'react';
import { DOCTOR_API } from '../config';
import DoctorSearch from './DoctorSearch';
import DoctorCard from './DoctorCard';

export default function Doctors({ onViewProfile }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');

  // Load the doctors from the Doctor Service when the component appears
  useEffect(() => {
    const controller = new AbortController();

    fetch(DOCTOR_API, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load doctors');
        }
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Unable to load doctors. Please check that the Doctor Service is running (port 8081).');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const specialties = useMemo(
    () => [...new Set(doctors.map((d) => d.specialization))],
    [doctors]
  );

  const visibleDoctors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q);
      const matchesSpecialty = specialty === 'all' || d.specialization === specialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, query, specialty]);

  return (
    <div className="doctors" id="doctors">
      <DoctorSearch
        query={query}
        onQueryChange={setQuery}
        specialty={specialty}
        onSpecialtyChange={setSpecialty}
        specialties={specialties}
      />

      <p className="small-heading">OUR DOCTORS</p>

      <h2>Meet Our Specialists</h2>

      {loading && <p className="no-doctors">Loading doctors...</p>}
      {error && (
        <p className="no-doctors doctors-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="doctor-container">
            {visibleDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} onViewProfile={onViewProfile} />
            ))}
          </div>

          {visibleDoctors.length === 0 && <p className="no-doctors">No doctors found.</p>}
        </>
      )}
    </div>
  );
}
