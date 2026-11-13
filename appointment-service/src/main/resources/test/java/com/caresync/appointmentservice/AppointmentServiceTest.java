package com.caresync.appointmentservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppointmentServiceTest {

    @Autowired
    private AppointmentService appointmentService;

    @Test
    void contextLoadsAndAppointmentsExist() {
        assertNotNull(appointmentService);
        assertFalse(appointmentService.getAllAppointments().isEmpty());
    }
}
