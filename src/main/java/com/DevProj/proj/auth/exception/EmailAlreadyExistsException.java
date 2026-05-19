package com.DevProj.proj.auth.exception;

public class EmailAlreadyExistsException extends AuthException {

    public EmailAlreadyExistsException() {
        super("Email already exists");
    }
}
