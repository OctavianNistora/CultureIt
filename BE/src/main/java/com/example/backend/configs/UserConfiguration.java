package com.example.backend.configs;

import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class UserConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User User1 =  new User(
                    "user1@example.com", passwordEncoder.encode("password123"), "John",
                    "Doe", LocalDate.of(1983, 6, 27)

            );

            System.out.println(passwordEncoder.encode("password123"));

            User User2 =  new User(
                    "user2@example.com", passwordEncoder.encode("password321"), "Jane",
                    "Roe", LocalDate.of(1987, 7, 2)
            );

            userRepository.saveAll(
                    List.of(User1, User2)
            );
        };
    }
}