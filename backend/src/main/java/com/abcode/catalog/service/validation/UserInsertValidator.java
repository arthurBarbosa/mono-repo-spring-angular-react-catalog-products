package com.abcode.catalog.service.validation;

import com.abcode.catalog.dto.UserInsertDTO;
import com.abcode.catalog.entities.User;
import com.abcode.catalog.repositories.UserRepository;
import com.abcode.catalog.resources.exceptions.FieldMessage;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class UserInsertValidator implements ConstraintValidator<UserInsertValid, UserInsertDTO> {

    @Autowired
    private UserRepository repository;

    @Override
    public void initialize(UserInsertValid ann) {

    }

    @Override
    public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        var user = repository.findByEmail(dto.getEmail());

        if (user != null) {
            list.add(new FieldMessage("email", "E-mail já existe!"));
        }

        for (FieldMessage message : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message.getMessage()).addPropertyNode(message.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}
