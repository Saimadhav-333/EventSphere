package com.example.eventRegistrationApp.controllers;

import com.example.eventRegistrationApp.entity.Event;
import com.example.eventRegistrationApp.repository.EventRepository;
import com.example.eventRegistrationApp.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventController  {
    @Autowired
    private EventService eventService;
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents(){
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @GetMapping("/events/filter/location")
    public ResponseEntity<List<Event>> getEventsByLocation(
            @RequestParam String location
    ) {
        return ResponseEntity.ok(eventService.getEventsByLocation(location));
    }

    @GetMapping("/events/search")
    public ResponseEntity<List<Event>> searchEvents(
            @RequestParam String query
    ) {
        return ResponseEntity.ok(eventService.searchEvents(query));
    }

    
}
