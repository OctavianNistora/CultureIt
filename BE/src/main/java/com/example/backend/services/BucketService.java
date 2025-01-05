package com.example.backend.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.example.backend.entities.Event;
import com.example.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
public class BucketService
{
    private final EventRepository eventRepository;
    private final AmazonS3 s3Client;

    @Value("${s3.bucket.name}")
    private String bucketName;

    @Value("${s3.bukcet.public.url}")
    private String bucketPublicUrl;

    public BucketService(EventRepository eventRepository, AmazonS3 s3Client)
    {
        this.eventRepository = eventRepository;
        this.s3Client = s3Client;
    }

    public void uploadFile(int eventId, MultipartFile file, String userEmail) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        if (!event.getCreated_by().getEmail().equals(userEmail)) {
            throw new RuntimeException("User is not the owner of the event");
        }

        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        //noinspection ResultOfMethodCallIgnored
        fileObj.delete();

        if (event.getMain_image_url() != null)
        {
            s3Client.deleteObject(new DeleteObjectRequest(bucketName, event.getMain_image_url().substring(event.getMain_image_url().lastIndexOf("/") + 1)));
        }

        event.setMain_image_url(bucketPublicUrl + "/" + fileName);
        eventRepository.save(event);
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}