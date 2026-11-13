import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchAppointments,
  createAppointment as apiCreate,
  updateAppointmentStatus as apiUpdateStatus,
  rescheduleAppointment as apiReschedule,
  deleteAppointment as apiDelete,
} from '../services/appointmentApi';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // If user is doctor/admin, load all appointments; else load patient's or all
      const userEmail = user?.role === 'patient' ? user.email : null;
      const res = await fetchAppointments(userEmail);
      setAppointments(res.appointments);
      setIsBackendConnected(res.isLive);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const bookAppointment = async (appointmentData) => {
    const enriched = {
      ...appointmentData,
      patientName: appointmentData.patientName || user?.name || 'Guest Patient',
      patientEmail: appointmentData.patientEmail || user?.email || 'guest@example.com',
      patientPhone: appointmentData.patientPhone || user?.phone || '+1 (555) 000-0000',
    };

    const res = await apiCreate(enriched);
    setAppointments((prev) => [res.appointment, ...prev.filter((a) => a.id !== res.appointment.id)]);
    setIsBackendConnected(res.isLive);
    addToast(
      `Appointment booked with ${res.appointment.doctorName}! Reference: ${res.appointment.bookingReference}`,
      'success'
    );
    return res.appointment;
  };

  const cancelAppointment = async (id, reason = '') => {
    const res = await apiUpdateStatus(id, 'CANCELLED');
    if (res.appointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED', cancellationReason: reason } : a))
      );
    }
    addToast('Appointment has been cancelled.', 'info');
    return true;
  };

  const reschedule = async (id, newDate, newTime) => {
    const res = await apiReschedule(id, newDate, newTime);
    if (res.appointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime, status: 'RESCHEDULED' } : a))
      );
    }
    addToast(`Appointment rescheduled to ${newDate} at ${newTime}.`, 'success');
    return true;
  };

  const updateStatus = async (id, newStatus) => {
    const res = await apiUpdateStatus(id, newStatus);
    if (res.appointment) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus.toUpperCase() } : a))
      );
    }
    addToast(`Appointment status updated to ${newStatus}.`, 'info');
    return true;
  };

  const removeAppointment = async (id) => {
    await apiDelete(id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    addToast('Appointment removed from records.', 'info');
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        isBackendConnected,
        bookAppointment,
        cancelAppointment,
        reschedule,
        updateStatus,
        removeAppointment,
        refreshAppointments: loadData,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointments must be used within AppointmentProvider');
  return ctx;
}
