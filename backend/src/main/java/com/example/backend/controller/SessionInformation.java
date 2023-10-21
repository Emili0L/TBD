package com.example.backend.controller;

import com.example.backend.entities.Session;
import com.example.backend.entities.User;

public class SessionInformation {
    private Session session;
    private User receiver;

    public SessionInformation(Session session, User receiver) {
        this.session = session;
        this.receiver = receiver;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }
}
