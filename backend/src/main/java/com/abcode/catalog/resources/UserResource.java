package com.abcode.catalog.resources;

import com.abcode.catalog.dto.ProductDTO;
import com.abcode.catalog.dto.UserDTO;
import com.abcode.catalog.dto.UserInsertDTO;
import com.abcode.catalog.dto.UserUpdateDTO;
import com.abcode.catalog.entities.User;
import com.abcode.catalog.service.ProductService;
import com.abcode.catalog.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/users")
public class UserResource {

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        var user = userService.getById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid UserInsertDTO dto) {
        userService.save(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO dto) {
        return ResponseEntity.ok().body(userService.update(id, dto));
    }

    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAllPaged(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "firstName") String orderBy) {

        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Sort.Direction.valueOf(direction), orderBy);

        return ResponseEntity.ok().body(userService.findAllPaged(pageRequest));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        this.userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
