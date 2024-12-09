package com.example.backend.services;

import com.example.backend.dtos.EventCreationDTO;
import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService
{
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository)
    {
        this.eventRepository = eventRepository;
    }

    public void addNewEvent(EventCreationDTO eventCreationDTO, User user)
    {
        Event event = new Event();
        event.setTitle(eventCreationDTO.title());
        event.setCreated_by(user);
        event.setDescription(eventCreationDTO.description());
        event.setCategory(eventCreationDTO.category());
        event.setLocation(eventCreationDTO.location());
        event.setLatitude(eventCreationDTO.latitude());
        event.setLongitude(eventCreationDTO.longitude());
        event.setStart_date(eventCreationDTO.start_date());
        event.setEnd_date(eventCreationDTO.end_date());
        event.setStart_time(eventCreationDTO.start_time());
        event.setEnd_time(eventCreationDTO.end_time());
        event.setPrice(eventCreationDTO.price());
        eventRepository.save(event);
    }

    public List<Event> getEvents(Double longitudeAfter, Double longitudeBefore, Double latitudeAfter, Double latitudeBefore, Integer page)
    {
        Pageable pageable;
        if (page != null)
        {
            pageable = PageRequest.ofSize(20).withPage(page);
        }
        else
        {
            pageable = PageRequest.of(0, 1);
        }
        return eventRepository.findByEventsWithinArea(longitudeAfter, longitudeBefore, latitudeAfter, latitudeBefore, pageable);
    }
}
