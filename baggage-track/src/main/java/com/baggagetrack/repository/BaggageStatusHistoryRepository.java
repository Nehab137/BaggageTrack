package com.baggagetrack.repository;

import com.baggagetrack.entity.BaggageStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BaggageStatusHistoryRepository
        extends JpaRepository<BaggageStatusHistory, Long> {

    List<BaggageStatusHistory> findByBaggageIdOrderByTimestampAsc(Long baggageId);
}