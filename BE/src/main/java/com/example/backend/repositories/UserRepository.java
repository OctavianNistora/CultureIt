package com.example.backend.repositories;

import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query("SELECT e " +
           "FROM Event e " +
           "JOIN e.wishers w " +
           "WHERE w.id = :userId AND e.end_date >= CURRENT_DATE")
    List<Event> getWishListedEvents(int userId);
}