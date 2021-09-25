package com.abcode.catalog.service;

import com.abcode.catalog.dto.CategoryDTO;
import com.abcode.catalog.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDTO getById(Long id){
       var category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Nenhuma categoria encontrada."));
       return CategoryDTO.builder().id(category.getId()).name(category.getName()).build();
    }


}
