package com.baggagetrack.controller;

import com.baggagetrack.entity.BaggageStatusHistory;
import com.baggagetrack.service.BaggageStatusHistoryService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baggage-history")
@CrossOrigin(origins = "http://localhost:5173")
public class BaggageStatusHistoryController {

    private final BaggageStatusHistoryService historyService;

    public BaggageStatusHistoryController(
            BaggageStatusHistoryService historyService) {

        this.historyService = historyService;
    }

    // =========================
    // ADD HISTORY
    // STAFF / ADMIN ONLY
    // =========================

    @PostMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<BaggageStatusHistory> addStatusHistory(
            @RequestBody BaggageStatusHistory history) {

        return ResponseEntity.ok(
                historyService.addStatusHistory(history)
        );
    }

    // =========================
    // GET HISTORY FOR BAGGAGE
    // =========================

    @GetMapping("/baggage/{baggageId}")
    public ResponseEntity<List<BaggageStatusHistory>>
    getBaggageHistory(
            @PathVariable Long baggageId) {

        return ResponseEntity.ok(
                historyService.getHistoryByBaggageId(
                        baggageId
                )
        );
    }

    // =========================
    // GET ALL HISTORY
    // ADMIN / STAFF ONLY
    // =========================

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<List<BaggageStatusHistory>>
    getAllHistory() {

        return ResponseEntity.ok(
                historyService.getAllHistory()
        );
    }

    // =========================
    // GET HISTORY BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<BaggageStatusHistory>
    getHistoryById(
            @PathVariable Long id) {

        return historyService
                .getHistoryById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }
}