package com.example.backend.dtos;

import java.time.LocalDate;

public record UserCreationDTO(String username, String email, String password, String first_name, String last_name, LocalDate date_of_birth) {
}
