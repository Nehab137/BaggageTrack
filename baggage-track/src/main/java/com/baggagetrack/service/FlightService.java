package com.baggagetrack.service;

import com.baggagetrack.entity.Flight;
import com.baggagetrack.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    public Flight getFlightByNumber(String flightNumber) {

        if (flightNumber == null) {
            return null;
        }

        return flightRepository
                .findByFlightNumberIgnoreCase(flightNumber.trim())
                .orElse(null);
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}