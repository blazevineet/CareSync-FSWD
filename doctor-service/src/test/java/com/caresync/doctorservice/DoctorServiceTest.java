package com.caresync.doctorservice;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DoctorServiceTest {

    @Autowired
    private DoctorService doctorService;

    @Test
    void startupLoadsSampleDoctors() {
        assertTrue(doctorService.getAllDoctors().size() >= 3);
    }

    @Test
    void saveDoctor_assignsGeneratedId() {
        Doctor saved = doctorService.saveDoctor(new Doctor(
                "Dr. Test Doctor", "General Physician", 4.5, 5, "Available Today"));
        assertNotNull(saved.getId());
    }
}
