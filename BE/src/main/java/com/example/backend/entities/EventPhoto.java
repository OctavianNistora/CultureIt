package com.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="event_photos")
public class EventPhoto
{
    @Id
    @SequenceGenerator(
            name = "event_photos_sequence",
            sequenceName = "event_photos_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "event_photos_sequence"
    )
    private int id;
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    @NotBlank
    private String photo_url;
}
