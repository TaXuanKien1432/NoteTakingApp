package com.noteapp.notetaking.controller;

import com.noteapp.notetaking.dto.AuthResponseDTO;
import com.noteapp.notetaking.dto.LoginDTO;
import com.noteapp.notetaking.dto.RegisterDTO;
import com.noteapp.notetaking.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) throws Exception {
        try {
            AuthResponseDTO authResponseDTO = authService.register(registerDTO);
            return ResponseEntity.ok(authResponseDTO);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(400).body(Map.of("message", "Email already in use"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws Exception {
        try {
            AuthResponseDTO authResponseDTO = authService.login(loginDTO);
            return ResponseEntity.ok(authResponseDTO);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<AuthResponseDTO> oauth2Success() {
        AuthResponseDTO authResponseDTO = authService.oauth2Success();
        return ResponseEntity.ok(authResponseDTO);
    }
}
