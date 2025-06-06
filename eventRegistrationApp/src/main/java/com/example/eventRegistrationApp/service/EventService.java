package com.example.eventRegistrationApp.service;

import com.example.eventRegistrationApp.entity.Event;
import com.example.eventRegistrationApp.repository.EventRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    public Event createEvent(Event event){
        return eventRepository.save(event);
    }

    public boolean deleteEvent(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            if (eventRepository.existsById(objectId)) {
                eventRepository.deleteById(objectId);
                return true;
            } else {
                return false;
            }
        } catch (IllegalArgumentException e) {
            // If id is not a valid ObjectId
            return false;
        }
    }

    // Update Event by ObjectId
    public Event updateEvent(String id, Event updatedEvent) {
        try {
            ObjectId objectId = new ObjectId(id);
            Optional<Event> optionalEvent = eventRepository.findById(objectId);
            if (optionalEvent.isPresent()) {
                Event eventInDB = optionalEvent.get();
                eventInDB.setEventName(updatedEvent.getEventName());
                eventInDB.setLocation(updatedEvent.getLocation());
                eventInDB.setDate(updatedEvent.getDate());
                eventInDB.setMaxParticipants(updatedEvent.getMaxParticipants());
                return eventRepository.save(eventInDB);
            } else {
                return null;
            }
        } catch (IllegalArgumentException e) {
            // If id is not a valid ObjectId
            return null;
        }
    }
    public List<Event> getEventsByLocation(String location) {
        return eventRepository.findByLocationIgnoreCase(location);
    }

    public List<Event> searchEvents(String query) {
        return eventRepository.findByEventNameContainingIgnoreCaseOrLocationContainingIgnoreCase(query, query);
    }

}
