package com.example.backend.services;

import com.example.backend.dtos.*;
import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService
{
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository)
    {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void addNewEvent(EventCreationDTO eventCreationDTO, String currentUserEmail)
    {
        User user = userRepository.findByEmail(currentUserEmail);
        if (user == null)
        {
            throw new RuntimeException("Authenticated user not found");
        }

        Event event = new Event(eventCreationDTO.title(),
                                user,
                                eventCreationDTO.description(),
                                eventCreationDTO.category(),
                                eventCreationDTO.location(),
                                eventCreationDTO.latitude(),
                                eventCreationDTO.longitude(),
                                eventCreationDTO.start_date(),
                                eventCreationDTO.end_date(),
                                eventCreationDTO.start_time(),
                                eventCreationDTO.end_time(),
                                eventCreationDTO.price());

        eventRepository.save(event);
    }

    public List<MapPointDTO> getMapPoints(Double longitudeAfter, Double longitudeBefore, Double latitudeAfter, Double latitudeBefore, Integer page)
    {
        Pageable pageable;
        if (page != null)
        {
            pageable = PageRequest.ofSize(20).withPage(page);
        }
        else
        {
            long recordCount = eventRepository.count();
            if (recordCount == 0)
            {
                return List.of();
            }

            pageable = PageRequest.of(0, (int) recordCount);
        }

        List<Event> events = eventRepository.findByEventsWithinArea(longitudeAfter, longitudeBefore, latitudeAfter, latitudeBefore, pageable);

        return events.stream().map(event -> new MapPointDTO(event.getId(), event.getLatitude(), event.getLongitude())).toList();
    }

    public EventSummaryDTO getEventSummary(int eventId, String email)
    {
        Event event = eventRepository.findById(eventId).orElseThrow();
        Boolean isWishlisted = eventRepository.existsWisher(eventId, email);

        return new EventSummaryDTO(
                event.getMain_image() != null ? event.getMain_image().getPhoto_url() : null,
                event.getTitle(),
                event.getLocation(),
                event.getStart_date(),
                event.getEnd_date(),
                event.getStart_time(),
                event.getEnd_time(),
                event.getPrice(),
                isWishlisted
        );
    }

    public EventDetailsDTO getEventDetails(int eventId)
    {
        Event event = eventRepository.findById(eventId).orElseThrow();
        Integer visitorCount = eventRepository.countVisitors(eventId);
        List<String> photos = eventRepository.getNewestTwoPhotos(eventId);

        return new EventDetailsDTO(
                event.getDescription(),
                event.getCreated_by().getFirst_name() + " " + event.getCreated_by().getLast_name(),
                visitorCount,
                photos
        );
    }

    public List<EventTrendingSummaryDTO> getTrendingEvents(Integer page)
    {
        Pageable pageable;
        if (page != null)
        {
            pageable = PageRequest.ofSize(10).withPage(page);
        }
        else
        {
            long recordCount = eventRepository.count();
            if (recordCount == 0)
            {
                return List.of();
            }

            pageable = PageRequest.of(0, (int) recordCount);
        }

        List<Event> events = eventRepository.findTrendingEvents(pageable);

        System.out.println(events.size());

        return events.stream()
                .map(event -> new EventTrendingSummaryDTO(
                        event.getId(),
                        event.getMain_image() != null ? event.getMain_image().getPhoto_url() : null,
                        event.getTitle())
                ).toList();
    }
}
