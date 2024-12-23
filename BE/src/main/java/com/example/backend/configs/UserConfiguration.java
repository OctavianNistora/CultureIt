package com.example.backend.configs;

import com.example.backend.entities.Event;
import com.example.backend.entities.EventPhoto;
import com.example.backend.entities.User;
import com.example.backend.repositories.EventPhotoRepository;
import com.example.backend.repositories.EventRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Configuration
public class UserConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, EventRepository eventRepository,
                                        EventPhotoRepository eventPhotoRepository) {
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
                    "Cover Me Softly", User1, "Fantastic Art Pieces", "Category 1",
                    "The Garrison of Timișoara", 45.7552003, 21.2272141, LocalDate.of(2022, 1, 1),
                    LocalDate.of(2026, 1, 2), LocalTime.of(10, 0), LocalTime.of(12, 0), 10.5
            );

            Event event2 = new Event(
                    "Multisensorial", User2, "Classical Concert that touches all the senses", "Category 2",
                    "The National Opera of Timișoara", 45.7539753, 21.2258655, LocalDate.of(2022, 2, 1),
                    LocalDate.of(2026, 2, 2), LocalTime.of(10, 0), LocalTime.of(12, 0), 0.0
            );

//            EventPhoto photo1 = new EventPhoto(1, event1, "link");
//            EventPhoto photo2 = new EventPhoto(2, event2, "link2");
//            event1.setPhotos(Set.of(photo1));
//            event2.setPhotos(Set.of(photo2));


            eventRepository.saveAll(
                    List.of(event1, event2)
            );

//            eventPhotoRepository.saveAll(
//                    List.of(photo1, photo2)
//            );

        };
    }
}