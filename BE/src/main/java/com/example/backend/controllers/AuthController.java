package com.example.backend.controllers;


import com.example.backend.dtos.AuthDTO;
import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.CustomUserDetailsService;
import com.example.backend.dtos.UserAuthentificationDTO;
import com.example.backend.utils.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "v1/auth")
@SecurityRequirements()
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Login user")
    @ApiResponse(responseCode = "200", description = "User logged in",
            content = @Content)
    @PostMapping()
    public AuthDTO loginUser(@RequestBody @Valid UserAuthentificationDTO authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.email(), authenticationRequest.password())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.email());
        User user = userRepository.findByEmail(authenticationRequest.email());
        return new AuthDTO(user.getId(), jwtUtil.generateToken(userDetails));
    }

    @Operation(summary = "Verify token")
    @SecurityRequirement(name = "Bearer Authentication")
    @ApiResponse(responseCode = "200", description = "Token is valid and new token is generated",
            content = @Content)
    @GetMapping()
    public AuthDTO verifyToken(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername());
        return new AuthDTO(user.getId(), jwtUtil.generateToken(userDetails));
    }
}