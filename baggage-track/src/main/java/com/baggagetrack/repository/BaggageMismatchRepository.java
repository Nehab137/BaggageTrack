package com.baggagetrack.repository;

import com.baggagetrack.entity.BaggageMismatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaggageMismatchRepository
        extends JpaRepository<BaggageMismatch, Long> {

    List<BaggageMismatch> findAllByOrderByCreatedAtDesc();

    List<BaggageMismatch> findByTagId(String tagId);
}