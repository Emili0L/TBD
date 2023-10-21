package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "app_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceId;

    private long imageId;
    private String name;
    private String paypalCredentials;
    private String bankCredentials;

    public User() {
    }

    public User(Long id, String deviceId, long imageId, String name, String paypalCredentials, String bankCredentials) {
        this.id = id;
        this.deviceId = deviceId;
        this.imageId = imageId;
        this.name = name;
        this.paypalCredentials = paypalCredentials;
        this.bankCredentials = bankCredentials;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public long getImageId() {
        return imageId;
    }

    public void setImageId(long imageId) {
        this.imageId = imageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPaypalCredentials() {
        return paypalCredentials;
    }

    public void setPaypalCredentials(String paypalCredentials) {
        this.paypalCredentials = paypalCredentials;
    }

    public String getBankCredentials() {
        return bankCredentials;
    }

    public void setBankCredentials(String bankCredentials) {
        this.bankCredentials = bankCredentials;
    }
}