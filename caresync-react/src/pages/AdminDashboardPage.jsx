import { useState, useEffect } from 'react';
import { fetchDoctors, addDoctor, updateDoctor, removeDoctor } from '../services/doctorApi';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  Video,
  Building,
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { appointments, updateStatus, isBackendConnected } = useAppointments();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('appointments'); // 'appointments' | 'doctors'

  // Add doctor modal state
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: 'Cardiologist',
    rating: 4.8,
    experienceYears: 10,
    status: 'Available Today',
    consultationFee: 700,
    bio: '',
    availableDays: 'Mon, Wed, Fri',
    location: 'Main Pavilion, Suite 202',
    phone: '+91 98765 43210',
    email: '',
  });

  // Filter for admin appointments
  const [adminStatusFilter, setAdminStatusFilter] = useState('ALL');
  const [adminSearch, setAdminSearch] = useState('');

  const loadDoctorList = async () => {
    setLoadingDoctors(true);
    const res = await fetchDoctors();
    setDoctors(res.doctors);
    setLoadingDoctors(false);
  };

  useEffect(() => {
    loadDoctorList();
  }, []);

  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    if (!doctorForm.name) return;

    try {
      await addDoctor({
        ...doctorForm,
        rating: parseFloat(doctorForm.rating) || 4.8,
        experienceYears: parseInt(doctorForm.experienceYears, 10) || 5,
        consultationFee: parseFloat(doctorForm.consultationFee) || 500,
      });
      addToast(`Doctor ${doctorForm.name} added successfully!`, 'success');
      setIsAddDoctorOpen(false);
      setDoctorForm({
        name: '',
        specialization: 'Cardiologist',
        rating: 4.8,
        experienceYears: 10,
        status: 'Available Today',
        consultationFee: 700,
        bio: '',
        availableDays: 'Mon, Wed, Fri',
        location: 'Main Pavilion, Suite 202',
        phone: '+91 98765 43210',
        email: '',
      });
      loadDoctorList();
    } catch {
      addToast('Failed to add doctor', 'error');
    }
  };

  const handleDeleteDoctor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    await removeDoctor(id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    addToast(`${name} removed from clinic system.`, 'info');
  };

  // KPI Calculations
  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'RESCHEDULED').length;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length;
  const totalRevenue = appointments
    .filter((a) => a.status !== 'CANCELLED')
    .reduce((sum, a) => sum + (a.fee || 500), 0);

  // Filtered appointments for table
  const displayedAppointments = appointments.filter((app) => {
    const matchesFilter =
      adminStatusFilter === 'ALL' ||
      (app.status && app.status.toUpperCase() === adminStatusFilter);

    const q = adminSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      app.patientName?.toLowerCase().includes(q) ||
      app.doctorName?.toLowerCase().includes(q) ||
      app.bookingReference?.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-portal-page">
      <div className="admin-container">
        {/* Admin Header */}
        <div className="admin-header-card">
          <div className="admin-title-area">
            <span className="section-pill">CLINIC CONTROL CENTER</span>
            <h1>Hospital Administration & Doctor Portal</h1>
            <p>
              Signed in as <strong>{user?.name || 'Administrator'}</strong> ({user?.role || 'doctor'}).
              Manage clinic doctors, monitor patient appointments, and control microservice data.
            </p>
          </div>

          <div className="admin-actions-area">
            <button
              className="primary-btn add-doc-trigger-btn"
              onClick={() => setIsAddDoctorOpen(true)}
            >
              <Plus size={18} /> Add New Specialist
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="kpi-cards-grid">
          <div className="kpi-card">
            <div className="kpi-icon-wrap cal"><Calendar size={24} /></div>
            <div className="kpi-body">
              <span className="kpi-title">Total Appointments</span>
              <h2 className="kpi-num">{totalAppointments}</h2>
              <small>{confirmedCount} Upcoming • {completedCount} Completed</small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap doc"><Users size={24} /></div>
            <div className="kpi-body">
              <span className="kpi-title">Active Doctors</span>
              <h2 className="kpi-num">{doctors.length}</h2>
              <small>Across 8 Clinical Specialties</small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap rev"><DollarSign size={24} /></div>
            <div className="kpi-body">
              <span className="kpi-title">Consultation Revenue</span>
              <h2 className="kpi-num">₹{totalRevenue.toLocaleString('en-IN')}</h2>
              <small>From Confirmed & Completed Visits</small>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap sys"><ShieldCheck size={24} /></div>
            <div className="kpi-body">
              <span className="kpi-title">Microservices Health</span>
              <h2 className="kpi-num status-green">3/3 Live</h2>
              <small>Doctor: 8081 | User: 8082 | Appt: 8083</small>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="admin-tab-selector">
          <button
            className={`admin-tab-btn ${activeAdminTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('appointments')}
          >
            <Calendar size={18} /> Manage All Appointments ({appointments.length})
          </button>
          <button
            className={`admin-tab-btn ${activeAdminTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('doctors')}
          >
            <Users size={18} /> Manage Doctors Directory ({doctors.length})
          </button>
        </div>

        {/* TAB 1: ALL APPOINTMENTS */}
        {activeAdminTab === 'appointments' && (
          <div className="admin-content-section">
            <div className="admin-table-filters">
              <div className="filter-chip-group">
                {['ALL', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    className={`filter-btn ${adminStatusFilter === st ? 'active' : ''}`}
                    onClick={() => setAdminStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="admin-search-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search patient, doctor, or reference..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-table-card">
              <div className="admin-table-head">
                <span>Ref Code</span>
                <span>Patient</span>
                <span>Doctor & Specialty</span>
                <span>Date & Time</span>
                <span>Mode</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {displayedAppointments.length === 0 ? (
                <div className="no-admin-data">No appointments match the criteria.</div>
              ) : (
                displayedAppointments.map((app) => (
                  <div key={app.id} className="admin-table-row">
                    <div>
                      <strong>{app.bookingReference}</strong>
                    </div>

                    <div>
                      <strong>{app.patientName}</strong>
                      <small>{app.patientEmail}</small>
                    </div>

                    <div>
                      <strong>{app.doctorName}</strong>
                      <small>{app.doctorSpecialization}</small>
                    </div>

                    <div>
                      <span>{app.date}</span>
                      <small>{app.time}</small>
                    </div>

                    <div>
                      <span className="mode-pill">
                        {app.consultationType === 'Video Consultation' ? <Video size={12} /> : <Building size={12} />}
                        {app.consultationType}
                      </span>
                    </div>

                    <div>
                      <span className={`status-pill status-${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="table-actions-cell">
                      {app.status !== 'COMPLETED' && (
                        <button
                          className="status-action-btn complete-btn"
                          title="Mark Completed"
                          onClick={() => updateStatus(app.id, 'COMPLETED')}
                        >
                          <CheckCircle size={15} /> Complete
                        </button>
                      )}

                      {app.status !== 'CANCELLED' && (
                        <button
                          className="status-action-btn cancel-btn"
                          title="Cancel"
                          onClick={() => updateStatus(app.id, 'CANCELLED')}
                        >
                          <XCircle size={15} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE DOCTORS */}
        {activeAdminTab === 'doctors' && (
          <div className="admin-content-section">
            <div className="admin-table-card">
              <div className="admin-table-head doctors-head">
                <span>Doctor Name</span>
                <span>Specialization</span>
                <span>Rating</span>
                <span>Experience</span>
                <span>Fee</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {doctors.map((doc) => (
                <div key={doc.id} className="admin-table-row doctors-row">
                  <div>
                    <strong>{doc.name}</strong>
                    <small>{doc.location || 'CareSync Main Clinic'}</small>
                  </div>

                  <div>
                    <span className="spec-tag-chip">{doc.specialization}</span>
                  </div>

                  <div>⭐ {doc.rating || 4.9}</div>

                  <div>{doc.experienceYears}+ Years</div>

                  <div>₹{doc.consultationFee || 500}</div>

                  <div>
                    <span className="status-pill status-confirmed">{doc.status || 'Available'}</span>
                  </div>

                  <div className="table-actions-cell">
                    <button
                      className="status-action-btn delete-btn"
                      onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                      title="Delete Doctor"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADD DOCTOR MODAL */}
      {isAddDoctorOpen && (
        <div className="modal-overlay" onClick={() => setIsAddDoctorOpen(false)}>
          <div className="custom-modal-card large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Specialist to Doctor Microservice (Port 8081)</h3>
              <button className="close-modal-x" onClick={() => setIsAddDoctorOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleAddDoctorSubmit} className="modal-body">
              <div className="form-two-col">
                <div className="form-group">
                  <label>Doctor Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Maya Patel"
                    value={doctorForm.name}
                    onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Specialization *</label>
                  <select
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                  >
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                  </select>
                </div>
              </div>

              <div className="form-three-col">
                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={doctorForm.experienceYears}
                    onChange={(e) => setDoctorForm({ ...doctorForm, experienceYears: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Initial Rating (1 - 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={doctorForm.rating}
                    onChange={(e) => setDoctorForm({ ...doctorForm, rating: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Consultation Fee (₹)</label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={doctorForm.consultationFee}
                    onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-two-col">
                <div className="form-group">
                  <label>Working Days</label>
                  <input
                    type="text"
                    placeholder="e.g. Mon, Wed, Fri"
                    value={doctorForm.availableDays}
                    onChange={(e) => setDoctorForm({ ...doctorForm, availableDays: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Clinic Suite / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. West Wing Room 204"
                    value={doctorForm.location}
                    onChange={(e) => setDoctorForm({ ...doctorForm, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Doctor Biography & Clinical Focus</label>
                <textarea
                  rows="3"
                  placeholder="Professional background, qualifications, and patient care philosophy..."
                  value={doctorForm.bio}
                  onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsAddDoctorOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Doctor to Microservice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
