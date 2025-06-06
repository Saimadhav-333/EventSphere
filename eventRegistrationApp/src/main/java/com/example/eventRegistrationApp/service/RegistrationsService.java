package com.example.eventRegistrationApp.service;

import com.example.eventRegistrationApp.entity.Event;
import com.example.eventRegistrationApp.entity.Registrations;
import com.example.eventRegistrationApp.entity.User;
import com.example.eventRegistrationApp.repository.EventRepository;
import com.example.eventRegistrationApp.repository.RegistrationsRepository;
import com.example.eventRegistrationApp.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationsService {

    @Autowired
    private RegistrationsRepository registrationsRepository;



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Registrations> getAllRegistrations(){
        return registrationsRepository.findAll();
    }


    public Registrations createRegistration(String userEmail, String eventId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(new ObjectId(eventId))
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Check if already registered
        if (registrationsRepository.existsByUserAndEvent(user, event)) {
            throw new RuntimeException("Already registered for this event");
        }

        // Create registration
        Registrations registration = new Registrations();
        registration.setUser(user);
        registration.setEvent(event);

        return registrationsRepository.save(registration);
    }

    public List<Registrations> getRegistrationsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return registrationsRepository.findByUser(user);
    }

    public boolean cancelRegistrationById(String registrationId) {
        try {
            ObjectId regId = new ObjectId(registrationId);
            Optional<Registrations> registrationOpt = registrationsRepository.findById(regId);

            if (registrationOpt.isPresent()) {
                registrationsRepository.deleteById(regId);
                return true;
            }
            return false;
        } catch (IllegalArgumentException e) {
            // Invalid ObjectId format
            return false;
        }
    }

    public Registrations updateRegistrationStatus(String registrationId, Registrations.Status status) {
        ObjectId objectId = new ObjectId(registrationId);
        Optional<Registrations> optionalRegistration = registrationsRepository.findById(objectId);
        if (optionalRegistration.isPresent()) {
            Registrations registration = optionalRegistration.get();
            registration.setStatus(status);
            return registrationsRepository.save(registration);
        } else {
            throw new RuntimeException("Registration not found");
        }
    }

    public List<Registrations> getPendingRegistrations() {
        return registrationsRepository.findByStatus(Registrations.Status.PENDING);
    }




}
