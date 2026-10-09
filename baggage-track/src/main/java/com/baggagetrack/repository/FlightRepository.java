package com.baggagetrack.repository;

import com.baggagetrack.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    Optional<Flight> findByFlightNumberIgnoreCase(String flightNumber);
}