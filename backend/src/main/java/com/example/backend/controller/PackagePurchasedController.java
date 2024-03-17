package com.example.backend.controller;


import com.example.backend.dto.PackagePurchasedDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.PackagePurchasedService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/package-purchased")
public class PackagePurchasedController {

    @Autowired
    PackagePurchasedService packagePurchasedService;

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        packagePurchasedService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid PackagePurchasedDTO packagePurchasedDTO) {
        packagePurchasedService.update(packagePurchasedDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("{userId}")
    public ResponseDTO<List<PackagePurchasedDTO>> getAll(@PathVariable("userId") int userId) {
        return ResponseDTO.<List<PackagePurchasedDTO>>builder()
                .status(HttpStatus.OK)
                .data(packagePurchasedService.getAllByUserId(userId))
                .build();
    }
}
