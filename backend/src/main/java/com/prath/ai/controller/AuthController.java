package com.prath.ai.controller;

import com.prath.ai.dto.RegisterRequest;
import com.prath.ai.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        authService.registerUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registration successful");
    }
}
