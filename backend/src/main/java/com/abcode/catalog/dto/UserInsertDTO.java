package com.abcode.catalog.dto;

import com.abcode.catalog.service.validation.UserInsertValid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@UserInsertValid
public class UserInsertDTO extends UserDTO {

    private String password;

}
