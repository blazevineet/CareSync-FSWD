import { Link } from 'react-router-dom';
import { Activity, Home, Search, Calendar } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="error-code-badge">404</div>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for does not exist or may have been moved.
          Please use the links below to return to CareSync Healthcare services.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="primary-btn">
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/doctors" className="secondary-btn">
            <Search size={16} /> Find Doctors
          </Link>
          <Link to="/appointments" className="secondary-btn">
            <Calendar size={16} /> My Appointments
          </Link>
        </div>
      </div>
    </div>
  );
}
