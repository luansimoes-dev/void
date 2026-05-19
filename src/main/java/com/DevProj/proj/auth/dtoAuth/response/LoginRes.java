package com.DevProj.proj.auth.dtoAuth.response;

public record LoginRes(
    String jwt,
    boolean isAdmin,
    String name,
    String photo,
    String email
) {}
