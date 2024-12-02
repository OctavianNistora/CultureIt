package com.example.backend.repositories;

import com.example.backend.entities.EventPhoto;
import com.example.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventPhotoRepository extends JpaRepository<EventPhoto, Integer>
{
    EventPhoto findById(int id);
}