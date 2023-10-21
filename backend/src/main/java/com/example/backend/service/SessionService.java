package com.example.backend.service;

import com.example.backend.entities.Session;
import com.example.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SessionService {
    @Autowired
    private SessionRepository SessionRepository;

    public Session createSession(Session session) {

        session.setExpiringTime(System.currentTimeMillis() + 120000);
        return SessionRepository.save(session);
    }

    public Session updateSession(Session session) {
        return SessionRepository.save(session);
    }

    public void deleteSessionById(long sessionId) {
        SessionRepository.deleteById(sessionId);
    }

    public Optional<Session> findSessionById(long sessionId) {
        return SessionRepository.findById(sessionId);
    }
}
