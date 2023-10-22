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

/*    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> createUser(@RequestParam("name") String name,
                                           @RequestParam(value = "deviceId", required = false) String deviceId,
                                           @RequestParam(value = "image", required = false) MultipartFile image,
                                           @RequestParam(value = "paypalCredentials", required = false) String paypalCredentials,
                                           @RequestParam(value = "bankCredentials", required = false) String bankCredentials) {
        // Handle the image file here
        // You might want to save it and get its ID or URL to store in the User entity

        // Create a new User entity
        User user = new User();
        user.setName(name);
        user.setDeviceId(deviceId);
        user.setPaypalCredentials(paypalCredentials);
        user.setBankCredentials(bankCredentials);

        // Assuming you have a method in your service to handle the image and return its ID
        //long imageId = userService.handleImage(image);
        //user.setImageId(imageId);

        // Save the user
        User newUser = userService.createUser(user);
        return ResponseEntity.ok(newUser);
    }*/

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
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
