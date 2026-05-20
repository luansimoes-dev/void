package com.DevProj.proj.dtosGlobal;

public record UserDTO(
    boolean isAdmin,
    String name,
    String photo,
    String email
) {}
