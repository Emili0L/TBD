package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "app_session")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long sessionID;
    private double amountTobePayedLeft;
    private double expiringTime;
    private long receiverID;

    public Session() {
    }

    public Session(long sessionID, double amountTobePayedLeft, double expiringTime, long receiverID) {
        this.sessionID = sessionID;
        this.amountTobePayedLeft = amountTobePayedLeft;
        this.expiringTime = expiringTime;
        this.receiverID = receiverID;
    }

    public long getSessionID() {
        return sessionID;
    }

    public void setSessionID(long sessionID) {
        this.sessionID = sessionID;
    }

    public double getAmountTobePayedLeft() {
        return amountTobePayedLeft;
    }

    public void setAmountTobePayedLeft(double amountTobePayedLeft) {
        this.amountTobePayedLeft = amountTobePayedLeft;
    }

    public double getExpiringTime() {
        return expiringTime;
    }

    public void setExpiringTime(double expiringTime) {
        this.expiringTime = expiringTime;
    }

    public long getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(long receiverID) {
        this.receiverID = receiverID;
    }
}




