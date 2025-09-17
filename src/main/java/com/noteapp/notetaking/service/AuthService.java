package com.noteapp.notetaking.service;

import com.noteapp.notetaking.dto.AuthResponseDTO;
import com.noteapp.notetaking.dto.LoginDTO;
import com.noteapp.notetaking.dto.RegisterDTO;
import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.repository.UserRepository;
import com.noteapp.notetaking.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponseDTO register(RegisterDTO registerDTO) {
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            return new AuthResponseDTO(null, "error: Email is already taken");
        }
        User user = new User();
        user.setName(registerDTO.getName());
        user.setEmail(registerDTO.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerDTO.getPassword()));

        userRepository.save(user);

        //Login automatically after registration
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(registerDTO.getEmail());
        loginDTO.setPassword(registerDTO.getPassword());
        return login(loginDTO);
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );
            String token = jwtUtil.generateToken(loginDTO.getEmail());
            return new AuthResponseDTO(token, "success");
        } catch (BadCredentialsException e) {
            return new AuthResponseDTO(null, "error: Invalid email or password");
        }
    }
}
