package com.example.eventRegistrationApp.repository;

import com.example.eventRegistrationApp.entity.Event;
import com.example.eventRegistrationApp.entity.Registrations;
import com.example.eventRegistrationApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationsRepository extends MongoRepository<Registrations, ObjectId> {
    boolean existsByUserAndEvent(User user, Event event);
    List<Registrations> findByUser(User user);

    Optional<Registrations> findById(ObjectId id);


    Optional<Registrations> findByUserAndEvent(User user, Event event);

    List<Registrations> findByStatus(Registrations.Status status);
}
