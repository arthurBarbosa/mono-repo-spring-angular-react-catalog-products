package com.abcode.catalog.service;

import com.abcode.catalog.dto.RoleDTO;
import com.abcode.catalog.dto.UserDTO;
import com.abcode.catalog.dto.UserInsertDTO;
import com.abcode.catalog.dto.UserUpdateDTO;
import com.abcode.catalog.entities.User;
import com.abcode.catalog.repositories.RoleRepository;
import com.abcode.catalog.repositories.UserRepository;
import com.abcode.catalog.service.exceptions.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public UserDTO getById(Long id) {
        var entity = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        return new UserDTO(entity);
    }


    @Transactional
    public void save(UserInsertDTO dto) {
        User entity = new User();
        copyDTOToEntity(dto, entity);
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(entity);
    }

    @Transactional
    public UserDTO update(Long id, UserUpdateDTO dto) {
        try {
            var entity = userRepository.getOne(id);
            copyDTOToEntity(dto, entity);
            entity = userRepository.save(entity);
            return new UserDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Id not found " + id);
        }


    }

    public Page<UserDTO> findAllPaged(Pageable pageable) {
        var users = userRepository.findAll(pageable);
        return users.map(user -> new UserDTO(user));
    }

    public void deleteById(Long id) {
        var objUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma categoria encontrada."));
        userRepository.deleteById(objUser.getId());
    }

    private void copyDTOToEntity(UserDTO dto, User entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());

        entity.getRoles().clear();
        for (RoleDTO roleDTO : dto.getRoles()) {
            var role = roleRepository.getOne(roleDTO.getId());
            entity.getRoles().add(role);
        }

    }
}
