import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchDoctors } from '../services/doctorApi';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  Building,
  Video,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Download,
  AlertCircle
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
];

// Helper to generate next 14 bookable days
function getNextDays(count = 14) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const isoDate = `${yyyy}-${mm}-${dd}`;
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dateNum = d.getDate();
    days.push({ isoDate, dayName, monthName, dateNum });
  }
  return days;
}

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();
  const { addToast } = useToast();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctorId || '');
  const [consultationType, setConsultationType] = useState('In-Person'); // 'In-Person' | 'Video Consultation'

  const availableDays = getNextDays(14);
  const [selectedDate, setSelectedDate] = useState(availableDays[0].isoDate);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);

  // Form patient info
  const [patientForm, setPatientForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: '28',
    gender: 'Female',
    reason: '',
    medicalNotes: '',
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('clinic'); // 'clinic' | 'card' | 'insurance'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    fetchDoctors().then((res) => {
      setDoctors(res.doctors);
      if (!selectedDoctorId && res.doctors.length > 0) {
        setSelectedDoctorId(String(res.doctors[0].id));
      }
    });
  }, [selectedDoctorId]);

  // Pre-fill user data if auth changes
  useEffect(() => {
    if (user) {
      setPatientForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const selectedDoctor = doctors.find((d) => String(d.id) === String(selectedDoctorId)) || doctors[0];

  const handlePatientFormChange = (e) => {
    setPatientForm({ ...patientForm, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!patientForm.name || !patientForm.email || !patientForm.phone) {
      addToast('Please fill in all required patient details', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        doctorName: selectedDoctor ? selectedDoctor.name : 'Dr. Specialist',
        doctorSpecialization: selectedDoctor ? selectedDoctor.specialization : 'General Physician',
        patientName: patientForm.name,
        patientEmail: patientForm.email,
        patientPhone: patientForm.phone,
        patientAge: parseInt(patientForm.age, 10) || 25,
        patientGender: patientForm.gender,
        date: selectedDate,
        time: selectedTime,
        consultationType,
        reason: patientForm.reason || 'General health consultation',
        notes: patientForm.medicalNotes || '',
        fee: selectedDoctor ? selectedDoctor.consultationFee || 500 : 500,
      };

      const result = await bookAppointment(appointmentData);
      setBookingConfirmed(result);
      setCurrentStep(4); // Confirmation step
    } catch {
      addToast('Error saving appointment. Please retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="booking-page-container">
      <div className="booking-wrapper">
        {/* Stepper Progress Bar */}
        <div className="booking-stepper">
          <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'done' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-text">Doctor & Service</span>
          </div>
          <div className="stepper-line"></div>
          <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'done' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-text">Date & Time Slot</span>
          </div>
          <div className="stepper-line"></div>
          <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'done' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-text">Patient & Payment</span>
          </div>
          <div className="stepper-line"></div>
          <div className={`step-indicator ${currentStep === 4 ? 'active done' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-text">Confirmation</span>
          </div>
        </div>

        {/* STEP 1: Select Doctor & Type */}
        {currentStep === 1 && (
          <div className="booking-step-card">
            <h2>Select Doctor & Consultation Type</h2>
            <p className="step-instruction">
              Choose the specialist you wish to see and your preferred consultation mode.
            </p>

            {/* Consultation Mode Selector */}
            <div className="consultation-type-selector">
              <div
                className={`type-option-card ${consultationType === 'In-Person' ? 'selected' : ''}`}
                onClick={() => setConsultationType('In-Person')}
              >
                <div className="type-icon-box"><Building size={24} /></div>
                <div>
                  <strong>In-Person Hospital Visit</strong>
                  <p>Visit the doctor at CareSync Central Medical Clinic</p>
                </div>
              </div>

              <div
                className={`type-option-card ${consultationType === 'Video Consultation' ? 'selected' : ''}`}
                onClick={() => setConsultationType('Video Consultation')}
              >
                <div className="type-icon-box"><Video size={24} /></div>
                <div>
                  <strong>Telehealth HD Video Call</strong>
                  <p>Consult online from home using phone or PC</p>
                </div>
              </div>
            </div>

            {/* Doctor Picker */}
            <div className="doctor-select-section">
              <label className="field-label">Choose Specialist:</label>
              <div className="doctors-select-grid">
                {doctors.map((doc) => {
                  const isSelected = String(doc.id) === String(selectedDoctorId);
                  return (
                    <div
                      key={doc.id}
                      className={`doc-pick-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDoctorId(String(doc.id))}
                    >
                      <div className="doc-pick-avatar">🧑‍⚕️</div>
                      <div className="doc-pick-info">
                        <strong>{doc.name}</strong>
                        <span className="doc-pick-spec">{doc.specialization}</span>
                        <div className="doc-pick-metrics">
                          <span>⭐ {doc.rating || 4.9}</span>
                          <span>•</span>
                          <span>₹{doc.consultationFee || 500} fee</span>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="selected-check" size={20} />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="step-actions">
              <button
                type="button"
                className="primary-btn continue-btn"
                onClick={() => setCurrentStep(2)}
              >
                Continue to Select Slot <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Date & Slot */}
        {currentStep === 2 && (
          <div className="booking-step-card">
            <h2>Select Appointment Date & Time</h2>
            <p className="step-instruction">
              Consulting with <strong>{selectedDoctor?.name}</strong> ({selectedDoctor?.specialization}) via{' '}
              <strong>{consultationType}</strong>.
            </p>

            {/* 14-Day Calendar Scroller */}
            <label className="field-label">Available Dates:</label>
            <div className="calendar-date-scroller">
              {availableDays.map((d) => {
                const isSelected = selectedDate === d.isoDate;
                return (
                  <div
                    key={d.isoDate}
                    className={`date-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(d.isoDate)}
                  >
                    <span className="chip-day">{d.dayName}</span>
                    <span className="chip-num">{d.dateNum}</span>
                    <span className="chip-month">{d.monthName}</span>
                  </div>
                );
              })}
            </div>

            {/* Time Slot Selector */}
            <label className="field-label">Available Time Slots for {selectedDate}:</label>
            <div className="slots-grid">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    <Clock size={14} />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>

            <div className="step-actions split">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setCurrentStep(1)}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <button
                type="button"
                className="primary-btn continue-btn"
                onClick={() => setCurrentStep(3)}
              >
                Continue to Patient Info <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Info & Payment */}
        {currentStep === 3 && (
          <div className="booking-step-card">
            <h2>Patient Details & Payment Preference</h2>
            <p className="step-instruction">
              Enter the patient information and choose your payment method.
            </p>

            <form onSubmit={handleFinalSubmit}>
              <div className="form-two-col">
                <div className="form-group">
                  <label>Full Patient Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={patientForm.name}
                    onChange={handlePatientFormChange}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={patientForm.email}
                    onChange={handlePatientFormChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-three-col">
                <div className="form-group">
                  <label>Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={patientForm.phone}
                    onChange={handlePatientFormChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Patient Age</label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    value={patientForm.age}
                    onChange={handlePatientFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={patientForm.gender}
                    onChange={handlePatientFormChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Reason for Visit / Symptoms</label>
                <textarea
                  name="reason"
                  rows="3"
                  value={patientForm.reason}
                  onChange={handlePatientFormChange}
                  placeholder="Describe your current symptoms or reason for scheduling..."
                ></textarea>
              </div>

              {/* Payment Methods */}
              <div className="payment-options-section">
                <label className="field-label">Choose Payment Method:</label>
                <div className="payment-options-grid">
                  <div
                    className={`pay-opt-card ${paymentMethod === 'clinic' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('clinic')}
                  >
                    <Building size={20} />
                    <div>
                      <strong>Pay at Hospital</strong>
                      <small>Cash, Card, or UPI during check-in</small>
                    </div>
                  </div>

                  <div
                    className={`pay-opt-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={20} />
                    <div>
                      <strong>Online Card Payment</strong>
                      <small>Instant debit/credit receipt</small>
                    </div>
                  </div>

                  <div
                    className={`pay-opt-card ${paymentMethod === 'insurance' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('insurance')}
                  >
                    <ShieldCheck size={20} />
                    <div>
                      <strong>Health Insurance</strong>
                      <small>Direct cashless claim clearance</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="booking-summary-strip">
                <div className="summary-col">
                  <span className="summary-label">Doctor</span>
                  <strong>{selectedDoctor?.name}</strong>
                  <small>{selectedDoctor?.specialization}</small>
                </div>
                <div className="summary-col">
                  <span className="summary-label">Date & Time</span>
                  <strong>{selectedDate}</strong>
                  <small>{selectedTime}</small>
                </div>
                <div className="summary-col">
                  <span className="summary-label">Mode</span>
                  <strong>{consultationType}</strong>
                </div>
                <div className="summary-col total-col">
                  <span className="summary-label">Total Fee</span>
                  <strong className="fee-total">₹{selectedDoctor?.consultationFee || 500}</strong>
                </div>
              </div>

              <div className="step-actions split">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <button
                  type="submit"
                  className="primary-btn continue-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Confirming with Microservice...' : 'Confirm & Reserve Slot'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: Confirmation Screen */}
        {currentStep === 4 && bookingConfirmed && (
          <div className="confirmation-screen-card printable-ticket">
            <div className="confirmation-header">
              <div className="success-badge-large">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h2>Appointment Confirmed!</h2>
              <p className="confirmation-subtitle">
                Your consultation has been reserved in the CareSync Hospital System.
              </p>
            </div>

            {/* Boarding Pass Style Receipt Card */}
            <div className="appointment-receipt-card">
              <div className="receipt-top-bar">
                <div>
                  <span className="pass-label">Booking Reference</span>
                  <h3 className="pass-id">{bookingConfirmed.bookingReference}</h3>
                </div>
                <div className="pass-status-pill">CONFIRMED</div>
              </div>

              <div className="receipt-grid">
                <div className="receipt-item">
                  <span className="receipt-label">Doctor</span>
                  <strong>{bookingConfirmed.doctorName}</strong>
                  <p>{bookingConfirmed.doctorSpecialization}</p>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Patient</span>
                  <strong>{bookingConfirmed.patientName}</strong>
                  <p>{bookingConfirmed.patientEmail}</p>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Scheduled Date</span>
                  <strong>{bookingConfirmed.date}</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Scheduled Time</span>
                  <strong>{bookingConfirmed.time}</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Consultation Mode</span>
                  <strong>{bookingConfirmed.consultationType}</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Consultation Fee</span>
                  <strong>₹{bookingConfirmed.fee}</strong>
                </div>
              </div>

              {bookingConfirmed.consultationType === 'Video Consultation' && (
                <div className="video-access-alert">
                  <Video size={20} />
                  <div>
                    <strong>Telehealth Video Link Ready</strong>
                    <p>
                      You can launch the secure consultation room directly from your Appointments dashboard
                      at the scheduled time.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="confirmation-actions">
              <button className="secondary-btn" onClick={handlePrint}>
                <Download size={16} /> Print Receipt Pass
              </button>
              <Link to="/appointments" className="primary-btn">
                View in My Appointments
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
