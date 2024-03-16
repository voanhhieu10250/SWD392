package com.example.backend.controller;

import com.example.backend.dto.CommentDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/art/{id}")
    ResponseDTO<List<CommentDTO>> getAllCommentByArt(@PathVariable int id) {

        return ResponseDTO.<List<CommentDTO>>builder()
                .status(200)
                .data(commentService.getAllCommentByArt(id))
                .build();
    }

    @PostMapping("/")
    ResponseDTO<Void> create(@RequestBody @Valid CommentDTO commentDTO) {
        commentService.create(commentDTO);
        return ResponseDTO.<Void>builder()
                .status(200)
                .msg("ok")
                .build();
    }
}
