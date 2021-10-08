package com.abcode.catalog.service;

import com.abcode.catalog.dto.CategoryDTO;
import com.abcode.catalog.entities.Category;
import com.abcode.catalog.repositories.CategoryRepository;
import com.abcode.catalog.service.exceptions.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDTO getById(Long id) {
        var category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        return CategoryDTO.builder().id(category.getId()).name(category.getName()).build();
    }


    public void save(CategoryDTO categoryDTO) {
        Category category = Category.builder().name(categoryDTO.getName()).build();
        categoryRepository.save(category);
    }

    @Transactional
    public CategoryDTO update(Long id, Category category) {
        var objCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        objCategory.setName(category.getName());
        CategoryDTO categoryDTO = CategoryDTO.builder().id(objCategory.getId()).name(objCategory.getName()).build();
        return categoryDTO;
    }

    public Page<CategoryDTO> findAllPaged(PageRequest pageRequest) {
        var list = categoryRepository.findAll(pageRequest);
        return list.map(CategoryDTO::new);
    }

    public void deleteById(Long id) {
        var objCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        categoryRepository.deleteById(objCategory.getId());
    }
}
