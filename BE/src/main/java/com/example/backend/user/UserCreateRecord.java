package com.example.backend.user;

import java.time.LocalDate;

public record UserCreateRecord(String email, String password, String first_name, String last_name, LocalDate date_of_birth, Boolean is_publisher) {
}
