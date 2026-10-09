package com.baggagetrack.service;

import com.baggagetrack.dto.AdminStats;
import com.baggagetrack.repository.BaggageRepository;
import com.baggagetrack.repository.BaggageMismatchRepository;
import com.baggagetrack.repository.FlightRepository;
import com.baggagetrack.repository.UserRepository;

import com.baggagetrack.entity.Baggage;
import com.baggagetrack.entity.BaggageMismatch;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminStatsService {

    private final UserRepository userRepository;
    private final FlightRepository flightRepository;
    private final BaggageRepository baggageRepository;
    private final BaggageMismatchRepository mismatchRepository;

    public AdminStatsService(
            UserRepository userRepository,
            FlightRepository flightRepository,
            BaggageRepository baggageRepository,
            BaggageMismatchRepository mismatchRepository) {

        this.userRepository = userRepository;
        this.flightRepository = flightRepository;
        this.baggageRepository = baggageRepository;
        this.mismatchRepository = mismatchRepository;
    }

    public AdminStats getStatistics() {

        AdminStats stats = new AdminStats();

        // Basic totals
        stats.setTotalUsers(
                userRepository.count()
        );

        stats.setTotalFlights(
                flightRepository.count()
        );

        stats.setTotalBaggage(
                baggageRepository.count()
        );

        // Get all baggage
        List<Baggage> baggageList =
                baggageRepository.findAll();

        // Count baggage by status
        stats.setCheckIn(
                countByStatus(baggageList, "CHECK_IN")
        );

        stats.setSecurityScreening(
                countByStatus(
                        baggageList,
                        "SECURITY_SCREENING"
                )
        );

        stats.setLoading(
                countByStatus(
                        baggageList,
                        "LOADING"
                )
        );

        stats.setInTransit(
                countByStatus(
                        baggageList,
                        "IN_TRANSIT"
                )
        );

        stats.setArrival(
                countByStatus(
                        baggageList,
                        "ARRIVAL"
                )
        );

        stats.setDelayed(
                countByStatus(
                        baggageList,
                        "DELAYED"
                )
        );

        stats.setLost(
                countByStatus(
                        baggageList,
                        "LOST"
                )
        );

        // Mismatch statistics
        List<BaggageMismatch> mismatchList =
                mismatchRepository.findAll();

        stats.setTotalMismatches(
                mismatchList.size()
        );

        stats.setOpenMismatches(
                countMismatchByStatus(
                        mismatchList,
                        "OPEN"
                )
        );

        stats.setResolvedMismatches(
                countMismatchByStatus(
                        mismatchList,
                        "RESOLVED"
                )
        );

        return stats;
    }

    // Count baggage by status
    private long countByStatus(
            List<Baggage> baggageList,
            String status) {

        return baggageList.stream()
                .filter(baggage ->
                        status.equals(
                                baggage.getStatus()
                        )
                )
                .count();
    }

    // Count mismatches by status
    private long countMismatchByStatus(
            List<BaggageMismatch> mismatchList,
            String status) {

        return mismatchList.stream()
                .filter(mismatch ->
                        status.equals(
                                mismatch.getStatus()
                        )
                )
                .count();
    }
}