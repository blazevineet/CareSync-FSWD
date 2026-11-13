export default function DoctorSearch({
  query,
  onQueryChange,
  specialty,
  onSpecialtyChange,
  specialties,
}) {
  return (
    <div className="doctor-search-container">
      <input
        type="text"
        id="doctorSearch"
        placeholder="Search doctor or specialization..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <select
        id="specialtyFilter"
        value={specialty}
        onChange={(e) => onSpecialtyChange(e.target.value)}
      >
        <option value="all">All Specializations</option>
        {specialties.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
