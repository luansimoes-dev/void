package com.DevProj.proj.posts.dto.response;

public record UserResponse(
    String name,
    String avatar,
    String description,
    boolean isVerified
) {}
