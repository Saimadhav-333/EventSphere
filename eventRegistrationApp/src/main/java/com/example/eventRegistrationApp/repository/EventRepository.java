package com.example.eventRegistrationApp.repository;

import com.example.eventRegistrationApp.entity.Event;
import com.example.eventRegistrationApp.entity.Registrations;
import com.example.eventRegistrationApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event, ObjectId> {

    List<Event> findByLocationIgnoreCase(String location);




    List<Event> findByEventNameContainingIgnoreCaseOrLocationContainingIgnoreCase(String eventName, String location);
}
