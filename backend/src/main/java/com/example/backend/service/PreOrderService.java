package com.example.backend.service;

import com.example.backend.dto.PreOrderCreateDTO;
import com.example.backend.entity.Preorder;
import com.example.backend.entity.User;
import com.example.backend.repository.PreOrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface PreOrderService {
    void create(PreOrderCreateDTO dto);
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
}
