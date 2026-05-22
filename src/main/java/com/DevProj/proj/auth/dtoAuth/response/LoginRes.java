package com.DevProj.proj.auth.dtoAuth.response;

public record LoginRes(
    String jwt,
    boolean isAdmin,
    String name,
    Long id,
    String photo,
    String email
) {}
