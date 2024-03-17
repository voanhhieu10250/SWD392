package com.example.backend.service;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.entity.Category;
import com.example.backend.repository.CategoryRepository;
import jakarta.persistence.NoResultException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

public interface CategoryService {

    void create(CategoryDTO categoryDTO);
    CategoryDTO getById(int id);
    void update(CategoryDTO categoryDTO);
    void delete(int id);
    List<CategoryDTO> getAll();
//    PageDTO<CategoryDTO> search(SearchDTO searchDTO);
}

@Service
class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    @Transactional
    public void create(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        categoryRepository.save(category);
    }

    @Override
    public CategoryDTO getById(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(NoResultException::new);
        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    @Transactional
    public void update(CategoryDTO categoryDTO) {
        categoryRepository.findById(categoryDTO.getId()).orElseThrow(NoResultException::new);
        categoryRepository.save(modelMapper.map(categoryDTO, Category.class));
    }

    @Override
    @Transactional
    public void delete(int id) {
        categoryRepository.findById(id).orElseThrow(NoResultException::new);
        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryDTO> getAll() {
        List<Category> lists = categoryRepository.findAll();
        return lists.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }

    private CategoryDTO convert(Category category) {
        return modelMapper.map(category, CategoryDTO.class);
    }
}
