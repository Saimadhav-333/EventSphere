package com.example.eventRegistrationApp.repository;

import com.example.eventRegistrationApp.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findByEmail(String email);

    User findUserByEmail(String email);

    User getUserById(String id);


    void deleteUserByEmail(String email);

    boolean existsByEmail(String email);
}
