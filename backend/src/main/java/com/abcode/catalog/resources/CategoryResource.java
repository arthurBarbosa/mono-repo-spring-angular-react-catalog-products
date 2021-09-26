package com.abcode.catalog.resources;

import com.abcode.catalog.dto.CategoryDTO;
import com.abcode.catalog.entities.Category;
import com.abcode.catalog.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {

    private final CategoryService categoryService;

    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Long id){
        var category = categoryService.getById(id);
        return ResponseEntity.ok().body(category);
    }

    @RequestMapping
    public ResponseEntity<Void> save(@RequestBody CategoryDTO categoryDTO){
        categoryService.save(categoryDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Long id, @RequestBody Category category){
        return ResponseEntity.ok().body(categoryService.update(id, category));
    }
}
