package com.gdg.nmit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gdg.nmit.dto.PaymentRequest;
import com.gdg.nmit.dto.PaymentResponse;
import com.gdg.nmit.dto.PaymentVerificationRequest;
import com.gdg.nmit.service.PaymentService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<PaymentResponse> createOrder(
            @RequestBody PaymentRequest request) {

        return ResponseEntity.ok(
                paymentService.createOrder(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestBody PaymentVerificationRequest request) {

        boolean verified = paymentService.verifyPayment(request);

        if (verified) {
            return ResponseEntity.ok("Payment Verified Successfully.");
        }

        return ResponseEntity.badRequest().body("Payment Verification Failed.");
    }
}