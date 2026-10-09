package com.baggagetrack.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "baggage_mismatches")
public class BaggageMismatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tagId;

    @Column(nullable = false)
    private String expectedFlight;

    @Column(nullable = false)
    private String scannedFlight;

    private String location;

    private String remarks;

    private String status;

    private LocalDateTime createdAt;

    // Link mismatch to actual baggage
    @ManyToOne
    @JoinColumn(name = "baggage_id", nullable = false)
    private Baggage baggage;

    // Staff/Admin who reported the mismatch
    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    public BaggageMismatch() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTagId() {
        return tagId;
    }

    public void setTagId(String tagId) {
        this.tagId = tagId;
    }

    public String getExpectedFlight() {
        return expectedFlight;
    }

    public void setExpectedFlight(String expectedFlight) {
        this.expectedFlight = expectedFlight;
    }

    public String getScannedFlight() {
        return scannedFlight;
    }

    public void setScannedFlight(String scannedFlight) {
        this.scannedFlight = scannedFlight;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Baggage getBaggage() {
        return baggage;
    }

    public void setBaggage(Baggage baggage) {
        this.baggage = baggage;
    }

    public User getReportedBy() {
        return reportedBy;
    }

    public void setReportedBy(User reportedBy) {
        this.reportedBy = reportedBy;
    }
}