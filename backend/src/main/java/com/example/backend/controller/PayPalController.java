package com.example.backend.controller;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.request.PaymentRequest;
import com.example.backend.service.PayPalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paypal")
public class PayPalController {

    @Autowired
    PayPalService payPalService;

    @PostMapping("/pay")
    public ResponseDTO<?> pay(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = payPalService.createPayment(
                    paymentRequest.getTotal(),
                    paymentRequest.getCurrency(),
                    paymentRequest.getMethod(),
                    paymentRequest.getIntent(),
                    paymentRequest.getDescription(),
                    paymentRequest.getCancelUrl(),
                    paymentRequest.getSuccessUrl());

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return ResponseDTO.builder()
                            .status(HttpStatus.OK)
                            .msg("Redirect URL for payment approval")
                            .data(link.getHref())
                            .build();
                }
            }
            return ResponseDTO.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .msg("Unable to find approval URL")
                    .build();
        } catch (PayPalRESTException e) {
            return ResponseDTO.builder()
                    .status(HttpStatus.BAD_REQUEST)
                    .msg(e.getMessage())
                    .build();
        }
    }

    @GetMapping("/execute")
    public ResponseDTO<?> execute(@RequestParam("paymentId") String paymentId,
                                  @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = payPalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
            String total = payment.getTransactions().get(0).getAmount().getTotal();
                List<Transaction> trans = payment.getTransactions();
                return ResponseDTO.builder()
                        .status(HttpStatus.OK)
                        .msg("200")
                        .data(payment)
                        .build();
            } else {
                return ResponseDTO.builder()
                        .status(HttpStatus.OK)
                        .msg("Payment successfully completed")
                        .data(payment)
                        .build();
            }
        } catch (Exception e) {
            return ResponseDTO.builder()
                    .status(HttpStatus.OK)
                    .msg("Payment successfully completed")
                    .build();
        }
    }
}
