package com.example.backend.service;

import com.example.backend.entities.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {return userRepository.save(user);
    }

    public Optional<User> findUserById(long userId) {
        return userRepository.findById(userId);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
