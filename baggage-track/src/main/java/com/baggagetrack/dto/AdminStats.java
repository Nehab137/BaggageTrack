package com.baggagetrack.dto;

public class AdminStats {

    private long totalUsers;
    private long totalFlights;
    private long totalBaggage;

    private long checkIn;
    private long securityScreening;
    private long loading;
    private long inTransit;
    private long arrival;

    private long delayed;
    private long lost;

    private long totalMismatches;
    private long openMismatches;
    private long resolvedMismatches;

    public AdminStats() {
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalFlights() {
        return totalFlights;
    }

    public void setTotalFlights(long totalFlights) {
        this.totalFlights = totalFlights;
    }

    public long getTotalBaggage() {
        return totalBaggage;
    }

    public void setTotalBaggage(long totalBaggage) {
        this.totalBaggage = totalBaggage;
    }

    public long getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(long checkIn) {
        this.checkIn = checkIn;
    }

    public long getSecurityScreening() {
        return securityScreening;
    }

    public void setSecurityScreening(long securityScreening) {
        this.securityScreening = securityScreening;
    }

    public long getLoading() {
        return loading;
    }

    public void setLoading(long loading) {
        this.loading = loading;
    }

    public long getInTransit() {
        return inTransit;
    }

    public void setInTransit(long inTransit) {
        this.inTransit = inTransit;
    }

    public long getArrival() {
        return arrival;
    }

    public void setArrival(long arrival) {
        this.arrival = arrival;
    }

    public long getDelayed() {
        return delayed;
    }

    public void setDelayed(long delayed) {
        this.delayed = delayed;
    }

    public long getLost() {
        return lost;
    }

    public void setLost(long lost) {
        this.lost = lost;
    }

    public long getTotalMismatches() {
        return totalMismatches;
    }

    public void setTotalMismatches(long totalMismatches) {
        this.totalMismatches = totalMismatches;
    }

    public long getOpenMismatches() {
        return openMismatches;
    }

    public void setOpenMismatches(long openMismatches) {
        this.openMismatches = openMismatches;
    }

    public long getResolvedMismatches() {
        return resolvedMismatches;
    }

    public void setResolvedMismatches(long resolvedMismatches) {
        this.resolvedMismatches = resolvedMismatches;
    }
}