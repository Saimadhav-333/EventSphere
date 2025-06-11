package com.example.eventRegistrationApp.controllers;


import com.example.eventRegistrationApp.entity.Registrations;
import com.example.eventRegistrationApp.service.RegistrationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {
    @Autowired
    private RegistrationsService registrationService;

    @PostMapping("/{eventId}")
    public ResponseEntity<?> registerForEvent(@PathVariable String eventId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        try {
            Registrations registration = registrationService.createRegistration(email, eventId);
            return new ResponseEntity<>(registration, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{registrationId}")
    public ResponseEntity<?> cancelRegistration(@PathVariable String registrationId) {
        try {
            boolean cancelled = registrationService.cancelRegistrationById(registrationId);
            if (cancelled) {
                return new ResponseEntity<>("Registration cancelled successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Registration not found.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/my-registrations")
    public ResponseEntity<List<Registrations>> getUserRegistrations() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return ResponseEntity.ok(registrationService.getRegistrationsByUser(email));
    }

    @PutMapping("/accept/{registrationId}")
    public ResponseEntity<?> acceptRegistration(@PathVariable String registrationId) {
        try {
            Registrations updated = registrationService.updateRegistrationStatus(registrationId, Registrations.Status.APPROVED);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/reject/{registrationId}")
    public ResponseEntity<?> rejectRegistration(@PathVariable String registrationId) {
        try {
            Registrations updated = registrationService.updateRegistrationStatus(registrationId, Registrations.Status.REJECTED);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
