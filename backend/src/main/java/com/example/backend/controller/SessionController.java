package com.example.backend.controller;

import com.example.backend.entities.Session;
import com.example.backend.entities.User;
import com.example.backend.service.SessionService;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        Session newSession = sessionService.createSession(session);
        return ResponseEntity.ok(newSession);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<SessionInformation> getSessionAndRecieverInfo(@PathVariable long sessionId) {
        Optional<Session> thisSession = sessionService.findSessionById(sessionId);
        Optional<User> thisReciever = userService.findUserById(thisSession.get().getReceiverID());

        if (thisSession.isPresent() && thisReciever.isPresent()) {

            SessionInformation sessionInformation = new SessionInformation(thisSession.get(), thisReciever.get());
            return ResponseEntity.ok(sessionInformation);
        }

        else {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/{sessionId}/sendmoney/{senderUserId}/{receiverUserId}/{amount}")
    private ResponseEntity<paymoneyresponse> sendMoney(@PathVariable long sessionId, @PathVariable long senderUserId, @PathVariable long receiverUserId, @PathVariable double amount) {
        Optional<Session> optionalSession = sessionService.findSessionById(sessionId);

        Optional<User> sender = userService.findUserById(senderUserId);
        Optional<User> receiver = userService.findUserById(receiverUserId);

        if (optionalSession.isPresent()) {
            System.out.println("isPresent");
            if (optionalSession.get().getExpiringTime() > System.currentTimeMillis()) {
                transactionService.sendMoneyToReciever(sender.get(), receiver.get());

                Session thisSession = optionalSession.get();
                double newAmountLeft = thisSession.getAmountTobePayedLeft() - amount;
                thisSession.setAmountTobePayedLeft(newAmountLeft);
                sessionService.updateSession(thisSession);

                paymoneyresponse paymentResponseSuccess = new paymoneyresponse(true, newAmountLeft);

                return ResponseEntity.ok(paymentResponseSuccess);
            } else {
                // Wenn die Sitzung abgelaufen ist, sende einen Fail-Response
                paymoneyresponse paymentResponseFail = new paymoneyresponse(false, 0.0);
                return ResponseEntity.badRequest().body(paymentResponseFail);
            }
        } else {
            // Wenn die Sitzung nicht gefunden wurde, sende ebenfalls einen Fail-Response
            paymoneyresponse paymentResponseFail = new paymoneyresponse(false, 0.0);
            return ResponseEntity.badRequest().body(paymentResponseFail);
        }
    }



}
