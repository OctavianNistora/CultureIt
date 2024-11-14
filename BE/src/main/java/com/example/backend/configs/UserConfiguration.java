package com.example.backend.configs;

import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class UserConfiguration {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User User1 =  new User(
                    "user1", "user1@example.com", "password123", "John",
                    "Doe", LocalDate.of(1990, 1, 15)

            );

            User User2 =  new User(
                    "user1", "user2@example.com", "securePass456", "Jane",
                    "Smith", LocalDate.of(1985, 6, 20)
            );

            userRepository.saveAll(
                    List.of(User1, User2)
            );
        };
    }
}