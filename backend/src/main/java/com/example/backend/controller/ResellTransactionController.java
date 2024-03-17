package com.example.backend.controller;


import com.example.backend.dto.ResellTransactionDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.ResellTransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resell-transaction")
public class ResellTransactionController {

    @Autowired
    ResellTransactionService resellTransactionService;


    @PostMapping("/")
    public ResponseDTO<Void> create(@RequestBody @Valid ResellTransactionDTO resellTransactionDTO) {
        resellTransactionService.create(resellTransactionDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).msg("200").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<ResellTransactionDTO> get(@PathVariable("id") int id) {
        ResellTransactionDTO resellTransactionDTO = resellTransactionService.getById(id);
        return ResponseDTO.<ResellTransactionDTO>builder().status(HttpStatus.OK).data(resellTransactionDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        resellTransactionService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid ResellTransactionDTO resellTransactionDTO) {
        resellTransactionService.update(resellTransactionDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<ResellTransactionDTO>> getAll() {
        return ResponseDTO.<List<ResellTransactionDTO>>builder()
                .status(HttpStatus.OK)
                .data(resellTransactionService.getAll())
                .build();
    }

    @GetMapping("/art/{id}")
    public ResponseDTO<List<ResellTransactionDTO>> getByArtId(@PathVariable("id") int id) {
        return ResponseDTO.<List<ResellTransactionDTO>>builder()
                .status(HttpStatus.OK)
                .data(resellTransactionService.getByArtId(id))
                .build();
    }

    @GetMapping("/art/{id}/current-owner")
    public ResponseDTO<ResellTransactionDTO> getCurrentOwner(@PathVariable("id") int id) {
        ResellTransactionDTO resellTransactionDTO = resellTransactionService.getCurrentOwner(id);
        return ResponseDTO.<ResellTransactionDTO>builder().status(HttpStatus.OK).data(resellTransactionDTO).build();
    }
}
