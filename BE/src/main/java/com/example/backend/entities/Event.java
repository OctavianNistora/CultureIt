package com.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="events")
public class Event
{
    @Id
    @SequenceGenerator(
            name = "events_sequence",
            sequenceName = "events_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "events_sequence"
    )
    private int id;
    @OneToOne
    @JoinColumn(name = "main_image_id")
    private EventPhoto main_image;
    @NotBlank
    private String title;
    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = false)
    private User created_by;
    private String description;
    private String category;
    @NotBlank
    private String location;
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
    @Column(columnDefinition = "DATE")
    @NotNull
    private LocalDate start_date;
    @Column(columnDefinition = "DATE")
    @NotNull
    private LocalDate end_date;
    @Column(columnDefinition = "TIME")
    @NotNull
    private LocalTime start_time;
    @Column(columnDefinition = "TIME")
    @NotNull
    private LocalTime end_time;
    @Column(columnDefinition ="decimal(8,2) default '0.00'")
    private Double price;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<EventPhoto> photos;

    @ManyToMany(mappedBy = "events_wishlist")
    private Set<User> wishers = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "event_visitors_mapping",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> visitors = new HashSet<>();

    public Event(String title, User created_by, String description, String category, String location, Double latitude, Double longitude, LocalDate start_date, LocalDate end_date, LocalTime start_time, LocalTime end_time, Double price)
    {
        this.title = title;
        this.created_by = created_by;
        this.description = description;
        this.category = category;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.price = price;
    }
}
