package com.gdg.nmit.service;

import com.gdg.nmit.dto.PaymentRequest;
import com.gdg.nmit.dto.PaymentResponse;
import com.gdg.nmit.dto.PaymentVerificationRequest;

public interface PaymentService {

    PaymentResponse createOrder(PaymentRequest request);

    boolean verifyPayment(PaymentVerificationRequest request);

}