package com.example.backend.service;


import com.example.backend.dto.CollectionDTO;
import com.example.backend.dto.FollowshipDTO;
import com.example.backend.entity.Collection;
import com.example.backend.entity.Followship;
import com.example.backend.repository.CollectionRepository;
import com.example.backend.repository.FollowShipRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface FollowShipService {

    void create(FollowshipDTO followshipDTO);
    FollowshipDTO getById(int id);
    void update(FollowshipDTO followshipDTO);
    void delete(int id);
    List<FollowshipDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class FollowShipServiceImpl implements FollowShipService {

    @Autowired
    private FollowShipRepository followShipRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public void create(FollowshipDTO followshipDTO) {
        Followship followship = modelMapper.map(followshipDTO, Followship.class);
        followShipRepository.save(followship);
    }

    @Override
    public FollowshipDTO getById(int id) {
        Followship followship = followShipRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(followship, FollowshipDTO.class);
    }

    @Override
    @Transactional
    public void update(FollowshipDTO followshipDTO) {
        followShipRepository.findById(followshipDTO.getId()).orElseThrow(NoResultException::new);
        followShipRepository.save(modelMapper.map(followshipDTO, Followship.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        followShipRepository.findById(id).orElseThrow(NoResultException::new);
        followShipRepository.deleteById(id);
    }

    @Override
    public List<FollowshipDTO> getAll() {
        List<Followship> lists = followShipRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private FollowshipDTO convert(Followship followship) {
        return modelMapper.map(followship, FollowshipDTO.class);
    }
}
