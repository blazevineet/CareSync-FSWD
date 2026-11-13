import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import {
  Calendar,
  Clock,
  Video,
  Building,
  FileText,
  RotateCcw,
  XCircle,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const RESCHEDULE_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export default function AppointmentsPage() {
  const { appointments, loading, isBackendConnected, cancelAppointment, reschedule } = useAppointments();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed' | 'cancelled'
  const [searchFilter, setSearchFilter] = useState('');

  // Reschedule Modal State
  const [rescheduleModal, setRescheduleModal] = useState(null); // appointment or null
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState(RESCHEDULE_SLOTS[0]);

  // Cancel Modal State
  const [cancelModal, setCancelModal] = useState(null);
  const [cancelReason, setCancelReason] = useState('Personal schedule conflict');

  // Digital Prescription Modal State
  const [prescriptionModal, setPrescriptionModal] = useState(null);

  // Filter appointments
  const filteredAppointments = appointments.filter((app) => {
    // Tab filter
    const status = app.status ? app.status.toUpperCase() : 'CONFIRMED';
    let matchesTab = false;
    if (activeTab === 'upcoming') {
      matchesTab = status === 'CONFIRMED' || status === 'RESCHEDULED';
    } else if (activeTab === 'completed') {
      matchesTab = status === 'COMPLETED';
    } else if (activeTab === 'cancelled') {
      matchesTab = status === 'CANCELLED';
    }

    // Search filter
    const q = searchFilter.trim().toLowerCase();
    const matchesSearch =
      !q ||
      app.doctorName?.toLowerCase().includes(q) ||
      app.doctorSpecialization?.toLowerCase().includes(q) ||
      app.bookingReference?.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  const handleOpenReschedule = (app) => {
    setRescheduleModal(app);
    setNewDate(app.date || '');
    setNewTime(app.time || RESCHEDULE_SLOTS[0]);
  };

  const handleConfirmReschedule = async (e) => {
    e.preventDefault();
    if (!newDate || !newTime) return;
    await reschedule(rescheduleModal.id, newDate, newTime);
    setRescheduleModal(null);
  };

  const handleConfirmCancel = async () => {
    if (!cancelModal) return;
    await cancelAppointment(cancelModal.id, cancelReason);
    setCancelModal(null);
  };

  const counts = {
    upcoming: appointments.filter((a) => a.status === 'CONFIRMED' || a.status === 'RESCHEDULED').length,
    completed: appointments.filter((a) => a.status === 'COMPLETED').length,
    cancelled: appointments.filter((a) => a.status === 'CANCELLED').length,
  };

  return (
    <div className="appointments-page-container">
      <div className="appointments-content-wrapper">
        {/* Header Bar */}
        <div className="appointments-header-card">
          <div className="header-titles">
            <span className="section-pill">PATIENT PORTAL</span>
            <h1>My Healthcare Appointments</h1>
            <p>Track your scheduled hospital visits, video consultations, and digital prescriptions.</p>
          </div>

          <div className="header-actions">
            <div className="microservice-indicator-pill">
              <span className={`service-dot ${isBackendConnected ? 'live' : 'local'}`}></span>
              <span>Appointment Microservice (8083): {isBackendConnected ? 'Online' : 'Local Cache'}</span>
            </div>
            <Link to="/book-appointment" className="primary-btn book-new-btn">
              + Book New Appointment
            </Link>
          </div>
        </div>

        {/* Tab Controls & Search */}
        <div className="tabs-search-container">
          <div className="appointment-tabs-row">
            <button
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming ({counts.upcoming})
            </button>
            <button
              className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed ({counts.completed})
            </button>
            <button
              className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled ({counts.cancelled})
            </button>
          </div>

          <div className="appointment-search-input">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor or reference (e.g. CS-2041)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading appointments from microservice...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="empty-appointments-box">
            <Calendar size={48} className="empty-icon" />
            <h3>No {activeTab} appointments found</h3>
            <p>
              {activeTab === 'upcoming'
                ? "You don't have any upcoming doctor consultations right now."
                : `No ${activeTab} records match your search criteria.`}
            </p>
            {activeTab === 'upcoming' && (
              <Link to="/book-appointment" className="primary-btn">
                Schedule a Consultation
              </Link>
            )}
          </div>
        ) : (
          <div className="appointments-grid-list">
            {filteredAppointments.map((app) => {
              const isVideo = app.consultationType === 'Video Consultation';
              const isUpcoming = app.status === 'CONFIRMED' || app.status === 'RESCHEDULED';

              return (
                <div key={app.id} className="appointment-dashboard-card">
                  <div className="card-top-strip">
                    <div className="reference-code">
                      <span>Ref:</span> <strong>{app.bookingReference}</strong>
                    </div>

                    <div className="badges-group">
                      <span className={`consultation-type-pill ${isVideo ? 'video' : 'clinic'}`}>
                        {isVideo ? <Video size={13} /> : <Building size={13} />}
                        {app.consultationType || 'In-Person'}
                      </span>

                      <span className={`status-pill status-${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="card-main-body">
                    <div className="doctor-avatar-circle">🧑‍⚕️</div>

                    <div className="doctor-info-block">
                      <h3 className="doctor-heading">{app.doctorName}</h3>
                      <p className="specialty-sub">{app.doctorSpecialization}</p>

                      <div className="appointment-time-tags">
                        <div className="time-tag">
                          <Calendar size={14} />
                          <span>{app.date}</span>
                        </div>
                        <div className="time-tag">
                          <Clock size={14} />
                          <span>{app.time}</span>
                        </div>
                      </div>

                      {app.reason && (
                        <p className="visit-reason-text">
                          <strong>Concern:</strong> {app.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="card-footer-actions">
                    {isUpcoming && isVideo && (
                      <button
                        className="join-telehealth-btn"
                        onClick={() => navigate(`/telehealth/${app.id}`)}
                      >
                        <Video size={16} /> Join Video Consultation
                      </button>
                    )}

                    {isUpcoming && (
                      <>
                        <button
                          className="action-link-btn"
                          onClick={() => handleOpenReschedule(app)}
                        >
                          <RotateCcw size={14} /> Reschedule
                        </button>
                        <button
                          className="action-link-btn danger"
                          onClick={() => setCancelModal(app)}
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </>
                    )}

                    {app.status === 'COMPLETED' && (
                      <button
                        className="view-rx-btn"
                        onClick={() => setPrescriptionModal(app)}
                      >
                        <FileText size={15} /> View Digital Prescription
                      </button>
                    )}

                    {app.status === 'CANCELLED' && (
                      <span className="cancelled-note">
                        Cancelled • Free to reschedule anytime
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RESCHEDULE MODAL */}
      {rescheduleModal && (
        <div className="modal-overlay" onClick={() => setRescheduleModal(null)}>
          <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reschedule Appointment</h3>
              <button className="close-modal-x" onClick={() => setRescheduleModal(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleConfirmReschedule} className="modal-body">
              <p>
                Rescheduling with <strong>{rescheduleModal.doctorName}</strong> (Ref:{' '}
                {rescheduleModal.bookingReference})
              </p>

              <div className="form-group">
                <label>New Consultation Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Preferred Time Slot</label>
                <select value={newTime} onChange={(e) => setNewTime(e.target.value)} required>
                  {RESCHEDULE_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setRescheduleModal(null)}
                >
                  Close
                </button>
                <button type="submit" className="primary-btn">
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CANCEL MODAL */}
      {cancelModal && (
        <div className="modal-overlay" onClick={() => setCancelModal(null)}>
          <div className="custom-modal-card danger-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cancel Appointment</h3>
              <button className="close-modal-x" onClick={() => setCancelModal(null)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <AlertCircle size={36} className="modal-alert-icon" />
              <p>
                Are you sure you want to cancel your appointment with{' '}
                <strong>{cancelModal.doctorName}</strong> on <strong>{cancelModal.date}</strong> at{' '}
                <strong>{cancelModal.time}</strong>?
              </p>

              <div className="form-group">
                <label>Reason for cancellation:</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="Personal schedule conflict">Personal schedule conflict</option>
                  <option value="Symptoms improved">Symptoms improved</option>
                  <option value="Booked another specialist">Booked another specialist</option>
                  <option value="Emergency circumstances">Emergency circumstances</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setCancelModal(null)}
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={handleConfirmCancel}
                >
                  Yes, Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL PRESCRIPTION MODAL */}
      {prescriptionModal && (
        <div className="modal-overlay" onClick={() => setPrescriptionModal(null)}>
          <div className="prescription-modal-card printable-ticket" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header rx-header">
              <div className="rx-clinic-brand">
                <h2>CareSync Hospital & Telemedicine</h2>
                <small>Official Electronic Medical Prescription • Ref: {prescriptionModal.bookingReference}</small>
              </div>
              <button className="close-modal-x" onClick={() => setPrescriptionModal(null)}>
                ×
              </button>
            </div>

            <div className="rx-body">
              <div className="rx-doctor-patient-strip">
                <div>
                  <small>Attending Physician</small>
                  <strong>{prescriptionModal.doctorName}</strong>
                  <p>{prescriptionModal.doctorSpecialization} • MD, MBBS</p>
                </div>
                <div>
                  <small>Patient Name</small>
                  <strong>{prescriptionModal.patientName || user?.name || 'Patient'}</strong>
                  <p>Date: {prescriptionModal.date}</p>
                </div>
              </div>

              <hr className="rx-divider" />

              <div className="rx-medications-section">
                <h4 className="rx-symbol">℞ Prescribed Medications</h4>
                <div className="medication-item">
                  <div className="med-name">
                    <strong>1. Amoxicillin 500mg Capsule</strong>
                    <span>1 capsule orally 3 times daily after meals for 7 days</span>
                  </div>
                  <span className="med-qty">Qty: 21</span>
                </div>

                <div className="medication-item">
                  <div className="med-name">
                    <strong>2. Paracetamol 650mg Tablet</strong>
                    <span>1 tablet every 6-8 hours as needed for fever or mild pain</span>
                  </div>
                  <span className="med-qty">Qty: 10</span>
                </div>

                <div className="medication-item">
                  <div className="med-name">
                    <strong>3. Multivitamin & Zinc Supplement</strong>
                    <span>1 tablet once daily with breakfast for 30 days</span>
                  </div>
                  <span className="med-qty">Qty: 30</span>
                </div>
              </div>

              <div className="rx-notes-box">
                <strong>Physician Clinical Advice:</strong>
                <p>
                  Maintain adequate hydration (2.5L daily). Rest adequately.
                  Schedule a follow-up review if symptoms persist beyond 5 days.
                </p>
              </div>

              <div className="rx-signature-area">
                <div className="digital-sig">
                  <span className="sig-name">{prescriptionModal.doctorName}</span>
                  <small>Digitally Verified & Signed on {prescriptionModal.date}</small>
                </div>
              </div>
            </div>

            <div className="rx-footer-actions">
              <button className="secondary-btn" onClick={() => window.print()}>
                <Printer size={16} /> Print Prescription
              </button>
              <button className="primary-btn" onClick={() => setPrescriptionModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
