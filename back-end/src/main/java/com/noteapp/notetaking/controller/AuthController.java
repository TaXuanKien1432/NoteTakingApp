package com.noteapp.notetaking.controller;

import com.noteapp.notetaking.dto.AuthResponseDTO;
import com.noteapp.notetaking.dto.LoginDTO;
import com.noteapp.notetaking.dto.RegisterDTO;
import com.noteapp.notetaking.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterDTO registerDTO) {
        AuthResponseDTO authResponseDTO = authService.register(registerDTO);
        if (authResponseDTO.getMessage().equals("success")) {
            return ResponseEntity.ok(authResponseDTO);
        } else {
            return ResponseEntity.badRequest().body(authResponseDTO);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        AuthResponseDTO authResponseDTO = authService.login(loginDTO);
        if (authResponseDTO.getMessage().equals("success")) {
            return ResponseEntity.ok(authResponseDTO);
        } else {
            return ResponseEntity.badRequest().body(authResponseDTO);
        }
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<AuthResponseDTO> oauth2Success() {
        AuthResponseDTO authResponseDTO = authService.oauth2Success();
        return ResponseEntity.ok(authResponseDTO);
    }
}
