package com.DevProj.proj.posts.dto.response;

public record UserResponse(
    String name,
    Long id,
    String avatar,
    String description,
    boolean isVerified
) {}
