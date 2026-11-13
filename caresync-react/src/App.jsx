import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';

import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TelehealthRoomPage from './pages/TelehealthRoomPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on every route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper to conditionally show emergency banner and footer
function MainLayout() {
  const location = useLocation();
  const isTelehealth = location.pathname.startsWith('/telehealth');

  return (
    <div className="app-layout">
      <ScrollToTop />
      {!isTelehealth && <EmergencyBanner />}
      {!isTelehealth && <Navbar />}

      <main className="main-content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetailPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/telehealth/:appointmentId" element={<TelehealthRoomPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isTelehealth && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppointmentProvider>
          <Router>
            <MainLayout />
          </Router>
        </AppointmentProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
