package com.example.backend.controller;


import com.example.backend.dto.PostLikeDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.PostLikeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post-likes")
public class PostLikeController {

    @Autowired
    PostLikeService postLikeService;


    @PostMapping("/")
    public ResponseDTO<Void> create(@RequestBody @Valid PostLikeDTO postLikeDTO) {
        postLikeService.create(postLikeDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).msg("200").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<PostLikeDTO> get(@PathVariable("id") int id) {
        PostLikeDTO postLikeDTO = postLikeService.getById(id);
        return ResponseDTO.<PostLikeDTO>builder().status(HttpStatus.OK).data(postLikeDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        postLikeService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid PostLikeDTO postLikeDTO) {
        postLikeService.update(postLikeDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<PostLikeDTO>> getAll() {
        return ResponseDTO.<List<PostLikeDTO>>builder()
                .status(HttpStatus.OK)
                .data(postLikeService.getAll())
                .build();
    }
}
