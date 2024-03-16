package com.example.backend.service;

import com.example.backend.dto.ReportDTO;
import com.example.backend.entity.Report;
import com.example.backend.repository.ReportRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface ReportService {

    void create(ReportDTO reportDTO);
    ReportDTO getById(int id);
    void update(ReportDTO reportDTO);
    void delete(int id);
    List<ReportDTO> getAll();
//    PageDTO<ReportDTO> search(SearchDTO searchDTO);
}

@Service
class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    @Transactional
    public void create(ReportDTO reportDTO) {
        Report report = modelMapper.map(reportDTO, Report.class);
        reportRepository.save(report);
    }

    @Override
    public ReportDTO getById(int id) {
        Report report = reportRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(report, ReportDTO.class);
    }

    @Override
    @Transactional
    public void update(ReportDTO reportDTO) {
        reportRepository.findById(reportDTO.getId()).orElseThrow(NoResultException::new);
        reportRepository.save(modelMapper.map(reportDTO, Report.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        reportRepository.findById(id).orElseThrow(NoResultException::new);
        reportRepository.deleteById(id);
    }

    @Override
    public List<ReportDTO> getAll() {
        List<Report> lists = reportRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private ReportDTO convert(Report report) {
        return modelMapper.map(report, ReportDTO.class);
    }
}
