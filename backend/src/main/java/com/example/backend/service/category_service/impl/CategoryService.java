package com.example.backend.service.category_service.impl;

import com.example.backend.repository.category_repo.ICategoryRepository;
import com.example.backend.service.category_service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final ICategoryRepository iCategoryRepository;
}
