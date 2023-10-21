package com.example.backend.controller;

public class paymoneyresponse {
    private boolean paymentStatus;

    private double amountLeftOnSession;

    public paymoneyresponse(boolean paymentStatus, double amountLeftOnSession) {
        this.paymentStatus = paymentStatus;
        this.amountLeftOnSession = amountLeftOnSession;
    }

    public boolean isPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public double getAmountLeftOnSession() {
        return amountLeftOnSession;
    }

    public void setAmountLeftOnSession(double amountLeftOnSession) {
        this.amountLeftOnSession = amountLeftOnSession;
    }
}
