package com.example.backend.controllers;

import com.example.backend.dtos.*;
import com.example.backend.services.EventService;
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
    private final EventService eventService;

    public EventController(EventService eventService)
    {
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
        eventService.addNewEvent(event, userDetails.getUsername());
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
        List<MapPointDTO> mapPoints = eventService.getMapPoints(longitudeAfter, longitudeBefore, latitudeAfter, latitudeBefore, page);
        return new ResponseEntity<>(mapPoints, HttpStatus.OK);
    }

    @Operation(summary = "Get event summary")
    @ApiResponse(responseCode = "200", description = "Event summary retrieved",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EventSummaryDTO.class))})
    @ApiResponse(responseCode = "400", description = "Invalid event ID",
            content = @Content)
    @ApiResponse(responseCode = "401", description = "Unauthorized",
            content = @Content)
    @GetMapping("/{eventId}/summary")
    public ResponseEntity<EventSummaryDTO> getEventSummary(@AuthenticationPrincipal UserDetails userDetails, @PathVariable int eventId)
    {
        EventSummaryDTO eventSummary = eventService.getEventSummary(eventId, userDetails.getUsername());
        return new ResponseEntity<>(eventSummary, HttpStatus.OK);
    }

    @Operation(summary = "Get event details")
    @ApiResponse(responseCode = "200", description = "Event details retrieved",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = EventDetailsDTO.class))})
    @ApiResponse(responseCode = "400", description = "Invalid event ID",
            content = @Content)
    @ApiResponse(responseCode = "401", description = "Unauthorized",
            content = @Content)
    @GetMapping("/{eventId}/details")
    public ResponseEntity<EventDetailsDTO> getEventDetails(@PathVariable int eventId)
    {
        EventDetailsDTO eventDetails = eventService.getEventDetails(eventId);
        return new ResponseEntity<>(eventDetails, HttpStatus.OK);
    }

    @Operation(summary = "Get trending events")
    @ApiResponse(responseCode = "200", description = "Trending events retrieved",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema =
                    @Schema(implementation = EventTrendingSummaryDTO.class)))})
    @GetMapping("/trending")
    public ResponseEntity<List<EventTrendingSummaryDTO>> getTrendingEvents(@RequestParam(required = false) Integer page)
    {
        List<EventTrendingSummaryDTO> trendingEvents = eventService.getTrendingEvents(page);
        return new ResponseEntity<>(trendingEvents, HttpStatus.OK);
    }
}
