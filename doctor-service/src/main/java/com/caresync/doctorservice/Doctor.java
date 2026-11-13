package com.caresync.doctorservice;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private double rating;
    private int experienceYears;
    private String status;
    private double consultationFee = 500.0;

    @Column(length = 1000)
    private String bio = "Experienced specialist providing compassionate patient care.";

    private String availableDays = "Mon - Fri";
    private String location = "Main Hospital, Suite 301";
    private String phone = "+1 (555) 019-2834";
    private String email = "doctor@caresync.com";

    public Doctor() {
    }

    public Doctor(String name, String specialization, double rating,
                  int experienceYears, String status) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
        this.experienceYears = experienceYears;
        this.status = status;
    }

    public Doctor(String name, String specialization, double rating,
                  int experienceYears, String status, double consultationFee,
                  String bio, String availableDays, String location, String phone, String email) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
        this.experienceYears = experienceYears;
        this.status = status;
        this.consultationFee = consultationFee;
        this.bio = bio;
        this.availableDays = availableDays;
        this.location = location;
        this.phone = phone;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSpecialization() { return specialization; }
    public double getRating() { return rating; }
    public int getExperienceYears() { return experienceYears; }
    public String getStatus() { return status; }
    public double getConsultationFee() { return consultationFee; }
    public String getBio() { return bio; }
    public String getAvailableDays() { return availableDays; }
    public String getLocation() { return location; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public void setRating(double rating) { this.rating = rating; }
    public void setExperienceYears(int experienceYears) { this.experienceYears = experienceYears; }
    public void setStatus(String status) { this.status = status; }
    public void setConsultationFee(double consultationFee) { this.consultationFee = consultationFee; }
    public void setBio(String bio) { this.bio = bio; }
    public void setAvailableDays(String availableDays) { this.availableDays = availableDays; }
    public void setLocation(String location) { this.location = location; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEmail(String email) { this.email = email; }
}
