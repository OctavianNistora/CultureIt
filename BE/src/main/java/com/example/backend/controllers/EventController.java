package com.example.backend.controllers;

import com.example.backend.dtos.EventCreationDTO;
import com.example.backend.dtos.MapPointDTO;
import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.services.EventService;
import com.example.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void createEvent(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody EventCreationDTO event)
    {
        User user = userService.getUserByEmail(userDetails.getUsername());
        eventService.addNewEvent(event, user);
    }

    @Operation(summary = "Get events")
    @ApiResponse(responseCode = "200", description = "Events retrieved",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema =
                    @Schema(implementation = MapPointDTO.class)))})
    @ApiResponse(responseCode = "400", description = "Invalid query parameters",
            content = @Content)
    @ApiResponse(responseCode = "401", description = "Unauthorized",
            content = @Content)
    @GetMapping("/map-points")
    public ResponseEntity<List<MapPointDTO>> getEvents(@RequestParam(required = false) Double longitudeAfter,
                                                       @RequestParam(required = false) Double longitudeBefore,
                                                       @RequestParam(required = false) Double latitudeAfter,
                                                       @RequestParam(required = false) Double latitudeBefore,
                                                       @RequestParam(required = false) Integer page)
    {
        List<Event> events = eventService.getEvents(longitudeAfter, longitudeBefore, latitudeAfter, latitudeBefore, page);
        List<MapPointDTO> mapPoints = events.stream().map(event -> new MapPointDTO(event.getLatitude(), event.getLongitude())).toList();
        return new ResponseEntity<>(mapPoints, HttpStatus.OK);
    }
}
