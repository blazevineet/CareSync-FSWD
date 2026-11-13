package com.caresync.appointmentservice;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAppointmentsByPatientEmail(String email) {
        return appointmentRepository.findByPatientEmailIgnoreCase(email);
    }

    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getBookingReference() == null || appointment.getBookingReference().isEmpty()) {
            appointment.setBookingReference("CS-" + (1000 + (int) (Math.random() * 9000)));
        }
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> updateStatus(Long id, String status) {
        return appointmentRepository.findById(id).map(app -> {
            app.setStatus(status.toUpperCase());
            return appointmentRepository.save(app);
        });
    }

    public Optional<Appointment> reschedule(Long id, String newDate, String newTime) {
        return appointmentRepository.findById(id).map(app -> {
            app.setDate(newDate);
            app.setTime(newTime);
            app.setStatus("RESCHEDULED");
            return appointmentRepository.save(app);
        });
    }

    public boolean deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
