package com.example.backend.services;

import com.example.backend.dtos.*;
import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, EventRepository eventRepository)
    {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }


    public User addNewUser(UserCreationDTO user)
    {
        User newUser = new User(user.email(), passwordEncoder.encode(user.password()), user.first_name(), user.last_name(), user.date_of_birth());
        try
        {
            return userRepository.save(newUser);
        } catch (Exception e)
        {
            return null;
        }

    }

    public UserProfileDTO getUserProfile(int id, String currentUserEmail)
    {
        User user = userRepository.findById(id).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        return new UserProfileDTO(
                user.getEmail(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getDate_of_birth()
        );
    }

    public void updateUser(int id, UserProfileUpdateDTO updateData, String currentUserEmail)
    {
        User user = userRepository.findById(id).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        user.setFirst_name(updateData.first_name());
        user.setLast_name(updateData.last_name());
        user.setDate_of_birth(updateData.date_of_birth());

        userRepository.save(user);
    }

    public void deleteUser(int id)
    {
        userRepository.deleteById(id);
    }

    @Transactional
    public void addEventToWishlist(int userId, int eventId, String currentUserEmail)
    {
        User user = userRepository.findById(userId).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        Event event = eventRepository.findById(eventId).orElseThrow();

        user.getEvents_wishlist().add(event);

        userRepository.save(user);
    }

    public List<EventWishlistedItemDTO> getWishlist(int userId, String currentUserEmail)
    {
        User user = userRepository.findById(userId).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        List<Event> wishlist = userRepository.getWishListedEvents(userId);
        System.out.println(wishlist.size());

        return wishlist.stream()
                .map(event -> new EventWishlistedItemDTO(
                        event.getId(),
                        event.getMain_image() != null ? event.getMain_image().getPhoto_url() : null,
                        event.getTitle(),
                        event.getLocation(),
                        event.getStart_date().toString(),
                        event.getEnd_date().toString())
                ).toList();
    }

    @Transactional
    public void removeEventFromWishlist(int userId, int eventId, String currentUserEmail)
    {
        User user = userRepository.findById(userId).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        Event event = eventRepository.findById(eventId).orElseThrow();

        user.getEvents_wishlist().remove(event);

        userRepository.save(user);
    }

    public void changeUserRole(int id, String role, String currentUserEmail)
    {
        User user = userRepository.findById(id).orElseThrow();
        if (!user.getEmail().equals(currentUserEmail))
        {
            throw new RuntimeException("Referenced user is not the same as the authenticated user");
        }

        switch (role)
        {
            case "publisher":
                user.setIs_publisher(true);
                break;
            case "user":
                user.setIs_publisher(false);
                break;
            default:
                throw new RuntimeException("Invalid role");
        }

        userRepository.save(user);
    }
}
