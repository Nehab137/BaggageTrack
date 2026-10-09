package com.baggagetrack.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "baggage_status_history")
public class BaggageStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private String location;

    private String remarks;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "baggage_id", nullable = false)
    private Baggage baggage;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;

    public BaggageStatusHistory() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Baggage getBaggage() {
        return baggage;
    }

    public void setBaggage(Baggage baggage) {
        this.baggage = baggage;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }
}