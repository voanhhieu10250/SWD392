package com.example.backend.service;


import com.example.backend.dto.ResellMetadata;
import com.example.backend.dto.ResellTransactionAddDTO;
import com.example.backend.dto.ResellTransactionDTO;
import com.example.backend.entity.Art;
import com.example.backend.entity.ResellTransaction;
import com.example.backend.entity.User;
import com.example.backend.entity.enums.ResellStatus;
import com.example.backend.repository.ResellTransactionRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public interface ResellTransactionService {

    void create(ResellTransactionAddDTO resellTransactionDTO);

    ResellTransactionDTO getById(int id);

    void update(ResellTransactionDTO premiumDownloadDTO);

    void delete(int id);

    List<ResellTransactionDTO> getAll();

    //    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
    List<ResellTransactionDTO> getByArtId(int id);

    ResellTransactionDTO getCurrentOwner(int id);

    List<ResellMetadata> getByUserId(int id);
}

@Service
class ResellTransactionServiceImpl implements ResellTransactionService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private ResellTransactionRepository resellTransactionRepository;
    @Autowired
    private ArtService artService;
    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public void create(ResellTransactionAddDTO resellTransactionDTO) {
        Art art = artService.findById(resellTransactionDTO.getArtId());
        User seller = userService.findById(resellTransactionDTO.getSellerUserId());
        User buyer = userService.findById(resellTransactionDTO.getBuyerUserId());

        ResellTransaction resellTransaction = new ResellTransaction();
        resellTransaction.setArt(art);
        resellTransaction.setSellerUser(seller);
        resellTransaction.setBuyerUser(buyer);
        resellTransaction.setAmount(resellTransactionDTO.getAmount());
        resellTransaction.setDate(new Date());
        resellTransaction.setMessage(resellTransactionDTO.getMessage());
        resellTransaction.setStatus(ResellStatus.PENDING);

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

    @Override
    public List<ResellMetadata> getByUserId(int id) {
        return resellTransactionRepository
                .findAllByBuyerUser_IdOrSellerUser_IdOrderByDateDesc(id, id)
                .stream().map(ResellMetadata::new).collect(Collectors.toList());
    }

    private ResellTransactionDTO convert(ResellTransaction resellTransaction) {
        return modelMapper.map(resellTransaction, ResellTransactionDTO.class);
    }
}
