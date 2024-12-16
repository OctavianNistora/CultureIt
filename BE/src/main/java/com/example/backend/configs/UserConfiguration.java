package com.example.backend.configs;

import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Configuration
public class UserConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, EventRepository eventRepository) {
        return args -> {
            User User1 =  new User(
                    "user1@example.com", passwordEncoder.encode("password123"), "John",
                    "Doe", LocalDate.of(1983, 6, 27)

            );

            User User2 =  new User(
                    "user2@example.com", passwordEncoder.encode("password321"), "Jane",
                    "Roe", LocalDate.of(1987, 7, 2)
            );

            userRepository.saveAll(
                    List.of(User1, User2)
            );

            Event event1 = new Event(
                    "Event 1", User1, "Event 1 description", "Event 1 category",
                    "Event 1 location", 45.7552003, 21.2272141, LocalDate.of(2022, 1, 1),
                    LocalDate.of(2022, 1, 2), LocalTime.of(10, 0), LocalTime.of(12, 0), 10.5
            );

            Event event2 = new Event(
                    "Event 2", User2, "Event 2 description", "Event 2 category",
                    "Event 2 location", 45.7539753, 21.2258655, LocalDate.of(2022, 2, 1),
                    LocalDate.of(2022, 2, 2), LocalTime.of(10, 0), LocalTime.of(12, 0), 0.0
            );

            eventRepository.saveAll(
                    List.of(event1, event2)
            );

        };
    }
}