import { Phone, Clock, Video, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmergencyBanner() {
  return (
    <div className="emergency-banner">
      <div className="banner-content">
        <div className="banner-item">
          <ShieldAlert size={16} className="banner-icon alert-pulse" />
          <span>24/7 Medical Emergency Hotline: <strong>+1 (800) 227-3796</strong></span>
        </div>
        <div className="banner-item hide-mobile">
          <Clock size={16} className="banner-icon" />
          <span>Emergency Room & Ambulance: Always Open</span>
        </div>
        <div className="banner-actions">
          <Link to="/book-appointment" className="banner-cta">
            <Video size={14} /> Instant Telehealth Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
