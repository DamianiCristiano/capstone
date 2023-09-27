package com.epicode.Spring.security.exception;

public class CustomEntityNotFoundException extends RuntimeException {
    public CustomEntityNotFoundException(String message) {
        super(message);
    }
}
