package com.baggagetrack.controller;

import com.baggagetrack.entity.Baggage;
import com.baggagetrack.entity.BaggageMismatch;
import com.baggagetrack.entity.Flight;
import com.baggagetrack.service.BaggageMismatchService;
import com.baggagetrack.service.BaggageService;
import com.baggagetrack.service.FlightService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/scan")
@CrossOrigin(origins = "http://localhost:5173")
public class ScanController {

    private final BaggageService baggageService;
    private final FlightService flightService;
    private final BaggageMismatchService mismatchService;

    public ScanController(
            BaggageService baggageService,
            FlightService flightService,
            BaggageMismatchService mismatchService) {

        this.baggageService = baggageService;
        this.flightService = flightService;
        this.mismatchService = mismatchService;
    }

    @PostMapping("/baggage")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<?> scanBaggage(
            @RequestBody Map<String, String> request,
            Authentication authentication) {

        String tagId = request.get("tagId");
        String flightNumber = request.get("flightNumber");

        // =========================================
        // VALIDATE BAGGAGE ID
        // =========================================

        if (tagId == null || tagId.isBlank()) {

            Map<String, Object> response = new HashMap<>();

            response.put("status", "ERROR");
            response.put(
                    "message",
                    "Baggage tag ID is required."
            );

            return ResponseEntity.badRequest().body(response);
        }

        // =========================================
        // VALIDATE FLIGHT NUMBER
        // =========================================

        if (flightNumber == null || flightNumber.isBlank()) {

            Map<String, Object> response = new HashMap<>();

            response.put("status", "ERROR");
            response.put(
                    "message",
                    "Flight number is required."
            );

            return ResponseEntity.badRequest().body(response);
        }

        // =========================================
        // FIND BAGGAGE
        // =========================================

        Optional<Baggage> optionalBaggage =
                baggageService.getBaggageByTagId(tagId.trim());

        if (optionalBaggage.isEmpty()) {

            Map<String, Object> response = new HashMap<>();

            response.put(
                    "status",
                    "BAGGAGE_NOT_FOUND"
            );

            response.put(
                    "message",
                    "No baggage exists with ID: " + tagId
            );

            response.put(
                    "tagId",
                    tagId
            );

            return ResponseEntity
                    .status(404)
                    .body(response);
        }

        Baggage baggage = optionalBaggage.get();

        // =========================================
        // FIND SCANNED FLIGHT
        // =========================================

        Flight scannedFlight =
                flightService.getFlightByNumber(
                        flightNumber.trim()
                );

        if (scannedFlight == null) {

            Map<String, Object> response = new HashMap<>();

            response.put(
                    "status",
                    "FLIGHT_NOT_FOUND"
            );

            response.put(
                    "message",
                    "No flight exists with number: "
                            + flightNumber
            );

            response.put(
                    "flightNumber",
                    flightNumber
            );

            return ResponseEntity
                    .status(404)
                    .body(response);
        }

        // =========================================
        // GET EXPECTED + SCANNED FLIGHT
        // =========================================

        String expectedFlight =
                baggage.getFlight().getFlightNumber();

        String scannedFlightNumber =
                scannedFlight.getFlightNumber();

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "tagId",
                baggage.getTagId()
        );

        response.put(
                "expectedFlight",
                expectedFlight
        );

        response.put(
                "scannedFlight",
                scannedFlightNumber
        );

        // =========================================
        // FLIGHT MISMATCH
        // =========================================

        if (!expectedFlight.equalsIgnoreCase(
                scannedFlightNumber)) {

            BaggageMismatch mismatch =
                    new BaggageMismatch();

            mismatch.setTagId(
                    baggage.getTagId()
            );

            mismatch.setExpectedFlight(
                    expectedFlight
            );

            mismatch.setScannedFlight(
                    scannedFlightNumber
            );

            mismatch.setLocation(
                    "Airport"
            );

            mismatch.setRemarks(
                    "Baggage belongs to "
                            + expectedFlight
                            + " but was scanned for "
                            + scannedFlightNumber
            );

            mismatch.setStatus(
                    "OPEN"
            );

            Optional<BaggageMismatch> savedMismatch =
                    mismatchService.createMismatch(
                            mismatch,
                            authentication.getName()
                    );

            if (savedMismatch.isEmpty()) {

                Map<String, Object> error =
                        new HashMap<>();

                error.put(
                        "status",
                        "ERROR"
                );

                error.put(
                        "message",
                        "Could not create mismatch record."
                );

                return ResponseEntity
                        .badRequest()
                        .body(error);
            }

            response.put(
                    "status",
                    "MISMATCH"
            );

            response.put(
                    "message",
                    "Baggage does not belong to this flight."
            );

            response.put(
                    "mismatchId",
                    savedMismatch.get().getId()
            );

            response.put(
                    "reason",
                    savedMismatch.get().getRemarks()
            );

            // Do not update baggage status
            // when the flight is incorrect.

            return ResponseEntity
                    .ok(response);
        }

        // =========================================
        // VALID SCAN
        // =========================================

        String staffEmail =
                authentication.getName();

        Optional<Baggage> updatedBaggage =
                baggageService.updateStatus(
                        baggage.getId(),
                        "SECURITY_SCREENING",
                        "Security Screening",
                        "Baggage scan successful",
                        staffEmail
                );

        if (updatedBaggage.isEmpty()) {

            Map<String, Object> error =
                    new HashMap<>();

            error.put(
                    "status",
                    "ERROR"
            );

            error.put(
                    "message",
                    "Baggage was found, but its status could not be updated."
            );

            return ResponseEntity
                    .internalServerError()
                    .body(error);
        }

        // =========================================
        // SUCCESS
        // =========================================

        response.put(
                "status",
                "VALID"
        );

        response.put(
                "message",
                "Baggage matches the flight and has moved to security screening."
        );

        response.put(
                "newBaggageStatus",
                updatedBaggage.get().getStatus()
        );

        return ResponseEntity.ok(response);
    }
}