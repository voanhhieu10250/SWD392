package com.example.backend.controller;


import com.example.backend.dto.CommentLikeDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.CommentLikeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment-likes")
public class CommentLikeController {

    @Autowired
    CommentLikeService commentLikeService;


    @PostMapping("/")
    public ResponseDTO<Void> create(@RequestBody @Valid CommentLikeDTO commentLikeDTO) {
        commentLikeService.create(commentLikeDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).msg("200").build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<CommentLikeDTO> get(@PathVariable("id") int id) {
        CommentLikeDTO commentLikeDTO = commentLikeService.getById(id);
        return ResponseDTO.<CommentLikeDTO>builder().status(HttpStatus.OK).data(commentLikeDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        commentLikeService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid CommentLikeDTO commentLikeDTO) {
        commentLikeService.update(commentLikeDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<CommentLikeDTO>> getAll() {
        return ResponseDTO.<List<CommentLikeDTO>>builder()
                .status(HttpStatus.OK)
                .data(commentLikeService.getAll())
                .build();
    }
}
