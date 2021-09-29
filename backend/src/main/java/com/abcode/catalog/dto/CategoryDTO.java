package com.abcode.catalog.dto;

import com.abcode.catalog.entities.Category;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;

    public CategoryDTO(Category obj) {
        this.id = obj.getId();
        this.name = obj.getName();
    }
}
