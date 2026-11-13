import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Heart,
  Activity,
  Droplet,
  Weight,
  Plus,
  FileText,
  Download,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';

const INITIAL_VITALS = [
  { id: 1, name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Optimal', icon: '❤️', date: 'Yesterday' },
  { id: 2, name: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: '💓', date: 'Yesterday' },
  { id: 3, name: 'Fasting Blood Sugar', value: '94', unit: 'mg/dL', status: 'Normal', icon: '🩸', date: '3 days ago' },
  { id: 4, name: 'Oxygen Saturation (SpO2)', value: '98', unit: '%', status: 'Healthy', icon: '🫁', date: 'Yesterday' },
  { id: 5, name: 'Body Weight', value: '68.5', unit: 'kg', status: 'BMI: 22.4', icon: '⚖️', date: '1 week ago' },
];

const LAB_REPORTS = [
  {
    id: 'LAB-101',
    name: 'Comprehensive Metabolic Panel (CMP)',
    doctor: 'Dr. Ananya Rao',
    date: '2026-10-18',
    status: 'Normal',
    fileSize: '1.4 MB',
  },
  {
    id: 'LAB-102',
    name: 'Lipid Panel & Cholesterol Profile',
    doctor: 'Dr. Rahul Sharma',
    date: '2026-10-15',
    status: 'Normal',
    fileSize: '890 KB',
  },
  {
    id: 'LAB-103',
    name: 'Electrocardiogram (ECG / EKG) 12-Lead Report',
    doctor: 'Dr. Rahul Sharma',
    date: '2026-09-28',
    status: 'Normal Sinus Rhythm',
    fileSize: '2.1 MB',
  },
];

export default function MedicalRecordsPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [vitals, setVitals] = useState(INITIAL_VITALS);
  const [activeSubTab, setActiveSubTab] = useState('vitals'); // 'vitals' | 'reports' | 'prescriptions'

  // Log vitals modal
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newVital, setNewVital] = useState({
    type: 'Blood Pressure',
    value: '',
  });

  const handleLogVital = (e) => {
    e.preventDefault();
    if (!newVital.value) return;

    let unit = 'mmHg';
    let icon = '❤️';
    if (newVital.type === 'Heart Rate') { unit = 'bpm'; icon = '💓'; }
    if (newVital.type === 'Blood Sugar') { unit = 'mg/dL'; icon = '🩸'; }
    if (newVital.type === 'Weight') { unit = 'kg'; icon = '⚖️'; }

    const item = {
      id: Date.now(),
      name: newVital.type,
      value: newVital.value,
      unit,
      status: 'Recorded',
      icon,
      date: 'Just now',
    };

    setVitals([item, ...vitals.filter((v) => v.name !== newVital.type)]);
    setIsLogModalOpen(false);
    setNewVital({ type: 'Blood Pressure', value: '' });
    addToast(`${newVital.type} reading of ${newVital.value} ${unit} logged successfully!`, 'success');
  };

  const handleDownloadReport = (reportName) => {
    addToast(`Downloading ${reportName} (PDF)...`, 'info');
  };

  return (
    <div className="medical-records-page">
      <div className="records-container">
        {/* Page Header */}
        <div className="records-header-banner">
          <div>
            <span className="section-pill">ELECTRONIC HEALTH RECORD (EHR)</span>
            <h1>Personal Medical Records</h1>
            <p>Secure repository of your health metrics, diagnostic laboratory tests, and clinical prescriptions.</p>
          </div>

          <button
            className="primary-btn log-vital-btn"
            onClick={() => setIsLogModalOpen(true)}
          >
            <Plus size={18} /> Log New Health Metric
          </button>
        </div>

        {/* Patient Health Overview Card */}
        <div className="patient-quick-summary-card">
          <div className="patient-avatar-box">
            <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'P'}</span>
          </div>
          <div className="summary-details">
            <h2>{user?.name || 'Priya Sharma'}</h2>
            <div className="summary-tags-row">
              <span className="tag-chip">Blood Group: <strong>{user?.bloodGroup || 'B+'}</strong></span>
              <span className="tag-chip">Allergies: <strong>Penicillin (Mild)</strong></span>
              <span className="tag-chip">Emergency Contact: <strong>{user?.emergencyContact || '+1 (555) 987-6543'}</strong></span>
              <span className="tag-chip verified"><ShieldCheck size={14} /> HIPAA Protected</span>
            </div>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="records-nav-tabs">
          <button
            className={`tab-link ${activeSubTab === 'vitals' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('vitals')}
          >
            <Activity size={16} /> Vital Health Metrics
          </button>
          <button
            className={`tab-link ${activeSubTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('reports')}
          >
            <FileText size={16} /> Diagnostic Lab Reports ({LAB_REPORTS.length})
          </button>
          <button
            className={`tab-link ${activeSubTab === 'prescriptions' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('prescriptions')}
          >
            <Stethoscope size={16} /> Active Medications
          </button>
        </div>

        {/* TAB 1: VITALS */}
        {activeSubTab === 'vitals' && (
          <div className="vitals-dashboard-section">
            <div className="vitals-grid">
              {vitals.map((v) => (
                <div key={v.id} className="vital-metric-card">
                  <div className="vital-top-row">
                    <span className="vital-icon">{v.icon}</span>
                    <span className="vital-status-pill">{v.status}</span>
                  </div>
                  <h4 className="vital-name">{v.name}</h4>
                  <div className="vital-value-display">
                    <span className="main-num">{v.value}</span>
                    <span className="vital-unit">{v.unit}</span>
                  </div>
                  <small className="vital-timestamp">Recorded {v.date}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LAB REPORTS */}
        {activeSubTab === 'reports' && (
          <div className="lab-reports-section">
            <div className="reports-table-card">
              <div className="table-header-row">
                <span>Report Test Name</span>
                <span>Ordering Doctor</span>
                <span>Test Date</span>
                <span>Clinical Result</span>
                <span>Action</span>
              </div>

              {LAB_REPORTS.map((rep) => (
                <div key={rep.id} className="table-data-row">
                  <div className="rep-name-col">
                    <FileText size={18} className="file-icon" />
                    <div>
                      <strong>{rep.name}</strong>
                      <small>ID: {rep.id} • {rep.fileSize}</small>
                    </div>
                  </div>
                  <div>{rep.doctor}</div>
                  <div>{rep.date}</div>
                  <div>
                    <span className="status-pill status-confirmed">{rep.status}</span>
                  </div>
                  <div>
                    <button
                      className="download-report-btn"
                      onClick={() => handleDownloadReport(rep.name)}
                    >
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVE MEDICATIONS */}
        {activeSubTab === 'prescriptions' && (
          <div className="active-meds-section">
            <div className="meds-list-grid">
              <div className="med-record-card">
                <div className="med-card-header">
                  <div>
                    <h3>Amoxicillin 500mg</h3>
                    <small>Antibiotic • Prescribed by Dr. Rahul Sharma</small>
                  </div>
                  <span className="badge active">Active Course</span>
                </div>
                <p className="med-dosage">1 capsule 3x daily with meals for 7 days</p>
                <div className="med-progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }}></div>
                </div>
                <small>4 of 7 days completed</small>
              </div>

              <div className="med-record-card">
                <div className="med-card-header">
                  <div>
                    <h3>Atorvastatin 10mg</h3>
                    <small>Lipid Management • Prescribed by Dr. Rahul Sharma</small>
                  </div>
                  <span className="badge ongoing">Daily Maintenance</span>
                </div>
                <p className="med-dosage">1 tablet at bedtime once daily</p>
                <div className="med-progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
                <small>Refill in 22 days</small>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LOG VITAL MODAL */}
      {isLogModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogModalOpen(false)}>
          <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Log Health Metric</h3>
              <button className="close-modal-x" onClick={() => setIsLogModalOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleLogVital} className="modal-body">
              <div className="form-group">
                <label>Select Metric Type</label>
                <select
                  value={newVital.type}
                  onChange={(e) => setNewVital({ ...newVital, type: e.target.value })}
                >
                  <option value="Blood Pressure">Blood Pressure (e.g. 120/80 mmHg)</option>
                  <option value="Heart Rate">Heart Rate (bpm)</option>
                  <option value="Blood Sugar">Blood Sugar (mg/dL)</option>
                  <option value="Oxygen Saturation (SpO2)">Oxygen Saturation (%)</option>
                  <option value="Body Weight">Body Weight (kg)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Measured Value *</label>
                <input
                  type="text"
                  placeholder="e.g. 122/82 or 74"
                  value={newVital.value}
                  onChange={(e) => setNewVital({ ...newVital, value: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setIsLogModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
