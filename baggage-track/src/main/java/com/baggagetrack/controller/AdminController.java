package com.baggagetrack.controller;

import com.baggagetrack.dto.AdminStats;
import com.baggagetrack.entity.Baggage;
import com.baggagetrack.entity.BaggageMismatch;
import com.baggagetrack.entity.BaggageStatusHistory;
import com.baggagetrack.entity.Flight;
import com.baggagetrack.entity.Notification;
import com.baggagetrack.entity.User;

import com.baggagetrack.service.AdminStatsService;
import com.baggagetrack.service.BaggageMismatchService;
import com.baggagetrack.service.BaggageService;
import com.baggagetrack.service.BaggageStatusHistoryService;
import com.baggagetrack.service.FlightService;
import com.baggagetrack.service.NotificationService;
import com.baggagetrack.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final FlightService flightService;
    private final BaggageService baggageService;
    private final BaggageStatusHistoryService historyService;
    private final NotificationService notificationService;
    private final AdminStatsService adminStatsService;
    private final BaggageMismatchService baggageMismatchService;

    public AdminController(
            UserService userService,
            FlightService flightService,
            BaggageService baggageService,
            BaggageStatusHistoryService historyService,
            NotificationService notificationService,
            AdminStatsService adminStatsService,
            BaggageMismatchService baggageMismatchService) {

        this.userService = userService;
        this.flightService = flightService;
        this.baggageService = baggageService;
        this.historyService = historyService;
        this.notificationService = notificationService;
        this.adminStatsService = adminStatsService;
        this.baggageMismatchService = baggageMismatchService;
    }


    // =====================================================
    // USER MANAGEMENT
    // =====================================================

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }


    // ADMIN CAN CREATE PASSENGER / STAFF / ADMIN
    @PostMapping("/users")
    public ResponseEntity<?> createUser(
            @RequestBody User user) {

        // -----------------------------------------
        // Validate Name
        // -----------------------------------------

        if (user.getName() == null ||
                user.getName().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Name is required");
        }


        // -----------------------------------------
        // Validate Email
        // -----------------------------------------

        if (user.getEmail() == null ||
                user.getEmail().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }


        // -----------------------------------------
        // Validate Password
        // -----------------------------------------

        if (user.getPassword() == null ||
                user.getPassword().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Password is required");
        }


        // -----------------------------------------
        // Role
        // -----------------------------------------

        String role = user.getRole();

        if (role == null ||
                role.isBlank()) {

            role = "PASSENGER";

        } else {

            role = role.toUpperCase();
        }


        // -----------------------------------------
        // Validate Role
        // -----------------------------------------

        if (!role.equals("PASSENGER") &&
                !role.equals("STAFF") &&
                !role.equals("ADMIN")) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Role must be PASSENGER, STAFF, or ADMIN"
                    );
        }


        // Set normalized role
        user.setRole(role);


        // -----------------------------------------
        // Create User
        // -----------------------------------------

        try {

            User savedUser =
                    userService.registerUser(user);

            return ResponseEntity.ok(savedUser);

        } catch (Exception error) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Unable to create user. " +
                            "Email may already exist."
                    );
        }
    }


    // Delete user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }


    // =====================================================
    // FLIGHT MANAGEMENT
    // =====================================================

    // Get all flights
    @GetMapping("/flights")
    public ResponseEntity<List<Flight>> getAllFlights() {

        return ResponseEntity.ok(
                flightService.getAllFlights()
        );
    }


    // Add flight
    @PostMapping("/flights")
    public ResponseEntity<Flight> addFlight(
            @RequestBody Flight flight) {

        return ResponseEntity.ok(
                flightService.addFlight(flight)
        );
    }


    // Delete flight
    @DeleteMapping("/flights/{id}")
    public ResponseEntity<String> deleteFlight(
            @PathVariable Long id) {

        flightService.deleteFlight(id);

        return ResponseEntity.ok(
                "Flight deleted successfully"
        );
    }


    // =====================================================
    // BAGGAGE MANAGEMENT
    // =====================================================

    // Get all baggage
    @GetMapping("/baggage")
    public ResponseEntity<List<Baggage>> getAllBaggage() {

        return ResponseEntity.ok(
                baggageService.getAllBaggage()
        );
    }


    // Delete baggage
    @DeleteMapping("/baggage/{id}")
    public ResponseEntity<String> deleteBaggage(
            @PathVariable Long id) {

        baggageService.deleteBaggage(id);

        return ResponseEntity.ok(
                "Baggage deleted successfully"
        );
    }


    // =====================================================
    // BAGGAGE HISTORY
    // =====================================================

    @GetMapping("/baggage-history")
    public ResponseEntity<List<BaggageStatusHistory>> getAllHistory() {

        return ResponseEntity.ok(
                historyService.getAllHistory()
        );
    }


    // =====================================================
    // BAGGAGE MISMATCHES
    // =====================================================

    @GetMapping("/mismatches")
    public ResponseEntity<List<BaggageMismatch>> getAllMismatches() {

        return ResponseEntity.ok(
                baggageMismatchService.getAllMismatches()
        );
    }


    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getAllNotifications() {

        return ResponseEntity.ok(
                notificationService.getAllNotifications()
        );
    }


    // =====================================================
    // ADMIN STATISTICS
    // =====================================================

    @GetMapping("/statistics")
    public ResponseEntity<AdminStats> getStatistics() {

        return ResponseEntity.ok(
                adminStatsService.getStatistics()
        );
    }
}