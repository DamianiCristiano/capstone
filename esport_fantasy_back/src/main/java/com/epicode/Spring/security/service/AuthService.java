package com.epicode.Spring.security.service;

import com.epicode.Spring.security.payload.JWTAuthResponse;
import com.epicode.Spring.security.payload.LoginDto;
import com.epicode.Spring.security.payload.RegisterDto;

public interface AuthService {
    
	JWTAuthResponse login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
