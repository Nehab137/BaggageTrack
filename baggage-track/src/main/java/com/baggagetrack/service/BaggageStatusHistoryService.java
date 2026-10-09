package com.baggagetrack.service;

import com.baggagetrack.entity.BaggageStatusHistory;
import com.baggagetrack.repository.BaggageStatusHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BaggageStatusHistoryService {

    private final BaggageStatusHistoryRepository historyRepository;

    public BaggageStatusHistoryService(
            BaggageStatusHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public BaggageStatusHistory addStatusHistory(
            BaggageStatusHistory history) {
        return historyRepository.save(history);
    }

    public List<BaggageStatusHistory> getHistoryByBaggageId(
            Long baggageId) {
        return historyRepository
                .findByBaggageIdOrderByTimestampAsc(baggageId);
    }

    public List<BaggageStatusHistory> getAllHistory() {
        return historyRepository.findAll();
    }

    public Optional<BaggageStatusHistory> getHistoryById(Long id) {
        return historyRepository.findById(id);
    }
}