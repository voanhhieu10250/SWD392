package com.example.backend.controller;


import com.example.backend.dto.ReportDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    ReportService reportService;


    @PostMapping("/")
    public ResponseDTO<ReportDTO> create(@RequestBody @Valid ReportDTO reportDTO) {
        reportService.create(reportDTO);
        return ResponseDTO.<ReportDTO>builder().status(HttpStatus.OK).data(reportDTO).build();
    }

    @GetMapping("/{id}")
    public ResponseDTO<ReportDTO> get(@PathVariable("id") int id) {
        ReportDTO reportDTO = reportService.getById(id);
        return ResponseDTO.<ReportDTO>builder().status(HttpStatus.OK).data(reportDTO).build();
    }

    @DeleteMapping("/{id}")
    public ResponseDTO<Void> delete(@PathVariable("id") int id) {
        reportService.delete(id);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @PutMapping("/")
    public ResponseDTO<Void> update(@RequestBody @Valid ReportDTO reportDTO) {
        reportService.update(reportDTO);
        return ResponseDTO.<Void>builder().status(HttpStatus.OK).build();
    }

    @GetMapping("/")
    public ResponseDTO<List<ReportDTO>> getAll() {
        return ResponseDTO.<List<ReportDTO>>builder()
                .status(HttpStatus.OK)
                .data(reportService.getAll())
                .build();
    }
}
