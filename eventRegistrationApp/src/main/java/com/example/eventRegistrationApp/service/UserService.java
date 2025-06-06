package com.example.eventRegistrationApp.service;
import com.example.eventRegistrationApp.entity.User;
import com.example.eventRegistrationApp.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User user){
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException(e);

        }

    }

    //This method used when you want to update the details of the user.
    public User saveUserDetails(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save user details", e);
        }
    }


    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User findUserByEmail(String email){
            return userRepository.findUserByEmail(email);
    }

    public User getUserById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            return userRepository.findById(objectId).orElse(null);
        } catch (IllegalArgumentException e) {
            return null; // Invalid ObjectId string
        }
    }

    public boolean deleteUserById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            if (userRepository.existsById(objectId)) {
                userRepository.deleteById(objectId);
                return true;
            }
        } catch (IllegalArgumentException e) {
            // invalid ObjectId format
        }
        return false;
    }


}
