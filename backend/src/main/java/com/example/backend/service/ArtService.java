package com.example.backend.service;

import com.example.backend.dto.ArtDTO;
import com.example.backend.entity.Art;
import com.example.backend.repository.ArtRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ArtService {

    ArtDTO getById(int id);

    void delete(int id);
}

@Service
class ArtServiceImpl implements ArtService {

    @Autowired
    private ArtRepository artRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ArtDTO getById(int id) {
        Art art = artRepository.findById(id).orElseThrow(NoResultException::new);
        return  modelMapper.map(art, ArtDTO.class);
    }

    @Override
    @Transactional
    public void delete(int id) {
        artRepository.findById(id).orElseThrow(NoResultException::new);
        artRepository.deleteById(id);
    }
}
