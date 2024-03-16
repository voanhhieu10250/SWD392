package com.example.backend.controller;


import com.example.backend.dto.PreOrderCreateDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.PreOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pre-orders")
public class PreOrderController {

    @Autowired
    PreOrderService preOrderService;

    @PostMapping
    public ResponseDTO<Void> create(@RequestBody @Valid PreOrderCreateDTO dto) {
        preOrderService.create(dto);
        return ResponseDTO.<Void>builder().status(HttpStatus.CREATED).msg("ok").build();
    }
}
