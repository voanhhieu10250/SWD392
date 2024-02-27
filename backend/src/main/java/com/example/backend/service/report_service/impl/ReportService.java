package com.example.backend.service.report_service.impl;

import com.example.backend.repository.report_repo.IReportRepository;
import com.example.backend.service.report_service.IReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService implements IReportService {
    private final IReportRepository iReportRepository;
}
