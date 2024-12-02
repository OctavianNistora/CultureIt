package com.example.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventCreationDTO(String title, String description, String category, String location, Double latitude, Double longitude, LocalDate start_date, LocalDate end_date, LocalTime start_time, LocalTime end_time, Double price) {
}
