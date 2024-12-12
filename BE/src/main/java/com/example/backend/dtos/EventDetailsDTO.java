package com.example.backend.dtos;

import java.util.List;

public record EventDetailsDTO(String description, String createbBy, Integer visitors, List<String> images)
{
}
