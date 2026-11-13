import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from '../services/doctorApi';
import DoctorCard from '../components/DoctorCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Filters from query params or state
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || 'All');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [minRating, setMinRating] = useState('0');
  const [minExp, setMinExp] = useState('0');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    fetchDoctors().then((res) => {
      setDoctors(res.doctors);
      setIsBackendConnected(res.isLive);
      setLoading(false);
    });
  }, []);

  // Update URL params when specialty or query changes
  useEffect(() => {
    const params = {};
    if (query) params.search = query;
    if (specialty !== 'All') params.specialty = specialty;
    setSearchParams(params, { replace: true });
  }, [query, specialty, setSearchParams]);

  // Extract unique specialties from loaded doctors
  const specialties = useMemo(() => {
    const list = ['All', ...new Set(doctors.map((d) => d.specialization))];
    return list;
  }, [doctors]);

  // Filter & sort logic
  const filteredDoctors = useMemo(() => {
    const q = query.trim().toLowerCase();

    return doctors
      .filter((doc) => {
        const matchesQuery =
          !q ||
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          (doc.bio && doc.bio.toLowerCase().includes(q));

        const matchesSpecialty =
          specialty === 'All' ||
          doc.specialization.toLowerCase().includes(specialty.toLowerCase());

        const matchesAvailability =
          !availableTodayOnly ||
          (doc.status && doc.status.toLowerCase().includes('today'));

        const matchesRating = doc.rating >= parseFloat(minRating);
        const matchesExp = doc.experienceYears >= parseInt(minExp, 10);

        return matchesQuery && matchesSpecialty && matchesAvailability && matchesRating && matchesExp;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'exp-desc') return b.experienceYears - a.experienceYears;
        if (sortBy === 'fee-asc') return (a.consultationFee || 500) - (b.consultationFee || 500);
        if (sortBy === 'fee-desc') return (b.consultationFee || 500) - (a.consultationFee || 500);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // recommended default
      });
  }, [doctors, query, specialty, availableTodayOnly, minRating, minExp, sortBy]);

  const resetFilters = () => {
    setQuery('');
    setSpecialty('All');
    setAvailableTodayOnly(false);
    setMinRating('0');
    setMinExp('0');
    setSortBy('recommended');
  };

  return (
    <div className="doctors-directory-page">
      {/* Top Banner */}
      <section className="directory-header">
        <div className="directory-header-content">
          <span className="section-pill">SPECIALIST DIRECTORY</span>
          <h1>Find The Right Doctor For Your Needs</h1>
          <p>
            Browse verified physicians across top specialties, review real patient ratings,
            and book appointments directly.
          </p>

          <div className="status-microservice-pill">
            <span className={`status-dot ${isBackendConnected ? 'online' : 'offline'}`}></span>
            <span>Doctor Service (Port 8081): {isBackendConnected ? 'Connected & Live' : 'Using Local Cache'}</span>
          </div>
        </div>
      </section>

      {/* Main Filter and Directory Content */}
      <div className="directory-main-container">
        {/* Search & Filter Bar */}
        <div className="filter-panel-card">
          <div className="filter-row primary-search-row">
            <div className="search-bar-wrap">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search by doctor name or condition..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button className="clear-search-btn" onClick={() => setQuery('')}>
                  ×
                </button>
              )}
            </div>

            <div className="specialty-dropdown-wrap">
              <label htmlFor="specialty-select">Specialty:</label>
              <select
                id="specialty-select"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-dropdown-wrap">
              <label htmlFor="sort-select">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="rating-desc">Highest Rated ⭐</option>
                <option value="exp-desc">Most Experienced 🩺</option>
                <option value="fee-asc">Consultation Fee: Low to High</option>
                <option value="fee-desc">Consultation Fee: High to Low</option>
                <option value="name-asc">Doctor Name (A - Z)</option>
              </select>
            </div>

            <div className="view-mode-buttons hide-mobile">
              <button
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Quick Filter Badges */}
          <div className="quick-filter-badges">
            <button
              className={`filter-chip ${availableTodayOnly ? 'active' : ''}`}
              onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
            >
              🟢 Available Today Only
            </button>

            <button
              className={`filter-chip ${minRating === '4.8' ? 'active' : ''}`}
              onClick={() => setMinRating(minRating === '4.8' ? '0' : '4.8')}
            >
              ⭐ 4.8+ Top Rated
            </button>

            <button
              className={`filter-chip ${minExp === '10' ? 'active' : ''}`}
              onClick={() => setMinExp(minExp === '10' ? '0' : '10')}
            >
              🏆 10+ Years Experience
            </button>

            {(query || specialty !== 'All' || availableTodayOnly || minRating !== '0' || minExp !== '0') && (
              <button className="reset-filter-btn" onClick={resetFilters}>
                <RotateCcw size={14} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="results-counter-bar">
          <p>
            Showing <strong>{filteredDoctors.length}</strong> {filteredDoctors.length === 1 ? 'specialist' : 'specialists'}
            {specialty !== 'All' && <span> in <strong>{specialty}</strong></span>}
          </p>
        </div>

        {/* Doctors Grid / List */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading doctors directory...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="empty-results-box">
            <AlertCircle size={48} className="empty-icon" />
            <h3>No Doctors Match Your Search</h3>
            <p>Try modifying your specialty filter or clearing search keywords.</p>
            <button className="primary-btn" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'doctors-grid' : 'doctors-list-view'}>
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
