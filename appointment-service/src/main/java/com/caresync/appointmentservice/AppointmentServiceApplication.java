package com.caresync.appointmentservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AppointmentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppointmentServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner loadInitialAppointments(AppointmentService appointmentService) {
        return args -> {
            appointmentService.saveAppointment(new Appointment(
                    "CS-2041",
                    "Priya Sharma",
                    "priya@example.com",
                    "+1 (555) 987-6543",
                    29,
                    "Female",
                    "Dr. Rahul Sharma",
                    "Cardiologist",
                    "2026-11-15",
                    "10:00 AM",
                    "In-Person",
                    "Routine cardiovascular checkup and ECG consultation",
                    "CONFIRMED",
                    800.0
            ));

            appointmentService.saveAppointment(new Appointment(
                    "CS-2042",
                    "Alex Morgan",
                    "alex@example.com",
                    "+91 98765 43220",
                    34,
                    "Non-binary",
                    "Dr. Priya Mehta",
                    "Dermatologist",
                    "2026-11-18",
                    "02:00 PM",
                    "Video Consultation",
                    "Follow-up consultation for skin rash treatment",
                    "CONFIRMED",
                    700.0
            ));

            appointmentService.saveAppointment(new Appointment(
                    "CS-1980",
                    "Priya Sharma",
                    "priya@example.com",
                    "+91 98765 43221",
                    29,
                    "Female",
                    "Dr. Ananya Rao",
                    "General Physician",
                    "2026-10-20",
                    "11:00 AM",
                    "In-Person",
                    "Annual comprehensive wellness screening",
                    "COMPLETED",
                    500.0
            ));
        };
    }
}
