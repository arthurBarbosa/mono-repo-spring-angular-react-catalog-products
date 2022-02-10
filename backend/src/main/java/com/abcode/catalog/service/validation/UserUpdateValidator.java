package com.abcode.catalog.service.validation;

import com.abcode.catalog.dto.UserUpdateDTO;
import com.abcode.catalog.repositories.UserRepository;
import com.abcode.catalog.resources.exceptions.FieldMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {

    @Autowired
    private UserRepository repository;

    @Autowired
    private HttpServletRequest request;

    @Override
    public void initialize(UserUpdateValid ann) {

    }

    @Override
    public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
        @SuppressWarnings("unchecked")
        var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        var userId = Long.parseLong(uriVars.get("id"));

        List<FieldMessage> list = new ArrayList<>();

        var user = repository.findByEmail(dto.getEmail());

        if (user != null && userId != user.getId()) {
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
