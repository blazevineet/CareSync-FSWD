package com.caresync.doctorservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DoctorServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorServiceApplication.class, args);
    }

    // Realistic seed data across key medical specialties
    @Bean
    CommandLineRunner loadDoctors(DoctorService doctorService) {
        return args -> {
            doctorService.saveDoctor(new Doctor(
                    "Dr. Rahul Sharma",
                    "Cardiologist",
                    4.9,
                    12,
                    "Available Today",
                    800.0,
                    "Senior Consultant Cardiologist specializing in preventive cardiology, heart rhythm disorders, and interventional cardiac care. Board certified with over 1,200 successful patient consultations.",
                    "Mon, Wed, Fri",
                    "Cardiology Wing, Floor 3, Room 302",
                    "+91 98765 43210",
                    "rahul.sharma@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Priya Mehta",
                    "Dermatologist",
                    4.8,
                    9,
                    "Available Today",
                    700.0,
                    "Clinical and aesthetic dermatologist known for expertise in acne management, chronic eczema, laser skin therapy, and holistic dermatological health.",
                    "Tue, Thu, Sat",
                    "Dermatology Clinic, Floor 2, Room 210",
                    "+91 98765 43211",
                    "priya.mehta@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Arjun Patel",
                    "Neurologist",
                    4.9,
                    15,
                    "Available Today",
                    1200.0,
                    "Distinguished neuro specialist focusing on migraine treatment, epilepsy management, stroke rehabilitation, and peripheral nerve disorders. Fellow of American Academy of Neurology.",
                    "Mon, Tue, Thu",
                    "Neuroscience Center, Floor 4, Suite 405",
                    "+91 98765 43212",
                    "arjun.patel@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Sarah Jenkins",
                    "Pediatrician",
                    4.9,
                    11,
                    "Available Today",
                    600.0,
                    "Compassionate child specialist providing complete pediatric wellness checks, developmental screenings, childhood vaccination schedules, and adolescent health management.",
                    "Mon - Fri",
                    "Pediatric Wing, Floor 1, Suite 104",
                    "+91 98765 43213",
                    "sarah.jenkins@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Marcus Chen",
                    "Orthopedic Surgeon",
                    4.7,
                    14,
                    "Available Today",
                    1000.0,
                    "Orthopedic expert specializing in joint replacements, sports injuries, arthroscopic surgeries, and spine care with personalized physical rehabilitation plans.",
                    "Mon, Wed, Sat",
                    "Orthopedic Pavilion, Floor 2, Suite 220",
                    "+91 98765 43214",
                    "marcus.chen@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Ananya Rao",
                    "General Physician",
                    4.8,
                    8,
                    "Available Today",
                    500.0,
                    "Primary care physician dedicated to comprehensive preventive medicine, chronic disease management (diabetes & hypertension), and full family healthcare.",
                    "Mon - Sat",
                    "Outpatient Department, Floor 1, Room 101",
                    "+91 98765 43215",
                    "ananya.rao@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. David Kim",
                    "Psychiatrist",
                    4.9,
                    13,
                    "Available Today",
                    900.0,
                    "Board-certified mental health specialist offering empathetic psychiatric assessment, stress management, anxiety and mood disorder therapy, and cognitive counseling.",
                    "Tue, Wed, Fri",
                    "Behavioral Health Wing, Floor 3, Suite 315",
                    "+91 98765 43216",
                    "david.kim@caresync.com"
            ));

            doctorService.saveDoctor(new Doctor(
                    "Dr. Elena Rostova",
                    "Ophthalmologist",
                    4.8,
                    10,
                    "Available Tomorrow",
                    750.0,
                    "Eye care specialist proficient in comprehensive vision evaluations, diabetic retinopathy screening, cataract consultation, and corrective refractive procedures.",
                    "Wed, Thu, Fri",
                    "Eye Care Clinic, Floor 2, Room 205",
                    "+91 98765 43217",
                    "elena.rostova@caresync.com"
            ));
        };
    }
}
