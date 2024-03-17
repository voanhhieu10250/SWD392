package com.example.backend.controller;


import com.example.backend.dto.*;
import com.example.backend.service.PreOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pre-orders")
public class PreOrderController {

    @Autowired
    PreOrderService preOrderService;

    @PostMapping
    public ResponseDTO<Void> create(@RequestBody @Valid PreOrderCreateDTO dto) {
        preOrderService.create(dto);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.CREATED)
                .msg("ok").build();
    }

    @GetMapping("creator/{creatorId}")
    public ResponseDTO<List<PreOrderOfferDTO>> getOffers(@PathVariable Integer creatorId) {
        return ResponseDTO.<List<PreOrderOfferDTO>>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .data(preOrderService.getCreatorOffers(creatorId))
                .build();
    }

    @GetMapping("customer/{customerId}")
    public ResponseDTO<List<PreOrderRequestDTO>> getOrders(@PathVariable Integer customerId) {
        return ResponseDTO.<List<PreOrderRequestDTO>>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .data(preOrderService.getCustomerRequests(customerId))
                .build();
    }

    @GetMapping("{id}")
    public ResponseDTO<PreorderDTO> getById(@PathVariable Integer id) {
        return ResponseDTO.<PreorderDTO>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .data(preOrderService.getById(id))
                .build();
    }

    @PutMapping("{id}")
    public ResponseDTO<Void> update(@PathVariable Integer id, @RequestBody @Valid PreOrderUpdateDTO dto) {
        preOrderService.update(id, dto);
        return ResponseDTO.<Void>builder()
                .status(HttpStatus.OK)
                .msg("ok")
                .build();
    }
}
