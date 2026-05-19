package com.DevProj.proj.posts.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super("Not found: " + message);
    }
}
