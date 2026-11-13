package com.caresync.appointmentservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientEmailIgnoreCase(String patientEmail);
    List<Appointment> findByDoctorNameIgnoreCase(String doctorName);
    List<Appointment> findByStatusIgnoreCase(String status);
}
