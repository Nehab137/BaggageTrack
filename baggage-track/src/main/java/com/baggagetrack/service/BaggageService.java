package com.baggagetrack.service;

import com.baggagetrack.entity.Baggage;
import com.baggagetrack.entity.BaggageStatusHistory;
import com.baggagetrack.entity.Notification;
import com.baggagetrack.entity.User;

import com.baggagetrack.repository.BaggageRepository;
import com.baggagetrack.repository.BaggageStatusHistoryRepository;
import com.baggagetrack.repository.NotificationRepository;
import com.baggagetrack.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BaggageService {

    private final BaggageRepository baggageRepository;
    private final BaggageStatusHistoryRepository historyRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public BaggageService(
            BaggageRepository baggageRepository,
            BaggageStatusHistoryRepository historyRepository,
            UserRepository userRepository,
            NotificationRepository notificationRepository) {

        this.baggageRepository = baggageRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    // Add new baggage
    public Baggage addBaggage(Baggage baggage) {

        // Automatically generate baggage tag ID
        String tagId = generateBaggageTagId();
        baggage.setTagId(tagId);

        if (baggage.getCreatedAt() == null) {
            baggage.setCreatedAt(LocalDateTime.now());
        }

        if (baggage.getStatus() == null ||
                baggage.getStatus().isBlank()) {

            baggage.setStatus("CHECK_IN");
        }

        Baggage savedBaggage =
                baggageRepository.save(baggage);

        // Create first history record
        BaggageStatusHistory history =
                new BaggageStatusHistory();

        history.setBaggage(savedBaggage);
        history.setStatus(savedBaggage.getStatus());
        history.setTimestamp(LocalDateTime.now());
        history.setLocation("Check-in Counter");
        history.setRemarks("Baggage checked in");

        historyRepository.save(history);

        return savedBaggage;
    }

    // Generate unique baggage tag
    private String generateBaggageTagId() {

        String tagId;

        do {
            long nextNumber =
                    baggageRepository.count() + 1;

            tagId = "BG-"
                    + LocalDateTime.now().getYear()
                    + "-"
                    + String.format("%03d", nextNumber);

        } while (baggageRepository.findByTagId(tagId).isPresent());

        return tagId;
    }

    // Get all baggage
    public List<Baggage> getAllBaggage() {
        return baggageRepository.findAll();
    }

    // Get baggage belonging to a particular passenger
    public List<Baggage> getBaggageByPassengerId(Long passengerId) {
        return baggageRepository.findByPassengerId(passengerId);
    }

    // Get baggage by ID
    public Optional<Baggage> getBaggageById(Long id) {
        return baggageRepository.findById(id);
    }

    // Get baggage by tag ID
    public Optional<Baggage> getBaggageByTagId(String tagId) {
        return baggageRepository.findByTagId(tagId);
    }

    // Update baggage status
    public Optional<Baggage> updateStatus(
            Long baggageId,
            String newStatus,
            String location,
            String remarks,
            String staffEmail) {

        Optional<Baggage> optionalBaggage =
                baggageRepository.findById(baggageId);

        if (optionalBaggage.isEmpty()) {
            return Optional.empty();
        }

        Baggage baggage =
                optionalBaggage.get();

        // Validate baggage status
        if (!isValidStatus(newStatus)) {
            return Optional.empty();
        }

        // Find staff/admin user
        Optional<User> optionalUser =
                userRepository.findByEmail(staffEmail);

        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        User staffUser =
                optionalUser.get();

        // Update baggage status
        baggage.setStatus(newStatus);

        Baggage updatedBaggage =
                baggageRepository.save(baggage);

        // Create status history
        BaggageStatusHistory history =
                new BaggageStatusHistory();

        history.setBaggage(updatedBaggage);
        history.setStatus(newStatus);
        history.setLocation(location);
        history.setRemarks(remarks);
        history.setTimestamp(LocalDateTime.now());
        history.setUpdatedBy(staffUser);

        historyRepository.save(history);

        // Create passenger notification
        User passenger =
                baggage.getPassenger();

        if (passenger != null) {

            Notification notification =
                    new Notification();

            notification.setUser(passenger);

            notification.setTitle(
                    "Baggage Status Updated"
            );

            notification.setMessage(
                    "Your baggage "
                            + baggage.getTagId()
                            + " is now "
                            + newStatus
                            + "."
            );

            notification.setRead(false);

            notification.setCreatedAt(
                    LocalDateTime.now()
            );

            notificationRepository.save(notification);
        }

        return Optional.of(updatedBaggage);
    }

    // Validate allowed baggage statuses
    private boolean isValidStatus(String status) {

        return status.equals("CHECK_IN")
                || status.equals("SECURITY_SCREENING")
                || status.equals("LOADING")
                || status.equals("IN_TRANSIT")
                || status.equals("ARRIVAL")
                || status.equals("DELAYED")
                || status.equals("LOST");
    }

    // Delete baggage
    public void deleteBaggage(Long id) {
        baggageRepository.deleteById(id);
    }
}