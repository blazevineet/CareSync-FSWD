package com.caresync.doctorservice;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Optional<Doctor> updateDoctor(Long id, Doctor updated) {
        return doctorRepository.findById(id).map(existing -> {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getSpecialization() != null) existing.setSpecialization(updated.getSpecialization());
            if (updated.getRating() > 0) existing.setRating(updated.getRating());
            if (updated.getExperienceYears() > 0) existing.setExperienceYears(updated.getExperienceYears());
            if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
            if (updated.getConsultationFee() > 0) existing.setConsultationFee(updated.getConsultationFee());
            if (updated.getBio() != null) existing.setBio(updated.getBio());
            if (updated.getAvailableDays() != null) existing.setAvailableDays(updated.getAvailableDays());
            if (updated.getLocation() != null) existing.setLocation(updated.getLocation());
            if (updated.getPhone() != null) existing.setPhone(updated.getPhone());
            if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
            return doctorRepository.save(existing);
        });
    }

    public boolean deleteDoctor(Long id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
