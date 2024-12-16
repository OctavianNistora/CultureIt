package com.example.backend.dtos;

import java.time.LocalDate;

public record UserProfileUpdateDTO(String first_name, String last_name, LocalDate date_of_birth)
{
}
