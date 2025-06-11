package com.example.eventRegistrationApp.controllers;


import com.example.eventRegistrationApp.entity.AuthResponse;
import com.example.eventRegistrationApp.entity.User;
import com.example.eventRegistrationApp.repository.UserRepository;
import com.example.eventRegistrationApp.service.CustomUserDetailsService;
import com.example.eventRegistrationApp.service.UserService;
import com.example.eventRegistrationApp.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/check")
    public ResponseEntity<?> check(){
        return new ResponseEntity<>("Endpoints are working", HttpStatus.OK);
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody User user){
        User saved = userService.saveUser(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());

            String role = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("ROLE_USER");

            String jwt = jwtUtil.generateToken(userDetails.getUsername(), role);

            AuthResponse authResponse = new AuthResponse(jwt, role);
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Incorrect Username or Password", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        user.setRole(User.Role.ADMIN); // Force role to ADMIN
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User admin = userService.saveUserDetails(user);
        return new ResponseEntity<>(admin,HttpStatus.CREATED);
    }



}
