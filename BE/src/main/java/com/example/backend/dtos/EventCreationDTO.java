package com.example.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventCreationDTO(String title, String description, String location, String website_link, Double latitude, Double longitude, LocalDate start_date, LocalDate end_date, LocalTime start_time, LocalTime end_time, Double price) {
}
