package com.example.backend.service;

import com.example.backend.entities.User;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    //This mocks a service that calls various transaction api endpoint depenending on
    // would the reciever user has choosen by registration (e.g Commerzbank Account or Paypal Account..)
    public String sendMoneyToReciever(User sender, User reciever) {
        return "successfull";
    }
}
