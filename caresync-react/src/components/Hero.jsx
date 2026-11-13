import AppointmentCard from './AppointmentCard';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero({ onBookNow }) {
  return (
    <div className="hero" id="home">
      <div className="hero-content">
        <p className="small-heading">YOUR HEALTH, OUR PRIORITY</p>

        <h1>
          Find the Right Doctor
          <span>For Your Health</span>
        </h1>

        <p className="hero-text">
          Book appointments with trusted doctors quickly and easily. Manage your appointments and
          healthcare from one place.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => scrollToSection('doctors')}>
            Find a Doctor
          </button>
          <button className="secondary-btn" onClick={() => scrollToSection('about')}>
            Learn More
          </button>
        </div>
      </div>

      <AppointmentCard onBookNow={onBookNow} />
    </div>
  );
}
