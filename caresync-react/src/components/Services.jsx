import { services } from '../data/doctors';

export default function Services() {
  return (
    <div className="services" id="about">
      <p className="small-heading">OUR SERVICES</p>

      <h2>Healthcare Made Simple</h2>

      <div className="service-container">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
