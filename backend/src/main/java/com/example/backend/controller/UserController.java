package com.example.backend.controller;

import com.example.backend.entities.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> createUser(@RequestParam("name") String name) {
        // Create a new User entity
        User user = new User();
        user.setName(name);

        // Save the user
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        Optional<User> optionalUser = userService.findUserById(user.getId());

        if (optionalUser.isPresent()) {
            User thisUser = optionalUser.get();
            thisUser.setBankCredentials(user.getBankCredentials());
            thisUser.setPaypalCredentials(user.getPaypalCredentials());
            return ResponseEntity.ok(userRepository.save(thisUser));
        }
        return ResponseEntity.badRequest().build();
    }
}
