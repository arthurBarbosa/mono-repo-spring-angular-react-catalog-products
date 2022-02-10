package com.abcode.catalog.resources.exceptions;

import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ValidationError extends StandardError {

    private List<FieldMessage> errors = new ArrayList<>();


    public void addError(String fieldName, String message) {
        errors.add(new FieldMessage(fieldName, message));
    }

}
