package com.example.backend.controllers;

import com.example.backend.dtos.UserCreationDTO;
import com.example.backend.dtos.UserPropValuePairDTO;
import com.example.backend.entities.User;
import com.example.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "v1/users")
@SecurityRequirements()
public class UserController
{
    private final UserService userService;


    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }


    @Operation(summary = "Add a new user")
    @ApiResponse(responseCode = "201", description = "User created",
            content = @Content)
    @ApiResponse(responseCode = "400", description = "Invalid user format",
            content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content)
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody UserCreationDTO user)
    {
        if (user.email() == null || user.password() == null)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = userService.addNewUser(user);
        if (newUser == null)
        {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "Get all users")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Users found",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema =
                    @Schema(implementation = User.class)))})
    @GetMapping
    public ResponseEntity<List<User>> getUsers()
    {
        List<User> users = userService.getUsers();
        if (users.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Operation(summary = "Get user by id")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "User found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = User.class))})
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content)
    @GetMapping(path = "{id}")
    public ResponseEntity<User> getUsers(@PathVariable int id)
    {
        User user = userService.getUserById(id);
        if (user == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(summary = "Update user data")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "User updated",
            content = @Content)
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content)
    @PatchMapping
    public ResponseEntity<Void> updateUser(int id, @RequestBody UserPropValuePairDTO[] userPropValuePairDTOS)
    {
        boolean success = userService.updateUser(id, userPropValuePairDTOS);
        if (!success)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Delete user by id")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "User deleted",
            content = @Content)
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content)
    @DeleteMapping(path = "{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id)
    {
        try
        {
            userService.deleteUser(id);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
