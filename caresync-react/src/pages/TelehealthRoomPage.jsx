import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  Send,
  Clock,
  Sparkles
} from 'lucide-react';

export default function TelehealthRoomPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { appointments, updateStatus } = useAppointments();
  const { user } = useAuth();
  const { addToast } = useToast();

  const appointment = appointments.find((a) => String(a.id) === String(appointmentId));

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: appointment?.doctorName || 'Dr. Specialist',
      time: 'Just now',
      text: `Hello ${user?.name || 'Patient'}, welcome to your CareSync Telehealth consultation. Can you hear and see me clearly?`,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Call timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: user?.name || 'Me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newMessage,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Simulated doctor response after 2 seconds
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: appointment?.doctorName || 'Doctor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I've reviewed your symptom notes and vital signs. Let's discuss your treatment plan.",
        },
      ]);
    }, 2000);
  };

  const handleEndCall = async () => {
    if (appointment) {
      await updateStatus(appointment.id, 'COMPLETED');
    }
    addToast('Telehealth consultation completed. Prescription added to your records.', 'success');
    navigate('/appointments');
  };

  return (
    <div className="telehealth-container">
      {/* Top Telehealth Bar */}
      <div className="telehealth-header-bar">
        <div className="telehealth-doc-details">
          <div className="live-rec-dot"></div>
          <strong>Consulting: {appointment?.doctorName || 'Dr. Rahul Sharma'}</strong>
          <span className="spec-tag">{appointment?.doctorSpecialization || 'Cardiologist'}</span>
        </div>

        <div className="telehealth-timer-badge">
          <Clock size={16} />
          <span>Call Duration: {formatTimer(callDuration)}</span>
        </div>

        <div className="telehealth-security-tag">
          <ShieldCheck size={16} />
          <span>End-to-End Encrypted HD Video</span>
        </div>
      </div>

      {/* Main Video Grid */}
      <div className="telehealth-main-layout">
        {/* Video Area */}
        <div className={`video-stage-area ${isChatOpen ? 'with-chat' : 'full-stage'}`}>
          {/* Doctor Large Video Tile */}
          <div className="doctor-video-feed">
            <div className="simulated-doctor-screen">
              <div className="doc-screen-avatar">🧑‍⚕️</div>
              <div className="doc-screen-overlay">
                <strong>{appointment?.doctorName || 'Dr. Specialist'}</strong>
                <span className="doc-online-pill">Active Clinical Stream</span>
              </div>
            </div>

            {/* Patient Floating PIP Tile */}
            <div className="patient-pip-tile">
              {isVideoOn ? (
                <div className="patient-pip-preview">
                  <div className="patient-initials">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <span className="pip-label">You ({user?.name || 'Patient'})</span>
                </div>
              ) : (
                <div className="pip-video-off">
                  <VideoOff size={20} />
                  <span>Camera Off</span>
                </div>
              )}
            </div>
          </div>

          {/* In-Call Floating Control Bar */}
          <div className="incall-controls-bar">
            <button
              className={`control-circle-btn ${isMicOn ? 'active' : 'muted'}`}
              onClick={() => setIsMicOn(!isMicOn)}
              title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
              className={`control-circle-btn ${isVideoOn ? 'active' : 'muted'}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
              title={isVideoOn ? 'Stop Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
              className={`control-circle-btn ${isChatOpen ? 'active' : ''}`}
              onClick={() => setIsChatOpen(!isChatOpen)}
              title="Toggle Consultation Chat"
            >
              <MessageSquare size={20} />
            </button>

            <button
              className="end-call-circle-btn"
              onClick={handleEndCall}
              title="End Consultation"
            >
              <PhoneOff size={22} />
            </button>
          </div>
        </div>

        {/* In-Call Consultation Chat & Prescription Drawer */}
        {isChatOpen && (
          <div className="telehealth-chat-sidebar">
            <div className="chat-header">
              <h3>Consultation Chat & Notes</h3>
              <small>Ref: {appointment?.bookingReference || 'CS-2042'}</small>
            </div>

            <div className="chat-messages-scroll">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === (user?.name || 'Me') ? 'outgoing' : 'incoming'}`}
                >
                  <div className="chat-bubble">
                    <div className="bubble-meta">
                      <strong>{msg.sender}</strong>
                      <small>{msg.time}</small>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-bar">
              <input
                type="text"
                placeholder="Type clinical question or response..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="send-chat-btn">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
