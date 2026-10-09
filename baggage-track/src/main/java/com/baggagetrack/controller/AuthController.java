package com.baggagetrack.controller;

import com.baggagetrack.entity.User;
import com.baggagetrack.repository.UserRepository;
import com.baggagetrack.security.JwtService;
import com.baggagetrack.service.UserService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            UserService userService,
            JwtService jwtService) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        if (userRepository
                .findByEmail(user.getEmail())
                .isPresent()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }

        // Public registration can only create PASSENGER accounts
        user.setRole("PASSENGER");

        User savedUser =
                userService.registerUser(user);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Registration successful"
        );

        response.put(
                "userId",
                savedUser.getId()
        );

        response.put(
                "name",
                savedUser.getName()
        );

        response.put(
                "email",
                savedUser.getEmail()
        );

        response.put(
                "role",
                savedUser.getRole()
        );

        return ResponseEntity.ok(response);
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getEmail(),
                        loginUser.getPassword()
                )
        );

        User user =
                userRepository
                        .findByEmail(loginUser.getEmail())
                        .orElseThrow();

        // Generate JWT token
        String token =
                jwtService.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login successful"
        );

        response.put(
                "token",
                token
        );

        response.put(
                "userId",
                user.getId()
        );

        response.put(
                "name",
                user.getName()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "role",
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }
}