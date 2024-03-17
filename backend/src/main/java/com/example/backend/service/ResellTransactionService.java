package com.example.backend.service;


import com.example.backend.dto.ResellTransactionDTO;
import com.example.backend.entity.ResellTransaction;
import com.example.backend.repository.ResellTransactionRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface ResellTransactionService {

    void create(ResellTransactionDTO resellTransactionDTO);
    ResellTransactionDTO getById(int id);
    void update(ResellTransactionDTO premiumDownloadDTO);
    void delete(int id);
    List<ResellTransactionDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
    List<ResellTransactionDTO> getByArtId(int id);
    ResellTransactionDTO getCurrentOwner(int id);
}

@Service
class ResellTransactionServiceImpl implements ResellTransactionService {

    @Autowired
    private ResellTransactionRepository resellTransactionRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public void create(ResellTransactionDTO resellTransactionDTO) {
        ResellTransaction resellTransaction = modelMapper.map(resellTransactionDTO, ResellTransaction.class);
        resellTransactionRepository.save(resellTransaction);
    }

    @Override
    public ResellTransactionDTO getById(int id) {
        ResellTransaction resellTransaction = resellTransactionRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(resellTransaction, ResellTransactionDTO.class);
    }

    @Override
    @Transactional
    public void update(ResellTransactionDTO resellTransactionDTO) {
        resellTransactionRepository.findById(resellTransactionDTO.getId()).orElseThrow(NoResultException::new);
        resellTransactionRepository.save(modelMapper.map(resellTransactionDTO, ResellTransaction.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        resellTransactionRepository.findById(id).orElseThrow(NoResultException::new);
        resellTransactionRepository.deleteById(id);
    }

    @Override
    public List<ResellTransactionDTO> getAll() {
        List<ResellTransaction> lists = resellTransactionRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    @Override
    public List<ResellTransactionDTO> getByArtId(int id) {
        List<ResellTransaction> list = resellTransactionRepository.findByArt_IdOrderByDateDesc(id);
        return list.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    @Override
    public ResellTransactionDTO getCurrentOwner(int id) {
        ResellTransaction resellTransaction = resellTransactionRepository.findFirstByArt_IdOrderByDateDesc(id);
        return modelMapper.map(resellTransaction, ResellTransactionDTO.class);
    }

    private ResellTransactionDTO convert(ResellTransaction resellTransaction) {
        return modelMapper.map(resellTransaction, ResellTransactionDTO.class);
    }
}
