package com.baggagetrack.controller;

import com.baggagetrack.entity.Flight;
import com.baggagetrack.service.FlightService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    // =========================
    // GET ALL FLIGHTS
    // =========================

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {

        return ResponseEntity.ok(
                flightService.getAllFlights()
        );
    }

    // =========================
    // GET FLIGHT BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(
            @PathVariable Long id) {

        return flightService
                .getFlightById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // =========================
    // GET FLIGHT BY NUMBER
    // =========================

    @GetMapping("/number/{flightNumber}")
    public ResponseEntity<Flight> getFlightByNumber(
            @PathVariable String flightNumber) {

        Flight flight =
                flightService.getFlightByNumber(
                        flightNumber
                );

        if (flight == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(flight);
    }

    // =========================
    // ADD FLIGHT
    // ADMIN ONLY
    // =========================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Flight> addFlight(
            @RequestBody Flight flight) {

        return ResponseEntity.ok(
                flightService.addFlight(flight)
        );
    }

    // =========================
    // DELETE FLIGHT
    // ADMIN ONLY
    // =========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteFlight(
            @PathVariable Long id) {

        flightService.deleteFlight(id);

        return ResponseEntity.ok(
                "Flight deleted successfully"
        );
    }
}