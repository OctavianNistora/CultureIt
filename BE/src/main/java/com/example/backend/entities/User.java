package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="user_info")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private int id;
    private String username;
    private String email;
    private String password;
    private String first_name;
    private String last_name;
    private LocalDate date_of_birth;
    private Boolean is_publisher;

    public User(String username, String email, String password, String first_name, String last_name, LocalDate date_of_birth) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.is_publisher = false;
    }

    public User() {
        this.id = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.first_name = "";
        this.last_name = "";
        this.date_of_birth = LocalDate.now();
        this.is_publisher = false;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", date_of_birth=" + date_of_birth +
                ", is_publisher=" + is_publisher +
                '}';
    }
}
