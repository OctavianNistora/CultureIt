package com.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
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

    @ManyToMany
    @JoinTable(
            name = "wishlist",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> wishers;

    @ManyToMany
    @JoinTable(
            name = "event_visitors_mapping",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> visitors;
}
