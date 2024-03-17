package com.example.backend.service;


import com.example.backend.dto.PremiumDownloadDTO;
import com.example.backend.entity.PremiumDownload;
import com.example.backend.repository.PremiumDownloadRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface PremiumDownloadService {

    void create(PremiumDownloadDTO premiumDownloadDTO);
    PremiumDownloadDTO getById(int id);
    void update(PremiumDownloadDTO premiumDownloadDTO);
    void delete(int id);
    List<PremiumDownloadDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class PremiumDownloadServiceImpl implements PremiumDownloadService {

    @Autowired
    private PremiumDownloadRepository premiumDownloadRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public void create(PremiumDownloadDTO premiumDownloadDTO) {
        PremiumDownload premiumDownload = modelMapper.map(premiumDownloadDTO, PremiumDownload.class);
        premiumDownloadRepository.save(premiumDownload);
    }

    @Override
    public PremiumDownloadDTO getById(int id) {
        PremiumDownload premiumDownload = premiumDownloadRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(premiumDownload, PremiumDownloadDTO.class);
    }

    @Override
    @Transactional
    public void update(PremiumDownloadDTO premiumDownloadDTO) {
        premiumDownloadRepository.findById(premiumDownloadDTO.getId()).orElseThrow(NoResultException::new);
        premiumDownloadRepository.save(modelMapper.map(premiumDownloadDTO, PremiumDownload.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        premiumDownloadRepository.findById(id).orElseThrow(NoResultException::new);
        premiumDownloadRepository.deleteById(id);
    }

    @Override
    public List<PremiumDownloadDTO> getAll() {
        List<PremiumDownload> lists = premiumDownloadRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private PremiumDownloadDTO convert(PremiumDownload premiumDownload) {
        return modelMapper.map(premiumDownload, PremiumDownloadDTO.class);
    }
}
