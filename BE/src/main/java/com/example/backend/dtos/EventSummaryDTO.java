package com.example.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventSummaryDTO(String mainImage,String name, String location, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, Double price, Boolean isWishlisted)
{
}
