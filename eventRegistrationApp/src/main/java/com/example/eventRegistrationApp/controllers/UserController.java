package com.example.eventRegistrationApp.controllers;


import com.example.eventRegistrationApp.entity.User;
import com.example.eventRegistrationApp.repository.UserRepository;
import com.example.eventRegistrationApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userService.findUserByEmail(email);

        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User updatedUser) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User userInDB = userService.findUserByEmail(email);

        if (userInDB == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        // Update fields (firstName, lastName, etc.)
        userInDB.setFirstName(updatedUser.getFirstName());
        if (updatedUser.getLastName() != null) {
            userInDB.setLastName(updatedUser.getLastName());
        }
        // Handle password update ONLY if provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(updatedUser.getPassword());
            userInDB.setPassword(hashedPassword);
        }

        // Use the new method to save without re-hashing
        userService.saveUserDetails(userInDB);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        try{
            userRepository.deleteUserByEmail(email); // No boolean check needed
            SecurityContextHolder.clearContext();
            return new ResponseEntity<>(email+" Has been deleted successfully",HttpStatus.OK);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }



//        return new ResponseEntity<>("Unable to delete",HttpStatus.BAD_REQUEST);
    }



}
