package com.gdg.nmit.serviceimpl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.razorpay.Utils;

import com.gdg.nmit.dto.PaymentRequest;
import com.gdg.nmit.dto.PaymentResponse;
import com.gdg.nmit.dto.PaymentVerificationRequest;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.exception.EventNotFoundException;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private RazorpayClient razorpayClient;

    @Autowired
    private eventTableRepository eventTableRepository;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Override
    public PaymentResponse createOrder(PaymentRequest request) {

        try {

            EventTable event = eventTableRepository
                    .findById(request.getEventId())
                    .orElseThrow(() ->
                            new EventNotFoundException("Event not found."));

            JSONObject options = new JSONObject();

            options.put("amount", (long) (event.getRegistrationFee() * 100));

            options.put("currency", "INR");

            options.put("receipt", "receipt_" + System.currentTimeMillis());

            Order order = razorpayClient.orders.create(options);

            PaymentResponse response = new PaymentResponse();

            response.setOrderId(order.get("id"));

            response.setAmount(order.get("amount"));

            response.setCurrency(order.get("currency"));

            response.setKey(keyId);

            return response;

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Unable to create payment order.", e);
        }
    }
    @Override
    public boolean verifyPayment(PaymentVerificationRequest request) {

        try {

            JSONObject attributes = new JSONObject();

            attributes.put("razorpay_order_id", request.getRazorpayOrderId());
            attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
            attributes.put("razorpay_signature", request.getRazorpaySignature());

            Utils.verifyPaymentSignature(attributes, keySecret);

            return true;

        } catch (Exception e) {

            return false;

        }
    }
}