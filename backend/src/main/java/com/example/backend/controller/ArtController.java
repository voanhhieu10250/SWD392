//package com.example.backend.controller;
//
//import com.example.backend.dto.ArtDTO;
//import com.example.backend.dto.ResponseDTO;
//import com.example.backend.service.ArtService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("api/v1/arts")
//public class ArtController {
//
//    @Autowired
//    ArtService artService;
//
//    @GetMapping("/{id}")
//    ResponseDTO<ArtDTO> getById(@PathVariable int id) {
//        return  ResponseDTO.<ArtDTO>builder()
//                .status(200)
//                .data(artService.getById(id))
//                .build();
//    }
//
//    @DeleteMapping("/{id}")
//    ResponseDTO<Void> delete(@PathVariable int id) {
//        artService.delete(id);
//        return  ResponseDTO.<Void>builder()
//                .status(200)
//                .msg("ok")
//                .build();
//    }
//
//
//}
