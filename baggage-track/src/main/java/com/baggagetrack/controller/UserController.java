package com.baggagetrack.controller;

import com.baggagetrack.dto.UserResponse;
import com.baggagetrack.entity.User;
import com.baggagetrack.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(
            @RequestBody User user) {

        // Every new public registration is automatically a Passenger
        user.setRole("PASSENGER");

        User savedUser =
                userService.registerUser(user);

        return ResponseEntity.ok(
                toUserResponse(savedUser)
        );
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users =
                userService.getAllUsers()
                        .stream()
                        .map(this::toUserResponse)
                        .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id) {

        return userService.getUserById(id)
                .map(user ->
                        ResponseEntity.ok(
                                toUserResponse(user)
                        )
                )
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(
            @PathVariable String email) {

        return userService
                .getUserByEmail(email)
                .map(user ->
                        ResponseEntity.ok(
                                toUserResponse(user)
                        )
                )
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }

    private UserResponse toUserResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole()
        );
    }
}