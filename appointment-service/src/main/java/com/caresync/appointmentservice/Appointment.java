package com.caresync.appointmentservice;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingReference;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private int patientAge;
    private String patientGender;

    private String doctorName;
    private String doctorSpecialization;

    private String date;
    private String time;
    private String consultationType = "In-Person"; // or "Video Consultation"

    @Column(length = 1000)
    private String reason;

    private String status = "CONFIRMED"; // CONFIRMED, COMPLETED, CANCELLED, RESCHEDULED
    private double fee = 500.0;

    @Column(length = 1000)
    private String notes;

    private String createdAt;

    public Appointment() {
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }

    public Appointment(String bookingReference, String patientName, String patientEmail,
                       String patientPhone, int patientAge, String patientGender,
                       String doctorName, String doctorSpecialization, String date,
                       String time, String consultationType, String reason,
                       String status, double fee) {
        this();
        this.bookingReference = bookingReference;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.patientPhone = patientPhone;
        this.patientAge = patientAge;
        this.patientGender = patientGender;
        this.doctorName = doctorName;
        this.doctorSpecialization = doctorSpecialization;
        this.date = date;
        this.time = time;
        this.consultationType = consultationType;
        this.reason = reason;
        this.status = status;
        this.fee = fee;
    }

    public Long getId() { return id; }
    public String getBookingReference() { return bookingReference; }
    public String getPatientName() { return patientName; }
    public String getPatientEmail() { return patientEmail; }
    public String getPatientPhone() { return patientPhone; }
    public int getPatientAge() { return patientAge; }
    public String getPatientGender() { return patientGender; }
    public String getDoctorName() { return doctorName; }
    public String getDoctorSpecialization() { return doctorSpecialization; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getConsultationType() { return consultationType; }
    public String getReason() { return reason; }
    public String getStatus() { return status; }
    public double getFee() { return fee; }
    public String getNotes() { return notes; }
    public String getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public void setPatientEmail(String patientEmail) { this.patientEmail = patientEmail; }
    public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }
    public void setPatientAge(int patientAge) { this.patientAge = patientAge; }
    public void setPatientGender(String patientGender) { this.patientGender = patientGender; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
    public void setDoctorSpecialization(String doctorSpecialization) { this.doctorSpecialization = doctorSpecialization; }
    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setConsultationType(String consultationType) { this.consultationType = consultationType; }
    public void setReason(String reason) { this.reason = reason; }
    public void setStatus(String status) { this.status = status; }
    public void setFee(double fee) { this.fee = fee; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
