package com.example.backend.dtos;

public record AuthDTO(String token, int userId, String role)
{
}
