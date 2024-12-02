package com.example.backend.services;

import com.example.backend.dtos.EventCreationDTO;
import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class EventService
{
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository)
    {
        this.eventRepository = eventRepository;
    }

    public Event addNewEvent(EventCreationDTO eventCreationDTO, User user)
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
        return eventRepository.save(event);
    }

    public List<Event> getEvents(Event event)
    {
        return eventRepository.findAll(Example.of(event));
    }
}
