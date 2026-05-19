package com.DevProj.proj.auth.exception;

public class AuthException extends Exception {

    public AuthException(String message) {
        super("Auth: " + message);
    }
}
