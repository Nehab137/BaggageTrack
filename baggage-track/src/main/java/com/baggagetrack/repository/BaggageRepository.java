package com.baggagetrack.repository;

import com.baggagetrack.entity.Baggage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BaggageRepository extends JpaRepository<Baggage, Long> {

    Optional<Baggage> findByTagId(String tagId);

    // Get all baggage belonging to a particular passenger
    List<Baggage> findByPassengerId(Long passengerId);
}