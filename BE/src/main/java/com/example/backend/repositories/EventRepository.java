package com.example.backend.repositories;

import com.example.backend.entities.Event;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer>
{
    @Query("SELECT e " +
           "FROM Event e " +
           "WHERE (:longitudeAfter IS NULL OR e.longitude > :longitudeAfter)" +
           "AND (:longitudeBefore IS NULL OR e.longitude < :longitudeBefore)" +
           "AND (:latitudeAfter IS NULL OR e.latitude > :latitudeAfter)" +
           "AND (:latitudeBefore IS NULL OR e.latitude < :latitudeBefore)")
    List<Event> findByEventsWithinArea(Double longitudeAfter, Double longitudeBefore,
                                       Double latitudeAfter, Double latitudeBefore,
                                       Pageable pageable);
}
