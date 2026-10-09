package com.baggagetrack.controller;

import com.baggagetrack.entity.Baggage;
import com.baggagetrack.repository.UserRepository;
import com.baggagetrack.service.BaggageService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/baggage")
@CrossOrigin(origins = "http://localhost:5173")
public class BaggageController {

    private final BaggageService baggageService;
    private final UserRepository userRepository;

    public BaggageController(
            BaggageService baggageService,
            UserRepository userRepository) {

        this.baggageService = baggageService;
        this.userRepository = userRepository;
    }

    // STAFF and ADMIN can add baggage
    @PostMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<Baggage> addBaggage(
            @RequestBody Baggage baggage) {

        Baggage savedBaggage =
                baggageService.addBaggage(baggage);

        return ResponseEntity.ok(savedBaggage);
    }

    // Logged-in users can view all baggage
    @GetMapping
    public ResponseEntity<List<Baggage>> getAllBaggage() {

        return ResponseEntity.ok(
                baggageService.getAllBaggage()
        );
    }

    // Get baggage belonging to the currently logged-in passenger
    @GetMapping("/my")
    public ResponseEntity<List<Baggage>> getMyBaggage(
            Authentication authentication) {

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .map(user ->
                        ResponseEntity.ok(
                                baggageService.getBaggageByPassengerId(
                                        user.getId()
                                )
                        )
                )
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // Logged-in users can view baggage by ID
    @GetMapping("/{id}")
    public ResponseEntity<Baggage> getBaggageById(
            @PathVariable Long id) {

        return baggageService
                .getBaggageById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // Public tracking using baggage tag
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<Baggage> getBaggageByTagId(
            @PathVariable String tagId) {

        return baggageService
                .getBaggageByTagId(tagId)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // STAFF and ADMIN can update baggage status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            Authentication authentication) {

        String status = request.get("status");
        String location = request.get("location");
        String remarks = request.get("remarks");

        if (status == null || status.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Status is required");
        }

        if (location == null || location.isBlank()) {
            location = "Unknown Location";
        }

        if (remarks == null || remarks.isBlank()) {
            remarks = "Status updated";
        }

        // Email of the currently logged-in STAFF/ADMIN
        String staffEmail =
                authentication.getName();

        return baggageService
                .updateStatus(
                        id,
                        status,
                        location,
                        remarks,
                        staffEmail
                )
                .map(baggage ->
                        ResponseEntity.ok(baggage)
                )
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // Only ADMIN can delete baggage
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBaggage(
            @PathVariable Long id) {

        baggageService.deleteBaggage(id);

        return ResponseEntity.ok(
                "Baggage deleted successfully"
        );
    }
}