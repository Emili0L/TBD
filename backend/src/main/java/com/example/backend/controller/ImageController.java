package com.example.backend.controller;

import com.example.backend.entities.Image;
import com.example.backend.entities.User;
import com.example.backend.repository.ImageRepository;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/upload/{userId}")
    public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable long userId) {
        if (file.isEmpty()) {
            return "Bitte wähle eine Datei zum Hochladen aus.";
        }

        Optional<User> user = userService.findUserById(userId);

        if(user.isPresent()) {

            try {
                byte[] imageData = file.getBytes();
                Image image = new Image();
                image.setName(file.getOriginalFilename());
                image.setData(imageData);
                Image thisImage = imageRepository.save(image);
                user.get().setImageId(thisImage.getId());
                userService.createUser(user.get());

                return "Die Datei wurde erfolgreich hochgeladen und in der Datenbank gespeichert.";
            } catch (IOException e) {
                e.printStackTrace();
                return "Fehler beim Hochladen der Datei.";
            }
        }
        return "user not found";
    }

    @GetMapping("/{userId}")
    public void getImage(@PathVariable Long userId, HttpServletResponse response) throws IOException {

        Optional<User> user = userService.findUserById(userId);

        if(user.isPresent()) {

            Optional<Image> imageOptional = imageRepository.findById(user.get().getImageId());

            if (imageOptional.isPresent()) {
                Image image = imageOptional.get();

                // Setze den Content-Type-Header, um den Bildtyp anzugeben (z.B. image/jpeg oder image/png).
                response.setContentType(MediaType.IMAGE_JPEG_VALUE);

                // Schreibe die Bilddaten in die Antwort.
                response.getOutputStream().write(image.getData());
                response.getOutputStream().close();
            } else {
                // Wenn das Bild nicht gefunden wird, kannst du eine Standardantwort oder einen Fehler senden.
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Bild nicht gefunden");
            }
        }
    }
}
