package com.baggagetrack.service;

import com.baggagetrack.entity.Baggage;
import com.baggagetrack.entity.BaggageMismatch;
import com.baggagetrack.entity.User;
import com.baggagetrack.repository.BaggageMismatchRepository;
import com.baggagetrack.repository.BaggageRepository;
import com.baggagetrack.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BaggageMismatchService {

    private final BaggageMismatchRepository mismatchRepository;
    private final BaggageRepository baggageRepository;
    private final UserRepository userRepository;

    public BaggageMismatchService(
            BaggageMismatchRepository mismatchRepository,
            BaggageRepository baggageRepository,
            UserRepository userRepository) {

        this.mismatchRepository = mismatchRepository;
        this.baggageRepository = baggageRepository;
        this.userRepository = userRepository;
    }

    // Create mismatch
    public Optional<BaggageMismatch> createMismatch(
            BaggageMismatch mismatch,
            String staffEmail) {

        // Find staff member
        Optional<User> optionalStaff =
                userRepository.findByEmail(staffEmail);

        if (optionalStaff.isEmpty()) {
            return Optional.empty();
        }

        User staff = optionalStaff.get();

        // Find actual baggage using tag ID
        Optional<Baggage> optionalBaggage =
                baggageRepository.findByTagId(mismatch.getTagId());

        if (optionalBaggage.isEmpty()) {
            return Optional.empty();
        }

        Baggage baggage = optionalBaggage.get();

        // Connect mismatch to actual baggage
        mismatch.setBaggage(baggage);

        // Record staff who reported it
        mismatch.setReportedBy(staff);

        // Default status
        if (mismatch.getStatus() == null
                || mismatch.getStatus().isBlank()) {

            mismatch.setStatus("OPEN");
        }

        // Timestamp
        if (mismatch.getCreatedAt() == null) {
            mismatch.setCreatedAt(LocalDateTime.now());
        }

        // Save mismatch
        BaggageMismatch savedMismatch =
                mismatchRepository.save(mismatch);

        return Optional.of(savedMismatch);
    }

    // Get all mismatches
    public List<BaggageMismatch> getAllMismatches() {
        return mismatchRepository.findAllByOrderByCreatedAtDesc();
    }

    // Get mismatch by ID
    public Optional<BaggageMismatch> getMismatchById(Long id) {
        return mismatchRepository.findById(id);
    }

    // Get mismatches by baggage tag
    public List<BaggageMismatch> getMismatchesByTagId(String tagId) {
        return mismatchRepository.findByTagId(tagId);
    }

    // Update mismatch status
    public Optional<BaggageMismatch> updateStatus(
            Long id,
            String status) {

        Optional<BaggageMismatch> optionalMismatch =
                mismatchRepository.findById(id);

        if (optionalMismatch.isEmpty()) {
            return Optional.empty();
        }

        BaggageMismatch mismatch = optionalMismatch.get();

        mismatch.setStatus(status);

        return Optional.of(
                mismatchRepository.save(mismatch)
        );
    }

    // Delete mismatch
    public boolean deleteMismatch(Long id) {

        if (!mismatchRepository.existsById(id)) {
            return false;
        }

        mismatchRepository.deleteById(id);

        return true;
    }
}