package com.example.backend.repositories;

import com.example.backend.entities.Event;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer>
{
    Event findById(int id);
}
