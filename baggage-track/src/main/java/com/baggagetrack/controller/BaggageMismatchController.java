package com.baggagetrack.controller;

import com.baggagetrack.entity.BaggageMismatch;
import com.baggagetrack.service.BaggageMismatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mismatches")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
public class BaggageMismatchController {

    private final BaggageMismatchService mismatchService;

    public BaggageMismatchController(BaggageMismatchService mismatchService) {
        this.mismatchService = mismatchService;
    }

    // Create a new baggage mismatch
    @PostMapping
    public ResponseEntity<?> createMismatch(
            @RequestBody BaggageMismatch mismatch,
            Authentication authentication) {

        String staffEmail = authentication.getName();

        var result = mismatchService.createMismatch(mismatch, staffEmail);

        if (result.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Staff user not found");
        }

        return ResponseEntity.ok(result.get());
    }

    // Get all mismatches
    @GetMapping
    public ResponseEntity<List<BaggageMismatch>> getAllMismatches() {
        return ResponseEntity.ok(
                mismatchService.getAllMismatches()
        );
    }

    // Get mismatch by ID
    @GetMapping("/{id}")
    public ResponseEntity<BaggageMismatch> getMismatchById(
            @PathVariable Long id) {

        return mismatchService.getMismatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get mismatches by baggage tag ID
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<BaggageMismatch>> getMismatchesByTagId(
            @PathVariable String tagId) {

        return ResponseEntity.ok(
                mismatchService.getMismatchesByTagId(tagId)
        );
    }

    // Update mismatch status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Status is required");
        }

        return mismatchService.updateStatus(id, status)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete mismatch - Admin only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteMismatch(
            @PathVariable Long id) {

        boolean deleted = mismatchService.deleteMismatch(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Mismatch deleted successfully"
        );
    }
}