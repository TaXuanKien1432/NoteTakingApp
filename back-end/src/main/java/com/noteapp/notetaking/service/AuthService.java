package com.noteapp.notetaking.service;

import com.noteapp.notetaking.dto.AuthResponseDTO;
import com.noteapp.notetaking.dto.LoginDTO;
import com.noteapp.notetaking.dto.RegisterDTO;
import com.noteapp.notetaking.dto.UserDTO;
import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.repository.UserRepository;
import com.noteapp.notetaking.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    @Transactional
    public AuthResponseDTO register(RegisterDTO registerDTO) throws ResponseStatusException {
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(409), "Email already in use");
        }
        User user = new User();
        user.setName(registerDTO.getName());
        user.setEmail(registerDTO.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerDTO.getPassword()));

        User saved = userRepository.save(user);
        String accessToken = jwtUtil.generateToken(saved.getEmail());
        UserDTO userDTO = new UserDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getProfilePicture());
        return new AuthResponseDTO(accessToken, "success", userDTO);
    }

    public AuthResponseDTO login(LoginDTO loginDTO) throws BadCredentialsException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        String accessToken = jwtUtil.generateToken(loginDTO.getEmail());
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getProfilePicture());
        return new AuthResponseDTO(accessToken, "success", userDTO);
    }

    public AuthResponseDTO oauth2Success() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        if (email == null) {
            String githubLogin = oAuth2User.getAttribute("login");
            email = githubLogin + "@github.local";
            if (name == null) name = githubLogin;
            if (picture == null) picture = oAuth2User.getAttribute("avatar_url");
        }

        String finalEmail = email;
        String finalName = name;
        String finalPicture = picture;
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(finalEmail);
            newUser.setName(finalName);
            newUser.setProfilePicture(finalPicture);
            return userRepository.save(newUser);
        });

        String accessToken = jwtUtil.generateToken(email);

        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getProfilePicture());
        return new AuthResponseDTO(accessToken, "success", userDTO);
    }
}
