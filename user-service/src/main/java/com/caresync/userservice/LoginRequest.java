package com.caresync.userservice;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email and password are required.")
        String email,

        @NotBlank(message = "Email and password are required.")
        String password) {
}
