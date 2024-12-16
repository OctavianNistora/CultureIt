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
           "WHERE (:longitudeAfter IS NULL OR e.longitude > :longitudeAfter) " +
           "AND (:longitudeBefore IS NULL OR e.longitude < :longitudeBefore) " +
           "AND (:latitudeAfter IS NULL OR e.latitude > :latitudeAfter) " +
           "AND (:latitudeBefore IS NULL OR e.latitude < :latitudeBefore) " +
           "AND e.end_date >= CURRENT_DATE "
    )
    List<Event> findByEventsWithinArea(Double longitudeAfter, Double longitudeBefore,
                                       Double latitudeAfter, Double latitudeBefore,
                                       Pageable pageable);


    @Query("SELECT CASE WHEN EXISTS(" +
           "SELECT e " +
           "FROM Event e " +
           "JOIN e.wishers w " +
           "WHERE e.id = :eventId AND w.email = :userEmail" +
           ") THEN TRUE ELSE FALSE END"
    )
    Boolean existsWisher(Integer eventId, String userEmail);

    @Query("SELECT COUNT(e) " +
           "FROM Event e " +
           "JOIN e.visitors v " +
           "WHERE e.id = :eventId"
    )
    Integer countVisitors(Integer eventId);


    @Query("SELECT p.photo_url " +
           "FROM Event e " +
           "JOIN e.photos p " +
           "WHERE e.id = :eventId " +
           "ORDER BY p.id DESC " +
           "LIMIT 2"
    )
    List<String> getNewestTwoPhotos(Integer eventId);

    @Query("SELECT e " +
           "FROM Event e " +
           "LEFT JOIN e.wishers w " +
           "WHERE e.end_date >= CURRENT_DATE " +
           "GROUP BY e " +
           "ORDER BY COUNT(w) DESC"
    )
    List<Event> findTrendingEvents(Pageable pageable);
}
