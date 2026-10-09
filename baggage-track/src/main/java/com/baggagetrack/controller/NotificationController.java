package com.baggagetrack.controller;

import com.baggagetrack.entity.Notification;
import com.baggagetrack.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    // =========================
    // CREATE NOTIFICATION
    // STAFF / ADMIN ONLY
    // =========================

    @PostMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<Notification> createNotification(
            @RequestBody Notification notification) {

        return ResponseEntity.ok(
                notificationService.createNotification(
                        notification
                )
        );
    }

    // =========================
    // GET USER NOTIFICATIONS
    // =========================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>>
    getUserNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUserNotifications(
                        userId
                )
        );
    }

    // =========================
    // GET ALL NOTIFICATIONS
    // ADMIN / STAFF ONLY
    // =========================

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<List<Notification>>
    getAllNotifications() {

        return ResponseEntity.ok(
                notificationService.getAllNotifications()
        );
    }

    // =========================
    // GET NOTIFICATION BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Notification>
    getNotificationById(
            @PathVariable Long id) {

        return notificationService
                .getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // =========================
    // DELETE NOTIFICATION
    // ADMIN ONLY
    // =========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }
}