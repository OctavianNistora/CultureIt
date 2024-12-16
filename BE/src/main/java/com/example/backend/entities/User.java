package com.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="users", indexes = {
        @Index(name = "email_index", columnList = "email", unique = true)
})
public class User {
    @Id
    @SequenceGenerator(
            name = "users_sequence",
            sequenceName = "users_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "users_sequence"
    )
    private int id;
    @Column(unique = true)
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    private String first_name;
    private String last_name;
    @Column(columnDefinition = "DATE")
    private LocalDate date_of_birth;
    @NotNull
    private Boolean is_publisher;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private Set<Event> events_wishlist = new HashSet<>();
    @ManyToMany(mappedBy = "visitors")
    private Set<Event> events_visited = new HashSet<>();

    public User(String email, String password, String first_name, String last_name, LocalDate date_of_birth) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.is_publisher = false;
    }

    public User() {
        this.id = 0;
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
