package com.example.backend.service;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.CollectionDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.Collection;
import com.example.backend.repository.CollectionRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface CollectionService {

    void create(CollectionDTO collectionDTO);
    CollectionDTO getById(int id);
    void update(CollectionDTO collectionDTO);
    void delete(int id);
    List<CollectionDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class CollectionServiceImpl implements CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    @Transactional
    public void create(CollectionDTO collectionDTO) {
        Collection collection = modelMapper.map(collectionDTO, Collection.class);
        collectionRepository.save(collection);
    }

    @Override
    public CollectionDTO getById(int id) {
        Collection collection = collectionRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(collection, CollectionDTO.class);
    }

    @Override
    @Transactional
    public void update(CollectionDTO collectionDTO) {
        collectionRepository.findById(collectionDTO.getId()).orElseThrow(NoResultException::new);
        collectionRepository.save(modelMapper.map(collectionDTO, Collection.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        collectionRepository.findById(id).orElseThrow(NoResultException::new);
        collectionRepository.deleteById(id);
    }

    @Override
    public List<CollectionDTO> getAll() {
        List<Collection> lists = collectionRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private CollectionDTO convert(Collection collection) {
        return modelMapper.map(collection, CollectionDTO.class);
    }
}
