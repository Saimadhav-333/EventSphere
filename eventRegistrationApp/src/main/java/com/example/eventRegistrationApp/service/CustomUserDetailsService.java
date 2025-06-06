package com.example.eventRegistrationApp.service;

import com.example.eventRegistrationApp.entity.User;
import com.example.eventRegistrationApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Ensure role is prefixed with "ROLE_" if it is not already
        String role = String.valueOf(user.getRole());  // Assuming getRole() returns a String like "USER" or "ADMIN"
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;  // Ensure that role is prefixed
        }

        // Return Spring Security compatible UserDetails object
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
