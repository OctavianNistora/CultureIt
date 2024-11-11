package com.example.backend.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "user")
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
            content = {@io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json",
                    schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = User.class))})
    @ApiResponse(responseCode = "400", description = "Invalid user format",
            content = @io.swagger.v3.oas.annotations.media.Content)
    @PutMapping
    public ResponseEntity<User> addUser(@RequestBody UserCreateRecord user)
    {
        User newUser = userService.addNewUser(user);
        if (newUser == null)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @Operation(summary = "Get user by id")
    @ApiResponse(responseCode = "200", description = "User found",
            content = {@io.swagger.v3.oas.annotations.media.Content(mediaType = "application/json",
                    schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = User.class))})
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @io.swagger.v3.oas.annotations.media.Content)
    @GetMapping
    public ResponseEntity<User> getUsers(int id)
    {
        User user = userService.getUserById(id);
        if (user == null)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(summary = "Update user data")
    @ApiResponse(responseCode = "200", description = "User updated",
            content = @io.swagger.v3.oas.annotations.media.Content)
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @io.swagger.v3.oas.annotations.media.Content)
    @PatchMapping
    public ResponseEntity<Void> updateUser(int id, @RequestBody UserPropValuePairRecord[] userPropValuePairRecords)
    {
        boolean success = userService.updateUser(id, userPropValuePairRecords);
        if (!success)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Delete user by id")
    @ApiResponse(responseCode = "204", description = "User deleted",
            content = @io.swagger.v3.oas.annotations.media.Content)
    @DeleteMapping
    public ResponseEntity<Void> deleteUser(int id)
    {
        userService.deleteUser(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
