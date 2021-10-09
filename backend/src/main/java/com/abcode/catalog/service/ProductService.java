package com.abcode.catalog.service;

import com.abcode.catalog.dto.CategoryDTO;
import com.abcode.catalog.dto.ProductDTO;
import com.abcode.catalog.entities.Category;
import com.abcode.catalog.entities.Product;
import com.abcode.catalog.repositories.CategoryRepository;
import com.abcode.catalog.repositories.ProductRepository;
import com.abcode.catalog.service.exceptions.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public ProductDTO getById(Long id) {
        var entity = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        return new ProductDTO(entity, entity.getCategories());
    }


    @Transactional
    public void save(ProductDTO dto) {
        Product entity = new Product();
        copyDTOToEntity(dto, entity);
        productRepository.save(entity);
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO dto) {
        try {
            var entity = productRepository.getOne(id);
            copyDTOToEntity(dto, entity);
            entity = productRepository.save(entity);
            return new ProductDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Id not found " + id);
        }


    }

    public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
        var list = productRepository.findAll(pageRequest);
        return list.map(ProductDTO::new);
    }

    public void deleteById(Long id) {
        var objProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        productRepository.deleteById(objProduct.getId());
    }

    private void copyDTOToEntity(ProductDTO dto, Product entity) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setDate(dto.getDate());
        entity.setImgUrl(dto.getImgUrl());
        entity.setPrice(dto.getPrice());

        entity.getCategories().clear();
        for (CategoryDTO categoryDTO : dto.getCategories()) {
            var category = categoryRepository.getOne(categoryDTO.getId());
            entity.getCategories().add(category);
        }

    }
}
