package com.example.backend.controllers;

import com.example.backend.dtos.*;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    @Operation(summary = "Get user profile")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "User found",
            content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserProfileDTO.class))})
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content)
    @GetMapping(path = "{id}/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                         @PathVariable int id)
    {
        UserProfileDTO profile = userService.getUserProfile(id, userDetails.getUsername());

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @Operation(summary = "Update user profile")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "User updated",
            content = @Content)
    @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content)
    @PutMapping(path = "{id}")
    public ResponseEntity<Void> updateUserProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                  @PathVariable int id,
                                                  @RequestBody UserProfileUpdateDTO updateData)
    {
        userService.updateUser(id, updateData, userDetails.getUsername());

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

    @Operation(summary = "Add event to user wishlist")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Event added to wishlist",
            content = @Content)
    @PostMapping(path = "{userId}/wishlist")
    public ResponseEntity<Void> addEventToWishlist(@AuthenticationPrincipal UserDetails userDetails,
                                                   @PathVariable int userId,
                                                   @RequestBody int eventId)
    {
        userService.addEventToWishlist(userId, eventId, userDetails.getUsername());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Get user wishlist")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Wishlist found",
            content = {@Content(mediaType = "application/json",
                    array = @ArraySchema(schema =
                    @Schema(implementation = EventWishlistedItemDTO.class)))})
    @GetMapping(path = "{userId}/wishlist")
    public ResponseEntity<List<EventWishlistedItemDTO>> getWishlist(@AuthenticationPrincipal UserDetails userDetails,
                                                                    @PathVariable int userId)

    {
        List<EventWishlistedItemDTO> wishlist = userService.getWishlist(userId, userDetails.getUsername());

        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }

    @Operation(summary = "Remove event from user wishlist")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Event removed from wishlist",
            content = @Content)
    @DeleteMapping(path = "{userId}/wishlist/{eventId}")
    public ResponseEntity<Void> removeEventFromWishlist(@AuthenticationPrincipal UserDetails userDetails,
                                                        @PathVariable int userId,
                                                        @PathVariable int eventId)

    {
        userService.removeEventFromWishlist(userId, eventId, userDetails.getUsername());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Change user role")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Role changed",
            content = @Content)
    @PutMapping(path = "{userId}/role")
    public ResponseEntity<Void> changeUserRole(@AuthenticationPrincipal UserDetails userDetails,
                                              @PathVariable int userId,
                                              @RequestBody String role)
    {
        userService.changeUserRole(userId, role, userDetails.getUsername());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
