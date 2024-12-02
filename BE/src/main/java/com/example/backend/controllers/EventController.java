package com.example.backend.controllers;

import com.example.backend.dtos.EventCreationDTO;
import com.example.backend.entities.User;
import com.example.backend.services.EventService;
import com.example.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "v1/events")
@SecurityRequirement(name = "Bearer Authentication")
public class EventController
{
    private final UserService userService;
    private final EventService eventService;

    public EventController(UserService userService, EventService eventService)
    {
        this.userService = userService;
        this.eventService = eventService;
    }

    @Operation(summary = "Create a new event")
    @ApiResponse(responseCode = "201", description = "Event created",
            content = @Content)
    @ApiResponse(responseCode = "400", description = "Invalid event format",
            content = @Content)
    @ApiResponse(responseCode = "401", description = "Unauthorized",
            content = @Content)
    @PostMapping
    public void createEvent(@AuthenticationPrincipal UserDetails userDetails, @RequestBody EventCreationDTO event)
    {
        User user = userService.getUserByEmail(userDetails.getUsername());
        eventService.addNewEvent(event, user);
    }
}
