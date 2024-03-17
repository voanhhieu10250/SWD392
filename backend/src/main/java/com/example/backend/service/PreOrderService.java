package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.Preorder;
import com.example.backend.entity.User;
import com.example.backend.repository.PreOrderRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PreOrderService {
    void create(PreOrderCreateDTO dto);

    List<PreOrderOfferDTO> getCreatorOffers(Integer creatorId);

    List<PreOrderRequestDTO> getCustomerRequests(Integer customerId);

    PreorderDTO getById(Integer id);

    void update(Integer id, PreOrderUpdateDTO dto);
}

@Service
class PreOrderServiceImpl implements PreOrderService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PreOrderRepository preOrderRepository;

    @Autowired
    UserService userService;

    @Override
    @Transactional
    public void create(PreOrderCreateDTO dto) {
        User customer = userService.findById(dto.getCustomerId());
        User creator = userService.findById(dto.getCreatorId());

        Preorder preorder = new Preorder();
        preorder.setCustomer(customer);
        preorder.setCreator(creator);
        preorder.setMessage(dto.getMessage());
        preorder.setStatus(dto.getStatus());
        preorder.setPrice(dto.getPrice());
        preorder.setDate(dto.getDate());

        preOrderRepository.save(preorder);
    }

    @Override
    public List<PreOrderOfferDTO> getCreatorOffers(Integer creatorId) {
        return preOrderRepository.findAllByCreatorIdOrderByIdDesc(creatorId)
                .stream().map(PreOrderOfferDTO::new).toList();
    }

    @Override
    public List<PreOrderRequestDTO> getCustomerRequests(Integer customerId) {
        return preOrderRepository.findAllByCustomerIdOrderByIdDesc(customerId)
                .stream().map(PreOrderRequestDTO::new).toList();
    }

    @Override
    public PreorderDTO getById(Integer id) {
        Preorder preorder = preOrderRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(preorder, PreorderDTO.class);
    }

    @Override
    public void update(Integer id, PreOrderUpdateDTO dto) {
        Preorder preorder = preOrderRepository.findById(id).orElseThrow(NoResultException::new);
        preorder.setReply(dto.getReply());
        preorder.setStatus(dto.getStatus());

        preOrderRepository.save(preorder);
    }
}
