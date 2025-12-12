package org.example.simplefullstackapp.web;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.simplefullstackapp.dtos.AuthResponse;
import org.example.simplefullstackapp.dtos.LoginRequest;
import org.example.simplefullstackapp.dtos.RegisterRequest;
import org.example.simplefullstackapp.dtos.UserProfileDTO;
import org.example.simplefullstackapp.entities.User;
import org.example.simplefullstackapp.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getProfile() {
        User user = authService.getCurrentUser();
        UserProfileDTO profile = new UserProfileDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName()
        );
        return ResponseEntity.ok(profile);
    }
}