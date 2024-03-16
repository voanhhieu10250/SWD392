package com.example.backend.controller;


import com.example.backend.dto.FollowshipDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.FollowShipService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow-ship")
public class FollowShipController {

    @Autowired
    FollowShipService followShipService;


    @PostMapping("/")
    public ResponseDTO<Void> create(@RequestBody @Valid FollowshipDTO followshipDTO) {
        followShipService.create(followshipDTO);
        return ResponseDTO.<Void>builder().status(200).msg("200").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<FollowshipDTO> get(@PathVariable("id") int id) {
        FollowshipDTO followshipDTO = followShipService.getById(id);
        return ResponseDTO.<FollowshipDTO>builder().status(200).data(followshipDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        followShipService.delete(id);
        return ResponseDTO.<Void>builder().status(200).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid FollowshipDTO followshipDTO) {
        followShipService.update(followshipDTO);
        return ResponseDTO.<Void>builder().status(200).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<FollowshipDTO>> getAll() {
        return ResponseDTO.<List<FollowshipDTO>>builder()
                .status(200)
                .data(followShipService.getAll())
                .build();
    }
}
