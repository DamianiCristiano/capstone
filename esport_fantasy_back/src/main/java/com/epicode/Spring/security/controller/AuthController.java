package com.epicode.Spring.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epicode.Spring.Service.PlayerService;
import com.epicode.Spring.model.ExceptionError;
import com.epicode.Spring.model.Player;
import com.epicode.Spring.security.payload.JWTAuthResponse;
import com.epicode.Spring.security.payload.LoginDto;
import com.epicode.Spring.security.payload.RegisterDto;
import com.epicode.Spring.security.service.AuthService;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    @Autowired
    private PlayerService playerService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Build Login REST API
    @PostMapping(value = {"/login", "/signin"})
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto){
           	
    	JWTAuthResponse jwt = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(jwt.getAccessToken());
        jwtAuthResponse.setId_role(jwt.getId_role());
        jwtAuthResponse.setId_user(jwt.getId_user());
        
        return ResponseEntity.ok(jwtAuthResponse);
    }

    // Build Register REST API
    @PostMapping(value = {"/register", "/signup"})
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<ExceptionError> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        ExceptionError r = new ExceptionError();
        r.message = response;
        r.status = 1;
        return new ResponseEntity<>(r, HttpStatus.CREATED);
    }
    
    
    
    
    
    
    
    // JSON inviato dal Client
    /*{
        "name": "Giuseppe",
        "lastname": "Verdi",
        "username": "giuseppevardi",
        "email": "g.verdi@example.com",
        "password": "qwerty",
        "roles": ["MODERATOR", "ADMIN"]
    }*/
}
