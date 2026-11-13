package com.caresync.appointmentservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS
})
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAppointments(@RequestParam(required = false) String email) {
        if (email != null && !email.trim().isEmpty()) {
            return appointmentService.getAppointmentsByPatientEmail(email);
        }
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        Appointment saved = appointmentService.saveAppointment(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required"));
        }
        return appointmentService.updateStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<?> reschedule(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String newDate = payload.get("date");
        String newTime = payload.get("time");
        if (newDate == null || newTime == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Date and time are required"));
        }
        return appointmentService.reschedule(id, newDate, newTime)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        if (appointmentService.deleteAppointment(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<Appointment> all = appointmentService.getAllAppointments();
        long confirmed = all.stream().filter(a -> "CONFIRMED".equalsIgnoreCase(a.getStatus())).count();
        long completed = all.stream().filter(a -> "COMPLETED".equalsIgnoreCase(a.getStatus())).count();
        long cancelled = all.stream().filter(a -> "CANCELLED".equalsIgnoreCase(a.getStatus())).count();
        double totalRevenue = all.stream().mapToDouble(Appointment::getFee).sum();

        return Map.of(
                "totalAppointments", all.size(),
                "confirmed", confirmed,
                "completed", completed,
                "cancelled", cancelled,
                "totalRevenue", totalRevenue
        );
    }
}
